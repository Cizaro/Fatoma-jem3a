/* ---------------------------------------------------------------
   A small PHP interpreter, written in JavaScript.

   It covers exactly the PHP this course teaches: echo, variables,
   strings, operators, if/elseif/else, switch, while/do/for/foreach,
   arrays, functions, and the handful of built-ins the lessons use.

   It lives in its own file because two pages now run her code: the
   code lab and the problem sets. One engine, one set of bugs.

   run(src, opts) -> { out, warns }
     opts.warn   called with each PHP warning
     opts.vars   an object of variables to define before the code runs,
                 which is how $_POST and $_GET get filled in on the
                 problem sets without a real server.
--------------------------------------------------------------- */
/* ============================================================================
   A SMALL PHP INTERPRETER, IN JAVASCRIPT
   ----------------------------------------------------------------------------
   It covers exactly the PHP this course teaches: echo, variables, strings,
   maths, if/else, switch, loops, arrays and functions, plus ~45 built-ins.
   It is NOT real PHP - it cannot do forms, files or databases. For those you
   still run `php -S localhost:8000` like the lessons say.
   ========================================================================== */

/* ---------- values ---------- */
class PhpArray {
  constructor(){ this.map = new Map(); this.next = 0; }
  static from(pairs){ const a = new PhpArray(); for (const [k,v] of pairs) a.set(k,v); return a; }
  key(k){ // PHP turns "5" into 5 as a key
    if (typeof k === "number") return Number.isInteger(k) ? k : Math.trunc(k);
    if (typeof k === "boolean") return k ? 1 : 0;
    if (k === null) return "";
    if (typeof k === "string" && /^-?\d+$/.test(k)) return parseInt(k,10);
    return k;
  }
  set(k,v){ const kk=this.key(k); this.map.set(kk,v); if (typeof kk==="number" && kk>=this.next) this.next=kk+1; }
  push(v){ this.map.set(this.next, v); this.next++; }
  get(k){ return this.map.get(this.key(k)); }
  has(k){ return this.map.has(this.key(k)); }
  del(k){ this.map.delete(this.key(k)); }
  get size(){ return this.map.size; }
  keys(){ return [...this.map.keys()]; }
  values(){ return [...this.map.values()]; }
  entries(){ return [...this.map.entries()]; }
  clone(){ const a=new PhpArray(); for(const [k,v] of this.map) a.map.set(k, v instanceof PhpArray ? v.clone() : v); a.next=this.next; return a; }
}

const PHP = (() => {

/* ---------- tokenizer ---------- */
const KEYWORDS = new Set(["if","else","elseif","while","do","for","foreach","as","switch","case",
  "default","break","continue","function","return","echo","print","true","false","null","and","or","not"]);

/* A real page alternates plain HTML and <?php ... ?> blocks, and one that
   builds a table or a form switches between them several times. So the source
   is split into segments first - HTML becomes an "inline" token that is echoed
   - and each PHP block is tokenized in turn. <?= is short for <?php echo. */
function lex(src){
  const T = [];
  let i = 0, line = 1;
  const count = s => (s.match(/\n/g) || []).length;

  while (i < src.length){
    const open = src.indexOf("<?", i);
    const html = src.slice(i, open === -1 ? src.length : open);
    if (html.trim()) T.push({type:"inline", value:html, line});
    line += count(html);
    if (open === -1) break;

    let j = open + 2, isEcho = false;
    if (src.startsWith("<?php", open)) j = open + 5;
    else if (src.startsWith("<?=", open)){ j = open + 3; isEcho = true; }

    let close = src.indexOf("?>", j);
    if (close === -1) close = src.length;
    let code = src.slice(j, close);
    /* a trailing newline right after ?> is swallowed by PHP, so the HTML a
       loop prints does not gain a blank line on every pass */
    line = lexCode(isEcho ? "echo " + code + ";" : code, T, line);
    i = close + 2;
    if (src[i] === "\n"){ i++; line++; }
  }
  T.push({type:"eof", value:null, line});
  return T;
}

function lexCode(code, T, line0){
  let i = 0, line = line0;
  const push = (type, value) => T.push({type, value, line});
  const isD = c => c >= "0" && c <= "9";
  const isA = c => /[A-Za-z_\x80-\uffff]/.test(c);
  const isAN = c => /[A-Za-z0-9_\x80-\uffff]/.test(c);

  while (i < code.length){
    const c = code[i];
    if (c === "\n"){ line++; i++; continue; }
    if (c === " " || c === "\t" || c === "\r"){ i++; continue; }

    // comments
    if (c === "/" && code[i+1] === "/" || c === "#"){
      while (i < code.length && code[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && code[i+1] === "*"){
      i += 2;
      while (i < code.length && !(code[i] === "*" && code[i+1] === "/")){ if (code[i]==="\n") line++; i++; }
      i += 2; continue;
    }

    // variable
    if (c === "$" && isA(code[i+1])){
      let j = i+1; while (j < code.length && isAN(code[j])) j++;
      push("var", code.slice(i+1, j)); i = j; continue;
    }

    // number
    if (isD(c) || (c === "." && isD(code[i+1]))){
      let j = i, dot = false;
      while (j < code.length && (isD(code[j]) || (code[j] === "." && !dot))){ if (code[j]===".") dot=true; j++; }
      push("num", parseFloat(code.slice(i,j))); i = j; continue;
    }

    // single-quoted string
    if (c === "'"){
      let j = i+1, s = "";
      while (j < code.length && code[j] !== "'"){
        if (code[j] === "\\" && (code[j+1] === "'" || code[j+1] === "\\")){ s += code[j+1]; j += 2; }
        else { if (code[j]==="\n") line++; s += code[j++]; }
      }
      push("str", s); i = j+1; continue;
    }

    // double-quoted string -> parts for interpolation
    if (c === '"'){
      let j = i+1; const parts = []; let buf = "";
      while (j < code.length && code[j] !== '"'){
        const ch = code[j];
        if (ch === "\\"){
          const n = code[j+1];
          buf += n === "n" ? "\n" : n === "t" ? "\t" : n === "r" ? "\r"
               : n === '"' ? '"' : n === "\\" ? "\\" : n === "$" ? "$" : "\\" + n;
          j += 2; continue;
        }
        if (ch === "$" && isA(code[j+1])){
          if (buf){ parts.push({lit:buf}); buf = ""; }
          let k = j+1; while (k < code.length && isAN(code[k])) k++;
          const name = code.slice(j+1, k);
          let idx = null;
          if (code[k] === "["){                       // "$a[0]" / "$a[key]" / "$a['key']"
            let m = k+1, inner = "";
            while (m < code.length && code[m] !== "]") inner += code[m++];
            idx = inner.trim(); k = m+1;
          }
          parts.push({v:name, idx}); j = k; continue;
        }
        if (ch === "{" && code[j+1] === "$"){
          if (buf){ parts.push({lit:buf}); buf = ""; }
          let depth = 1, m = j+1, inner = "";
          while (m < code.length && depth > 0){
            if (code[m] === "{") depth++;
            else if (code[m] === "}"){ depth--; if (!depth) break; }
            inner += code[m++];
          }
          parts.push({expr:inner}); j = m+1; continue;
        }
        if (ch === "\n") line++;
        buf += ch; j++;
      }
      if (buf) parts.push({lit:buf});
      push("istr", parts); i = j+1; continue;
    }

    // identifiers / keywords
    if (isA(c)){
      let j = i; while (j < code.length && isAN(code[j])) j++;
      const w = code.slice(i,j), lw = w.toLowerCase();
      push(KEYWORDS.has(lw) ? lw : "id", w);
      i = j; continue;
    }

    // operators, longest first
    const ops = ["===","!==","<=>","**=","...","<<=",">>=","??=","==","!=","<>","<=",">=","&&","||","**",
                 "++","--","+=","-=","*=","/=",".=","%=","=>","->","::","??","?:"];
    const three = code.substr(i,3), two = code.substr(i,2);
    const found = ops.find(o => code.startsWith(o, i));
    if (found){ push("op", found); i += found.length; continue; }
    if ("+-*/%.=<>!?:;,()[]{}&|".includes(c)){ push("op", c); i++; continue; }

    throw new PhpError(`Unexpected character "${c}"`, line);
  }
  return line;
}

class PhpError extends Error {
  constructor(msg, line){ super(msg); this.line = line; }
}

/* ---------- parser ---------- */
function parse(tokens){
  let p = 0;
  const peek = (k=0) => tokens[p+k];
  const at = (type, value) => peek().type === type && (value === undefined || peek().value === value);
  const atOp = v => at("op", v);
  const next = () => tokens[p++];
  const eat = (type, value) => {
    if (!at(type, value)) throw new PhpError(
      `Expected ${value !== undefined ? '"'+value+'"' : type} but found ` +
      (peek().type === "eof" ? "the end of the file" : '"'+peek().value+'"'), peek().line);
    return tokens[p++];
  };
  const opt = v => { if (atOp(v)){ p++; return true; } return false; };

  function program(){ const b = []; while (!at("eof")) b.push(statement()); return {t:"block", body:b}; }

  function block(){
    if (opt("{")){ const b = []; while (!atOp("}")) b.push(statement()); eat("op","}"); return {t:"block", body:b}; }
    return {t:"block", body:[statement()]};
  }

  function statement(){
    const tk = peek();
    if (tk.type === "inline"){ p++; return {t:"echo", args:[{t:"lit", v:tk.value}]}; }
    if (tk.type === "echo" || tk.type === "print"){
      p++; const args = [expr()];
      while (opt(",")) args.push(expr());
      opt(";"); return {t:"echo", args};
    }
    if (tk.type === "if") return ifStmt();
    if (tk.type === "while"){ p++; eat("op","("); const c = expr(); eat("op",")");
      return {t:"while", cond:c, body:block()}; }
    if (tk.type === "do"){ p++; const b = block(); eat("while"); eat("op","(");
      const c = expr(); eat("op",")"); opt(";"); return {t:"dowhile", cond:c, body:b}; }
    if (tk.type === "for"){ p++; eat("op","(");
      const init = atOp(";") ? null : expr(); eat("op",";");
      const cond = atOp(";") ? null : expr(); eat("op",";");
      const step = atOp(")") ? null : expr(); eat("op",")");
      return {t:"for", init, cond, step, body:block()}; }
    if (tk.type === "foreach"){ p++; eat("op","("); const src = expr(); eat("as");
      let k = null, v = eat("var").value;
      if (opt("=>")){ k = v; v = eat("var").value; }
      eat("op",")"); return {t:"foreach", src, k, v, body:block()}; }
    if (tk.type === "switch") return switchStmt();
    if (tk.type === "break"){ p++; let n = 1; if (at("num")) n = next().value; opt(";"); return {t:"break", n}; }
    if (tk.type === "continue"){ p++; let n = 1; if (at("num")) n = next().value; opt(";"); return {t:"continue", n}; }
    if (tk.type === "return"){ p++; const v = atOp(";") ? null : expr(); opt(";"); return {t:"return", v}; }
    if (tk.type === "function" && peek(1).type === "id"){
      p++; const name = eat("id").value; eat("op","(");
      const params = [];
      while (!atOp(")")){
        const pn = eat("var").value;
        let def = null; if (opt("=")) def = expr();
        params.push({name:pn, def});
        if (!opt(",")) break;
      }
      eat("op",")");
      return {t:"func", name, params, body:block()};
    }
    if (atOp("{")) return block();
    if (atOp(";")){ p++; return {t:"block", body:[]}; }
    const e = expr(); opt(";"); return {t:"expr", e};
  }

  function ifStmt(){
    eat("if"); eat("op","("); const c = expr(); eat("op",")");
    const then = block();
    let alt = null;
    if (at("elseif")){ const save = p; tokens[p] = {type:"if", value:"if", line:peek().line}; alt = ifStmt(); }
    else if (at("else")){ p++; alt = at("if") ? ifStmt() : block(); }
    return {t:"if", cond:c, then, alt};
  }

  function switchStmt(){
    eat("switch"); eat("op","("); const d = expr(); eat("op",")"); eat("op","{");
    const cases = [];
    while (!atOp("}")){
      if (at("case")){ p++; const v = expr(); if(!opt(":")) opt(";");
        const body = []; while (!at("case") && !at("default") && !atOp("}")) body.push(statement());
        cases.push({test:v, body}); }
      else if (at("default")){ p++; if(!opt(":")) opt(";");
        const body = []; while (!at("case") && !at("default") && !atOp("}")) body.push(statement());
        cases.push({test:null, body}); }
      else throw new PhpError("Only case and default are allowed inside a switch", peek().line);
    }
    eat("op","}");
    return {t:"switch", disc:d, cases};
  }

  /* expressions, loosest binding first */
  function expr(){ return assign(); }

  function assign(){
    const left = ternary();
    const ops = ["=","+=","-=","*=","/=",".=","%=","??="];
    for (const o of ops){
      if (atOp(o)){ p++; const right = assign(); return {t:"assign", op:o, target:left, value:right}; }
    }
    return left;
  }
  function ternary(){
    let c = coalesce();
    // "?:" arrives as one token, so it needs its own branch or the parser
    // stops dead on $a ?: $b
    if (atOp("?:")){ p++; return {t:"ternary", cond:c, a:null, b:assign()}; }
    if (atOp("?")){ p++;
      if (opt(":")) return {t:"ternary", cond:c, a:null, b:assign()};
      const a = assign(); eat("op",":"); const b = assign();
      return {t:"ternary", cond:c, a, b};
    }
    return c;
  }
  // ?? binds looser than || and tighter than the ternary, and is
  // right-associative: $a ?? $b ?? $c is $a ?? ($b ?? $c)
  function coalesce(){
    const l = orE();
    if (atOp("??")){ p++; return {t:"coalesce", l, r:coalesce()}; }
    return l;
  }
  function orE(){ let l = andE(); while (atOp("||") || at("or")){ p++; l = {t:"bin", op:"||", l, r:andE()}; } return l; }
  function andE(){ let l = eqE(); while (atOp("&&") || at("and")){ p++; l = {t:"bin", op:"&&", l, r:eqE()}; } return l; }
  function eqE(){ let l = relE();
    while (atOp("==")||atOp("!=")||atOp("===")||atOp("!==")||atOp("<>")){
      const o = next().value; l = {t:"bin", op:o === "<>" ? "!=" : o, l, r:relE()}; } return l; }
  function relE(){ let l = concatE();
    while (atOp("<")||atOp(">")||atOp("<=")||atOp(">=")||atOp("<=>")){
      const o = next().value; l = {t:"bin", op:o, l, r:concatE()}; } return l; }
  // PHP 8 moved "." BELOW "+" and "-": echo "x" . $a + 2 is "x" . ($a + 2).
  // Under PHP 7 rules it was ("x" . $a) + 2, which is a different answer and
  // no error, so getting this wrong teaches her something untrue.
  function concatE(){ let l = addE();
    while (atOp(".")){ p++; l = {t:"bin", op:".", l, r:addE()}; } return l; }
  function addE(){ let l = mulE();
    while (atOp("+")||atOp("-")){ const o = next().value; l = {t:"bin", op:o, l, r:mulE()}; } return l; }
  function mulE(){ let l = powE();
    while (atOp("*")||atOp("/")||atOp("%")){ const o = next().value; l = {t:"bin", op:o, l, r:powE()}; } return l; }
  function powE(){ const l = unary(); if (atOp("**")){ p++; return {t:"bin", op:"**", l, r:powE()}; } return l; }

  function unary(){
    if (atOp("!")){ p++; return {t:"un", op:"!", e:unary()}; }
    if (atOp("-")){ p++; return {t:"un", op:"-", e:unary()}; }
    if (atOp("+")){ p++; return {t:"un", op:"+", e:unary()}; }
    if (atOp("++")){ p++; const e = unary(); return {t:"preinc", e, by:1}; }
    if (atOp("--")){ p++; const e = unary(); return {t:"preinc", e, by:-1}; }
    // casts: (int) (float) (string) (bool)
    if (atOp("(") && peek(1).type === "id" &&
        ["int","integer","float","double","string","bool","boolean"].includes(String(peek(1).value).toLowerCase()) &&
        tokens[p+2] && tokens[p+2].type === "op" && tokens[p+2].value === ")"){
      p++; const kind = String(next().value).toLowerCase(); p++;
      return {t:"cast", kind, e:unary()};
    }
    return postfix();
  }

  function postfix(){
    let e = primary();
    for(;;){
      if (atOp("[")){ p++;
        if (atOp("]")){ p++; e = {t:"push", arr:e}; continue; }
        const k = expr(); eat("op","]"); e = {t:"index", arr:e, key:k}; continue; }
      if (atOp("(")){ p++; const args = [];
        while (!atOp(")")){ args.push(expr()); if (!opt(",")) break; }
        eat("op",")"); e = {t:"call", callee:e, args}; continue; }
      if (atOp("++")){ p++; e = {t:"postinc", e, by:1}; continue; }
      if (atOp("--")){ p++; e = {t:"postinc", e, by:-1}; continue; }
      break;
    }
    return e;
  }

  function primary(){
    const tk = peek();
    if (tk.type === "num"){ p++; return {t:"lit", v:tk.value}; }
    if (tk.type === "str"){ p++; return {t:"lit", v:tk.value}; }
    if (tk.type === "istr"){ p++; return {t:"istr", parts:tk.value}; }
    if (tk.type === "true"){ p++; return {t:"lit", v:true}; }
    if (tk.type === "false"){ p++; return {t:"lit", v:false}; }
    if (tk.type === "null"){ p++; return {t:"lit", v:null}; }
    if (tk.type === "var"){ p++; return {t:"var", name:tk.value}; }
    if (tk.type === "id"){
      if (String(tk.value).toLowerCase() === "array" && peek(1).type === "op" && peek(1).value === "("){
        p += 2; return arrayLiteral(")");
      }
      p++; return {t:"name", name:tk.value};
    }
    if (atOp("[")){ p++; return arrayLiteral("]"); }
    if (atOp("(")){ p++; const e = expr(); eat("op",")"); return e; }
    throw new PhpError(
      tk.type === "eof" ? "The code ended sooner than expected - check your brackets"
                        : `I did not expect "${tk.value}" here`, tk.line);
  }

  function arrayLiteral(closer){
    const items = [];
    while (!atOp(closer)){
      let k = null, v = expr();
      if (opt("=>")){ k = v; v = expr(); }
      items.push({k, v});
      if (!opt(",")) break;
    }
    eat("op", closer);
    return {t:"array", items};
  }

  return program();
}

/* ---------- helpers PHP-style ---------- */
const BREAK = {sig:"break"}, CONTINUE = {sig:"continue"};
class ReturnSig { constructor(v){ this.v = v; } }

function toStr(v){
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "1" : "";
  if (typeof v === "number"){
    if (Number.isInteger(v)) return String(v);
    if (!isFinite(v)) return v > 0 ? "INF" : "-INF";
    let s = String(parseFloat(v.toPrecision(14)));
    if (s.includes("e")) s = v.toFixed(10).replace(/0+$/,"").replace(/\.$/,"");
    return s;
  }
  if (v instanceof PhpArray) return "Array";
  return String(v);
}
function toNum(v){
  if (typeof v === "number") return v;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (v === null || v === undefined) return 0;
  if (v instanceof PhpArray) return v.size ? 1 : 0;
  const m = String(v).trim().match(/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?/);
  return m ? parseFloat(m[0]) : 0;
}
function truthy(v){
  if (v === null || v === undefined || v === false) return false;
  if (v === true) return true;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") return v !== "" && v !== "0";
  if (v instanceof PhpArray) return v.size > 0;
  return true;
}
const isNumericStr = s => typeof s === "string" && s.trim() !== "" && !isNaN(Number(s.trim()));
function looseEq(a,b){
  if (a === null && b === null) return true;
  if (typeof a === "boolean" || typeof b === "boolean") return truthy(a) === truthy(b);
  if (a === null) return b === null || b === "" || b === 0 || b === false || (b instanceof PhpArray && !b.size);
  if (b === null) return looseEq(b,a);
  if (typeof a === "number" && typeof b === "number") return a === b;
  // PHP 8: number vs non-numeric string compares as strings
  if (typeof a === "number" && typeof b === "string") return isNumericStr(b) ? a === toNum(b) : toStr(a) === b;
  if (typeof a === "string" && typeof b === "number") return looseEq(b,a);
  if (typeof a === "string" && typeof b === "string")
    return (isNumericStr(a) && isNumericStr(b)) ? toNum(a) === toNum(b) : a === b;
  if (a instanceof PhpArray && b instanceof PhpArray){
    if (a.size !== b.size) return false;
    for (const [k,v] of a.entries()){ if (!b.has(k) || !looseEq(v, b.get(k))) return false; }
    return true;
  }
  return a === b;
}
function strictEq(a,b){
  const t = x => x === null ? "null" : x instanceof PhpArray ? "array" : typeof x;
  if (t(a) !== t(b)) return false;
  if (a instanceof PhpArray){
    if (a.size !== b.size) return false;
    const ae = a.entries(), be = b.entries();
    for (let i=0;i<ae.length;i++){ if (ae[i][0]!==be[i][0] || !strictEq(ae[i][1],be[i][1])) return false; }
    return true;
  }
  return a === b;
}
function cmp(a,b){
  if (typeof a === "string" && typeof b === "string" && !(isNumericStr(a) && isNumericStr(b)))
    return a < b ? -1 : a > b ? 1 : 0;
  const x = toNum(a), y = toNum(b);
  return x < y ? -1 : x > y ? 1 : 0;
}
function typeName(v){
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return "bool";
  if (typeof v === "number") return Number.isInteger(v) ? "int" : "float";
  if (typeof v === "string") return "string";
  if (v instanceof PhpArray) return "array";
  return "mixed";
}

/* ---------- the interpreter ---------- */
function run(src, opts){
  opts = opts || {};
  const out = [];
  const echo = s => {
    out.push(s);
    if (out.length > 20000) throw new PhpError("This printed far too much - is a loop never ending?");
  };
  const globals = new Map();

  /* The problem sets have no server, so $_POST and $_GET are handed in
     here as plain objects and turned into PHP arrays before the code runs.
     Nested objects and arrays convert too, so $_POST["prices"] works. */
  const toPhp = v => {
    if (Array.isArray(v)){ const a = new PhpArray(); v.forEach(x => a.push(toPhp(x))); return a; }
    if (v && typeof v === "object"){
      const a = new PhpArray();
      Object.keys(v).forEach(k => a.set(/^-?\d+$/.test(k) ? parseInt(k, 10) : k, toPhp(v[k])));
      return a;
    }
    return v;
  };
  if (opts.vars) Object.keys(opts.vars).forEach(k => globals.set(k, toPhp(opts.vars[k])));
  const funcs = new Map();
  let steps = 0;
  const tick = () => { if (++steps > 800000) throw new PhpError("This is taking forever - check for a loop with no way out"); };

  const ast = parse(lex(src));

  /* --- lvalue resolution --- */
  function container(node, scope, create){
    // returns {get(), set(v)}
    if (node.t === "var"){
      return { get: () => scope.has(node.name) ? scope.get(node.name) : null,
               set: v => scope.set(node.name, v) };
    }
    if (node.t === "index" || node.t === "push"){
      const base = container(node.arr, scope, true);
      let arr = base.get();
      if (!(arr instanceof PhpArray)){
        if (arr === null || arr === "" || arr === undefined){ arr = new PhpArray(); base.set(arr); }
        else if (typeof arr === "string" && node.t === "index"){
          const k = toNum(ev(node.key, scope));
          return { get: () => arr[k] !== undefined ? arr[k] : "", set: () => {} };
        }
      }
      if (node.t === "push") return { get: () => null, set: v => arr.push(v) };
      const key = ev(node.key, scope);
      return { get: () => arr.has(key) ? arr.get(key) : null, set: v => arr.set(key, v) };
    }
    throw new PhpError("You can only assign to a variable or an array item");
  }

  /* --- expressions --- */
  function ev(n, scope){
    tick();
    switch (n.t){
      case "lit": return n.v;
      case "istr": {
        let s = "";
        for (const part of n.parts){
          if (part.lit !== undefined){ s += part.lit; continue; }
          if (part.expr !== undefined){ s += toStr(ev(parse(lex("<?php " + part.expr + ";")).body[0].e, scope)); continue; }
          let v = scope.has(part.v) ? scope.get(part.v) : null;
          if (part.idx !== null && part.idx !== undefined && v instanceof PhpArray){
            let key = part.idx;
            if (/^['"].*['"]$/.test(key)) key = key.slice(1,-1);
            else if (/^\$/.test(key)) key = scope.get(key.slice(1));
            else if (/^-?\d+$/.test(key)) key = parseInt(key,10);
            v = v.has(key) ? v.get(key) : null;
          }
          s += toStr(v);
        }
        return s;
      }
      case "var":
        if (!scope.has(n.name)){
          if (opts.warn) opts.warn(`Warning: Undefined variable $${n.name}`);
          return null;
        }
        return scope.get(n.name);
      case "name": {
        const low = n.name.toLowerCase();
        if (low === "true") return true;
        if (low === "false") return false;
        if (low === "null") return null;
        if (low === "php_eol") return "\n";
        if (low === "m_pi") return Math.PI;
        return n.name; // bare word, PHP 8 would error; we are gentle
      }
      case "array": {
        const a = new PhpArray();
        for (const it of n.items){
          const v = ev(it.v, scope);
          if (it.k === null) a.push(v); else a.set(ev(it.k, scope), v);
        }
        return a;
      }
      case "index": {
        const base = ev(n.arr, scope);
        const key = ev(n.key, scope);
        if (base instanceof PhpArray){
          if (!base.has(key)){
            if (opts.warn) opts.warn(`Warning: Undefined array key ${typeof key === "string" ? '"'+key+'"' : key}`);
            return null;
          }
          return base.get(key);
        }
        if (typeof base === "string"){ const c = base[toNum(key)]; return c === undefined ? "" : c; }
        return null;
      }
      case "assign": {
        const box = container(n.target, scope, true);
        if (n.op === "??="){
          // only assigns when there is nothing there, and only then does it
          // bother working out the right-hand side
          const cur = box.get();
          if (cur !== null && cur !== undefined) return cur;
          let nv = ev(n.value, scope);
          if (nv instanceof PhpArray) nv = nv.clone();
          box.set(nv);
          return nv;
        }
        let v = ev(n.value, scope);
        if (n.op !== "="){
          const cur = box.get();
          v = n.op === "+=" ? arith("+", cur, v) : n.op === "-=" ? arith("-", cur, v)
            : n.op === "*=" ? arith("*", cur, v) : n.op === "/=" ? arith("/", cur, v)
            : n.op === "%=" ? arith("%", cur, v) : toStr(cur) + toStr(v);
        }
        if (v instanceof PhpArray) v = v.clone();   // PHP copies arrays on assignment
        box.set(v);
        return v;
      }
      case "bin": {
        const o = n.op;
        if (o === "&&") return truthy(ev(n.l, scope)) ? truthy(ev(n.r, scope)) : false;
        if (o === "||") return truthy(ev(n.l, scope)) ? true : truthy(ev(n.r, scope));
        const a = ev(n.l, scope), b = ev(n.r, scope);
        switch (o){
          case ".": return toStr(a) + toStr(b);
          case "==": return looseEq(a,b);
          case "!=": return !looseEq(a,b);
          case "===": return strictEq(a,b);
          case "!==": return !strictEq(a,b);
          case "<": return cmp(a,b) < 0;
          case ">": return cmp(a,b) > 0;
          case "<=": return cmp(a,b) <= 0;
          case ">=": return cmp(a,b) >= 0;
          case "<=>": return cmp(a,b);
          default: return arith(o, a, b);
        }
      }
      case "un": {
        const v = ev(n.e, scope);
        if (n.op === "!") return !truthy(v);
        if (n.op === "-") return -toNum(v);
        return toNum(v);
      }
      case "cast": {
        const v = ev(n.e, scope);
        if (n.kind === "int" || n.kind === "integer") return Math.trunc(toNum(v));
        if (n.kind === "float" || n.kind === "double") return toNum(v);
        if (n.kind === "string") return toStr(v);
        return truthy(v);
      }
      case "ternary": {
        const c = ev(n.cond, scope);
        if (n.a === null) return truthy(c) ? c : ev(n.b, scope);
        return truthy(c) ? ev(n.a, scope) : ev(n.b, scope);
      }
      case "coalesce": {
        // ?? asks "is this null or missing", and unlike anything else it
        // stays quiet about a missing variable or key. That silence is the
        // whole reason she will use it on $_POST, so mute the warning here.
        const warn = opts.warn;
        opts.warn = null;
        let left;
        try { left = ev(n.l, scope); }
        catch(e){ opts.warn = warn; throw e; }
        opts.warn = warn;
        return (left === null || left === undefined) ? ev(n.r, scope) : left;
      }
      case "preinc": { const box = container(n.e, scope, true);
        const v = toNum(box.get()) + n.by; box.set(v); return v; }
      case "postinc": { const box = container(n.e, scope, true);
        const old = box.get(); const cur = old === null ? 0 : toNum(old);
        box.set(cur + n.by); return cur; }
      case "push": throw new PhpError("$array[] can only be used when assigning something to it");
      case "call": return call(n, scope);
    }
    throw new PhpError("I do not know how to run that yet");
  }

  function arith(op, a, b){
    if (op === "+" && a instanceof PhpArray && b instanceof PhpArray){
      const r = a.clone(); for (const [k,v] of b.entries()) if (!r.has(k)) r.set(k,v); return r;
    }
    const x = toNum(a), y = toNum(b);
    switch (op){
      case "+": return x + y;
      case "-": return x - y;
      case "*": return x * y;
      case "/": if (y === 0) throw new PhpError("Division by zero"); return x / y;
      case "%": if (Math.trunc(y) === 0) throw new PhpError("Modulo by zero");
                return Math.trunc(x) % Math.trunc(y);
      case "**": return Math.pow(x, y);
    }
  }

  function call(n, scope){
    if (n.callee.t !== "name") throw new PhpError("That is not something you can call");
    const name = n.callee.name.toLowerCase();
    const args = n.args.map(a => ev(a, scope));

    if (funcs.has(name)){
      const f = funcs.get(name);
      const local = new Map();
      f.params.forEach((prm, i) => {
        let v = i < args.length ? args[i] : (prm.def ? ev(prm.def, new Map()) : null);
        if (i >= args.length && !prm.def)
          throw new PhpError(`Too few arguments to ${f.name}() - it needs $${prm.name}`);
        if (v instanceof PhpArray) v = v.clone();
        local.set(prm.name, v);
      });
      try { exec(f.body, local); }
      catch (e){ if (e instanceof ReturnSig) return e.v; throw e; }
      return null;
    }
    if (BUILTINS[name]) return BUILTINS[name](args, echo);
    throw new PhpError(`Call to undefined function ${n.callee.name}()`);
  }

  /* --- statements --- */
  function exec(n, scope){
    tick();
    switch (n.t){
      case "block": for (const s of n.body) exec(s, scope); return;
      case "echo": for (const a of n.args) echo(toStr(ev(a, scope))); return;
      case "expr": ev(n.e, scope); return;
      case "func": funcs.set(n.name.toLowerCase(), n); return;
      case "if":
        if (truthy(ev(n.cond, scope))) exec(n.then, scope);
        else if (n.alt) exec(n.alt, scope);
        return;
      case "while":
        while (truthy(ev(n.cond, scope))){
          try { exec(n.body, scope); }
          catch(e){ if (e === BREAK) break; if (e === CONTINUE) continue; throw e; }
        }
        return;
      case "dowhile":
        do {
          try { exec(n.body, scope); }
          catch(e){ if (e === BREAK) break; if (e === CONTINUE) continue; throw e; }
        } while (truthy(ev(n.cond, scope)));
        return;
      case "for": {
        if (n.init) ev(n.init, scope);
        while (n.cond ? truthy(ev(n.cond, scope)) : true){
          try { exec(n.body, scope); }
          catch(e){ if (e === BREAK) break; if (e !== CONTINUE) throw e; }
          if (n.step) ev(n.step, scope);
        }
        return;
      }
      case "foreach": {
        const src = ev(n.src, scope);
        if (!(src instanceof PhpArray))
          throw new PhpError("foreach only works on an array");
        for (const [k,v] of src.entries()){
          if (n.k !== null) scope.set(n.k, k);
          scope.set(n.v, v instanceof PhpArray ? v.clone() : v);
          try { exec(n.body, scope); }
          catch(e){ if (e === BREAK) break; if (e !== CONTINUE) throw e; }
        }
        return;
      }
      case "switch": {
        const d = ev(n.disc, scope);
        let started = false;
        try {
          for (const c of n.cases){
            if (!started && c.test !== null && looseEq(d, ev(c.test, scope))) started = true;
            if (!started && c.test === null) started = true;
            if (started) for (const s of c.body) exec(s, scope);
          }
        } catch(e){ if (e !== BREAK) throw e; }
        return;
      }
      case "break": throw BREAK;
      case "continue": throw CONTINUE;
      case "return": throw new ReturnSig(n.v ? ev(n.v, scope) : null);
    }
    throw new PhpError("I do not know how to run that statement yet");
  }

  // hoist function declarations so you can call one before it is written
  (function hoist(node){
    if (node.t === "block") node.body.forEach(hoist);
    else if (node.t === "func") funcs.set(node.name.toLowerCase(), node);
  })(ast);

  try { exec(ast, globals); }
  catch(e){
    if (e instanceof ReturnSig) { /* return at top level: fine */ }
    else throw e;
  }
  return out.join("");
}

/* ---------- built-in functions ---------- */
/* PHP rounds 12.825 to 12.83, JavaScript's toFixed gives 12.82, because the binary
   value is really 12.8249999... PHP pre-rounds to 15 significant digits first, so
   we do the same. Without this the money in the receipt challenge is a penny out. */
function phpRound(n, d){
  d = d || 0;
  const m = Math.pow(10, d);
  const scaled = parseFloat((n * m).toPrecision(15));
  const r = scaled < 0 ? -Math.round(-scaled) : Math.round(scaled);
  return r / m;
}
function toFixedPhp(n, d){ return phpRound(n, d).toFixed(d); }

function fmt(spec, args){
  let i = 0;
  return spec.replace(/%(-)?(\+)?(0)?(\d+)?(?:\.(\d+))?([sdfb%])/g,
    (m, left, plus, zero, width, prec, kind) => {
      if (kind === "%") return "%";
      let v = args[i++];
      let s;
      if (kind === "d"){ const nn = Math.trunc(toNum(v)); s = String(nn); if (plus && nn >= 0) s = "+" + s; }
      else if (kind === "f"){ s = toFixedPhp(toNum(v), prec === undefined ? 6 : +prec); }
      else if (kind === "b"){ s = (toNum(v) >>> 0).toString(2); }
      else { s = toStr(v); if (prec !== undefined) s = s.slice(0, +prec); }
      if (width){
        const w = +width;
        if (s.length < w) s = left ? s.padEnd(w) : s.padStart(w, zero && !left ? "0" : " ");
      }
      return s;
    });
}
function dump(v, indent){
  const pad = " ".repeat(indent);
  if (v === null || v === undefined) return pad + "NULL\n";
  if (typeof v === "boolean") return pad + `bool(${v})\n`;
  if (typeof v === "number") return Number.isInteger(v) ? pad + `int(${v})\n` : pad + `float(${toStr(v)})\n`;
  if (typeof v === "string") return pad + `string(${v.length}) "${v}"\n`;
  if (v instanceof PhpArray){
    let s = pad + `array(${v.size}) {\n`;
    for (const [k,val] of v.entries()){
      s += pad + "  [" + (typeof k === "number" ? k : `"${k}"`) + "]=>\n";
      s += dump(val, indent + 2);
    }
    return s + pad + "}\n";
  }
  return pad + "mixed\n";
}
function printR(v, indent){
  if (v instanceof PhpArray){
    const pad = " ".repeat(indent);
    let s = "Array\n" + pad + "(\n";
    for (const [k,val] of v.entries())
      s += pad + "    [" + k + "] => " + printR(val, indent + 8).replace(/^\s+/, s0 => s0) + "\n";
    return s + pad + ")\n";
  }
  return toStr(v);
}
const arr = v => v instanceof PhpArray ? v : new PhpArray();
const BUILTINS = {
  // output
  print_r: (a, echo) => { const s = printR(a[0], 0); if (truthy(a[1])) return s; echo(s); return true; },
  var_dump: (a, echo) => { a.forEach(v => echo(dump(v, 0))); return null; },
  printf: (a, echo) => { const s = fmt(toStr(a[0]), a.slice(1)); echo(s); return s.length; },
  sprintf: a => fmt(toStr(a[0]), a.slice(1)),
  number_format: a => {
    const n = toNum(a[0]), d = a.length > 1 ? Math.trunc(toNum(a[1])) : 0;
    const dp = a.length > 2 ? toStr(a[2]) : ".", ts = a.length > 3 ? toStr(a[3]) : ",";
    const parts = toFixedPhp(Math.abs(n), d).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ts);
    return (n < 0 ? "-" : "") + parts.join(parts[1] ? dp : "");
  },
  // strings
  strlen: a => toStr(a[0]).length,
  strtoupper: a => toStr(a[0]).toUpperCase(),
  strtolower: a => toStr(a[0]).toLowerCase(),
  ucfirst: a => { const s = toStr(a[0]); return s.charAt(0).toUpperCase() + s.slice(1); },
  lcfirst: a => { const s = toStr(a[0]); return s.charAt(0).toLowerCase() + s.slice(1); },
  ucwords: a => toStr(a[0]).replace(/(^|\s)(\S)/g, (m,p,c) => p + c.toUpperCase()),
  trim: a => toStr(a[0]).trim(),
  ltrim: a => toStr(a[0]).replace(/^\s+/, ""),
  rtrim: a => toStr(a[0]).replace(/\s+$/, ""),
  strrev: a => toStr(a[0]).split("").reverse().join(""),
  substr: a => { const s = toStr(a[0]); let st = Math.trunc(toNum(a[1]));
    if (st < 0) st = Math.max(0, s.length + st);
    return a.length > 2 ? (toNum(a[2]) < 0 ? s.slice(st, s.length + toNum(a[2])) : s.substr(st, Math.trunc(toNum(a[2])))) : s.slice(st); },
  strpos: a => { const i = toStr(a[0]).indexOf(toStr(a[1]), a.length > 2 ? toNum(a[2]) : 0); return i === -1 ? false : i; },
  strrpos: a => { const i = toStr(a[0]).lastIndexOf(toStr(a[1])); return i === -1 ? false : i; },
  str_contains: a => toStr(a[0]).includes(toStr(a[1])),
  str_starts_with: a => toStr(a[0]).startsWith(toStr(a[1])),
  str_ends_with: a => toStr(a[0]).endsWith(toStr(a[1])),
  str_replace: a => toStr(a[2]).split(toStr(a[0])).join(toStr(a[1])),
  str_repeat: a => toStr(a[0]).repeat(Math.max(0, Math.trunc(toNum(a[1])))),
  str_pad: a => { const s = toStr(a[0]), len = Math.trunc(toNum(a[1])), p = a.length>2?toStr(a[2]):" ";
    const type = a.length > 3 ? toNum(a[3]) : 1;
    if (s.length >= len) return s;
    if (type === 0) return s.padStart(len, p);
    if (type === 2){ const total = len - s.length, l = Math.floor(total/2);
      return p.repeat(l).slice(0,l) + s + p.repeat(total-l).slice(0,total-l); }
    return s.padEnd(len, p); },
  str_split: a => { const s = toStr(a[0]), n = a.length>1?Math.max(1,Math.trunc(toNum(a[1]))):1;
    const r = new PhpArray(); for (let i=0;i<s.length;i+=n) r.push(s.substr(i,n)); return r; },
  nl2br: a => toStr(a[0]).replace(/\n/g, "<br>\n"),
  htmlspecialchars: a => toStr(a[0]).replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),
  implode: a => { const [g,arr2] = a[0] instanceof PhpArray ? ["", a[0]] : [toStr(a[0]), arr(a[1])];
    return arr2.values().map(toStr).join(a[0] instanceof PhpArray ? "" : g); },
  join: a => BUILTINS.implode(a),
  explode: a => { const r = new PhpArray(); toStr(a[1]).split(toStr(a[0])).forEach(x => r.push(x)); return r; },
  // numbers
  abs: a => Math.abs(toNum(a[0])),
  round: a => phpRound(toNum(a[0]), a.length>1?Math.trunc(toNum(a[1])):0),
  floor: a => Math.floor(toNum(a[0])),
  ceil: a => Math.ceil(toNum(a[0])),
  sqrt: a => Math.sqrt(toNum(a[0])),
  pi: () => Math.PI,
  pow: a => Math.pow(toNum(a[0]), toNum(a[1])),
  intdiv: a => { const y = Math.trunc(toNum(a[1])); if (!y) throw new PhpError("Division by zero");
    return Math.trunc(Math.trunc(toNum(a[0])) / y); },
  max: a => { const vals = a.length === 1 && a[0] instanceof PhpArray ? a[0].values() : a;
    return vals.reduce((m,v) => cmp(v,m) > 0 ? v : m); },
  min: a => { const vals = a.length === 1 && a[0] instanceof PhpArray ? a[0].values() : a;
    return vals.reduce((m,v) => cmp(v,m) < 0 ? v : m); },
  rand: a => a.length >= 2 ? Math.floor(Math.random()*(toNum(a[1])-toNum(a[0])+1))+Math.trunc(toNum(a[0]))
                           : Math.floor(Math.random()*32768),
  mt_rand: a => BUILTINS.rand(a),
  random_int: a => BUILTINS.rand(a),
  // types
  intval: a => Math.trunc(toNum(a[0])),
  floatval: a => toNum(a[0]),
  strval: a => toStr(a[0]),
  boolval: a => truthy(a[0]),
  gettype: a => { const t = typeName(a[0]);
    return t === "int" ? "integer" : t === "float" ? "double" : t === "bool" ? "boolean" : t; },
  is_numeric: a => typeof a[0] === "number" || isNumericStr(a[0]),
  is_int: a => typeof a[0] === "number" && Number.isInteger(a[0]),
  is_integer: a => BUILTINS.is_int(a),
  is_float: a => typeof a[0] === "number" && !Number.isInteger(a[0]),
  is_string: a => typeof a[0] === "string",
  is_bool: a => typeof a[0] === "boolean",
  is_array: a => a[0] instanceof PhpArray,
  is_null: a => a[0] === null || a[0] === undefined,
  isset: a => a[0] !== null && a[0] !== undefined,
  empty: a => !truthy(a[0]),
  // arrays
  count: a => a[0] instanceof PhpArray ? a[0].size : (typeof a[0] === "string" ? 1 : (a[0]===null?0:1)),
  sizeof: a => BUILTINS.count(a),
  array_sum: a => arr(a[0]).values().reduce((s,v) => s + toNum(v), 0),
  array_product: a => arr(a[0]).values().reduce((s,v) => s * toNum(v), 1),
  array_keys: a => { const r = new PhpArray(); arr(a[0]).keys().forEach(k => r.push(k)); return r; },
  array_values: a => { const r = new PhpArray(); arr(a[0]).values().forEach(v => r.push(v)); return r; },
  array_reverse: a => { const r = new PhpArray(); arr(a[0]).values().reverse().forEach(v => r.push(v)); return r; },
  array_unique: a => { const r = new PhpArray(); const seen = new Set();
    for (const [k,v] of arr(a[0]).entries()){ const s = toStr(v); if (!seen.has(s)){ seen.add(s); r.set(k,v); } } return r; },
  array_merge: a => { const r = new PhpArray();
    a.forEach(x => { for (const [k,v] of arr(x).entries()) typeof k === "number" ? r.push(v) : r.set(k,v); }); return r; },
  array_slice: a => { const vals = arr(a[0]).values();
    const off = Math.trunc(toNum(a[1])), len = a.length > 2 ? Math.trunc(toNum(a[2])) : undefined;
    const r = new PhpArray(); vals.slice(off, len === undefined ? undefined : (len < 0 ? vals.length+len : off+len))
      .forEach(v => r.push(v)); return r; },
  in_array: a => arr(a[1]).values().some(v => truthy(a[2]) ? strictEq(v,a[0]) : looseEq(v,a[0])),
  array_search: a => { for (const [k,v] of arr(a[1]).entries()) if (looseEq(v,a[0])) return k; return false; },
  array_key_exists: a => arr(a[1]).has(a[0]),
  array_flip: a => { const r = new PhpArray(); for (const [k,v] of arr(a[0]).entries()) r.set(v,k); return r; },
  array_fill: a => { const r = new PhpArray(); const st = Math.trunc(toNum(a[0])), n = Math.trunc(toNum(a[1]));
    for (let i=0;i<n;i++) r.set(st+i, a[2]); return r; },
  array_combine: a => { const ks = arr(a[0]).values(), vs = arr(a[1]).values(); const r = new PhpArray();
    ks.forEach((k,i) => r.set(k, vs[i])); return r; },
  range: a => { const r = new PhpArray();
    if (typeof a[0] === "string" && typeof a[1] === "string" && a[0].length === 1 && a[1].length === 1 && !isNumericStr(a[0])){
      const s = a[0].charCodeAt(0), e = a[1].charCodeAt(0), st = s <= e ? 1 : -1;
      for (let c = s; st > 0 ? c <= e : c >= e; c += st) r.push(String.fromCharCode(c));
      return r;
    }
    const s = toNum(a[0]), e = toNum(a[1]); let st = a.length > 2 ? Math.abs(toNum(a[2])) : 1;
    if (!st) st = 1;
    if (s <= e) for (let v = s; v <= e + 1e-9; v += st) r.push(v);
    else for (let v = s; v >= e - 1e-9; v -= st) r.push(v);
    return r; },
  compact: () => new PhpArray(),
  // these mutate in PHP; our evaluator passes the same object, so they work
  sort: a => { const v = arr(a[0]).values().sort(cmp); a[0].map.clear(); a[0].next = 0; v.forEach(x => a[0].push(x)); return true; },
  rsort: a => { const v = arr(a[0]).values().sort((x,y)=>cmp(y,x)); a[0].map.clear(); a[0].next = 0; v.forEach(x => a[0].push(x)); return true; },
  asort: a => { const e = arr(a[0]).entries().sort((x,y)=>cmp(x[1],y[1])); a[0].map.clear(); e.forEach(([k,v]) => a[0].map.set(k,v)); return true; },
  arsort: a => { const e = arr(a[0]).entries().sort((x,y)=>cmp(y[1],x[1])); a[0].map.clear(); e.forEach(([k,v]) => a[0].map.set(k,v)); return true; },
  ksort: a => { const e = arr(a[0]).entries().sort((x,y)=>cmp(x[0],y[0])); a[0].map.clear(); e.forEach(([k,v]) => a[0].map.set(k,v)); return true; },
  krsort: a => { const e = arr(a[0]).entries().sort((x,y)=>cmp(y[0],x[0])); a[0].map.clear(); e.forEach(([k,v]) => a[0].map.set(k,v)); return true; },
  shuffle: a => { const v = arr(a[0]).values(); for (let i=v.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [v[i],v[j]]=[v[j],v[i]]; }
    a[0].map.clear(); a[0].next=0; v.forEach(x => a[0].push(x)); return true; },
  array_push: a => { for (let i=1;i<a.length;i++) a[0].push(a[i]); return a[0].size; },
  array_pop: a => { const ks = a[0].keys(); if (!ks.length) return null;
    const k = ks[ks.length-1], v = a[0].get(k); a[0].del(k);
    if (typeof k === "number") a[0].next = Math.max(0, a[0].next - 1); return v; },
  array_shift: a => { const e = a[0].entries(); if (!e.length) return null;
    const v = e[0][1]; a[0].map.clear(); a[0].next = 0;
    e.slice(1).forEach(([k,val]) => typeof k === "number" ? a[0].push(val) : a[0].set(k,val)); return v; },
  array_unshift: a => { const e = a[0].entries(); a[0].map.clear(); a[0].next = 0;
    for (let i=1;i<a.length;i++) a[0].push(a[i]);
    e.forEach(([k,val]) => typeof k === "number" ? a[0].push(val) : a[0].set(k,val)); return a[0].size; },
  array_rand: a => { const ks = a[0].keys(); return ks[Math.floor(Math.random()*ks.length)]; },
  unset: () => null,
  // misc
  date: a => { const f = toStr(a[0]); const d = new Date();
    const pad = n => String(n).padStart(2,"0");
    return f.replace(/[YmdHisjnAy]/g, ch => ({
      Y:String(d.getFullYear()), y:String(d.getFullYear()).slice(2), m:pad(d.getMonth()+1), n:String(d.getMonth()+1),
      d:pad(d.getDate()), j:String(d.getDate()), H:pad(d.getHours()), i:pad(d.getMinutes()),
      s:pad(d.getSeconds()), A:d.getHours()<12?"AM":"PM"
    })[ch] || ch); },
  php_eol: () => "\n"
};

return { run, PhpError, toStr };
})();
