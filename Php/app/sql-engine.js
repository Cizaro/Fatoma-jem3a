/* ============================================================
   A small SQL engine, in the browser.

   Lessons 9 and 10 need a database, and a database needs a server,
   so those were the only lessons she could not practise from the
   one link. This runs a real subset of SQL against the same two
   tables as school.sql and courses.sql, so nothing she learns here
   has to be unlearned when she opens phpMyAdmin.

   Supported, honestly:
     SELECT  * | columns | COUNT(*) | AVG(col) | SUM(col) | col AS name
             FROM t [WHERE ...] [GROUP BY col] [ORDER BY col ASC|DESC] [LIMIT n]
     WHERE   = != <> > < >= <= LIKE (with %), joined by AND / OR
     INSERT INTO t (cols) VALUES (...)
     UPDATE t SET col = v, ... [WHERE ...]
     DELETE FROM t [WHERE ...]

   Not supported, and it says so rather than guessing: JOIN, subqueries,
   HAVING, DISTINCT, nested functions.
   ============================================================ */
(function (global) {

  const SEED = {
    students: {
      cols: ["id", "name", "email", "major", "grade"],
      rows: [
        [1, "Fatima Hassan", "fatima@mail.com", "Computer Science", 17.50],
        [2, "Sara Khalil",   "sara@mail.com",   "Computer Science",  8.25],
        [3, "Lina Farah",    "lina@mail.com",   "Business",         12.00],
        [4, "Nour Aziz",     "nour@mail.com",   "Design",           15.75],
        [5, "Maya Saad",     "maya@mail.com",   "Computer Science", 19.00]
      ]
    },
    courses: {
      cols: ["id", "title", "teacher", "level", "hours"],
      rows: [
        [1, "Introduction to PHP",       "Dr. Karam",  "beginner",     30],
        [2, "HTML and CSS Basics",       "Dr. Nassar", "beginner",     24],
        [3, "MySQL for Web Developers",  "Dr. Karam",  "intermediate", 28],
        [4, "JavaScript in the Browser", "Dr. Saleh",  "intermediate", 32],
        [5, "WordPress and CMS",         "Dr. Nassar", "beginner",     18],
        [6, "Full Stack Project",        "Dr. Karam",  "advanced",     40]
      ]
    }
  };

  let db = null;
  function reset() { db = JSON.parse(JSON.stringify(SEED)); }
  reset();

  /* ---------- tokenizer ---------- */
  function lex(sql) {
    const out = [];
    let i = 0;
    while (i < sql.length) {
      const c = sql[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "-" && sql[i + 1] === "-") { while (i < sql.length && sql[i] !== "\n") i++; continue; }
      if (c === "'" || c === '"') {
        let j = i + 1, s = "";
        while (j < sql.length && sql[j] !== c) { s += sql[j]; j++; }
        if (j >= sql.length) throw new Error("A quote was opened and never closed.");
        out.push({ t: "str", v: s }); i = j + 1; continue;
      }
      if (/[0-9]/.test(c)) {
        let j = i, s = "";
        while (j < sql.length && /[0-9.]/.test(sql[j])) { s += sql[j]; j++; }
        out.push({ t: "num", v: parseFloat(s) }); i = j; continue;
      }
      if (/[A-Za-z_]/.test(c)) {
        let j = i, s = "";
        while (j < sql.length && /[A-Za-z0-9_]/.test(sql[j])) { s += sql[j]; j++; }
        out.push({ t: "word", v: s }); i = j; continue;
      }
      const two = sql.substr(i, 2);
      if (two === ">=" || two === "<=" || two === "!=" || two === "<>") {
        out.push({ t: "op", v: two === "<>" ? "!=" : two }); i += 2; continue;
      }
      if ("=<>".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
      if ("(),*;.".includes(c)) { out.push({ t: "p", v: c }); i++; continue; }
      throw new Error("I do not understand the character " + c + " here.");
    }
    return out;
  }

  /* ---------- helpers ---------- */
  function cmp(a, b) {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
  }
  function likeToRe(pat) {
    const esc = String(pat).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("^" + esc.replace(/%/g, ".*").replace(/_/g, ".") + "$", "i");
  }
  function colIndex(table, name) {
    const i = table.cols.indexOf(name);
    if (i === -1) {
      throw new Error("There is no column called “" + name + "”. This table has: "
        + table.cols.join(", ") + ".");
    }
    return i;
  }
  function tableNamed(name) {
    const t = db[name];
    if (!t) {
      throw new Error("There is no table called “" + name + "”. You have: "
        + Object.keys(db).join(" and ") + ".");
    }
    return t;
  }

  /* ---------- WHERE ---------- */
  function parseWhere(ts, p, table) {
    // one or more   col OP value   joined by AND / OR, left to right
    const terms = [];
    for (;;) {
      const col = ts[p.i++];
      if (!col || col.t !== "word") throw new Error("WHERE needs a column name.");
      const ci = colIndex(table, col.v);
      let op = ts[p.i++];
      let isLike = false;
      if (op && op.t === "word" && op.v.toUpperCase() === "LIKE") { isLike = true; }
      else if (!op || op.t !== "op") throw new Error("WHERE needs a comparison, like = or >=.");
      const val = ts[p.i++];
      if (!val || (val.t !== "str" && val.t !== "num")) throw new Error("WHERE needs a value to compare against.");
      terms.push({ ci, op: isLike ? "LIKE" : op.v, val: val.v });

      const nxt = ts[p.i];
      if (nxt && nxt.t === "word" && ["AND", "OR"].includes(nxt.v.toUpperCase())) {
        terms.push({ join: nxt.v.toUpperCase() }); p.i++;
      } else break;
    }
    return row => {
      let acc = null, join = "AND";
      for (const t of terms) {
        if (t.join) { join = t.join; continue; }
        const cell = row[t.ci];
        let r;
        switch (t.op) {
          case "=":  r = String(cell).toLowerCase() === String(t.val).toLowerCase(); break;
          case "!=": r = String(cell).toLowerCase() !== String(t.val).toLowerCase(); break;
          case ">":  r = cmp(cell, t.val) > 0; break;
          case "<":  r = cmp(cell, t.val) < 0; break;
          case ">=": r = cmp(cell, t.val) >= 0; break;
          case "<=": r = cmp(cell, t.val) <= 0; break;
          case "LIKE": r = likeToRe(t.val).test(String(cell)); break;
        }
        acc = acc === null ? r : (join === "AND" ? (acc && r) : (acc || r));
      }
      return acc === null ? true : acc;
    };
  }

  /* ---------- SELECT ---------- */
  function doSelect(ts, p) {
    // column list first, table name is read before it is used
    const picks = [];
    for (;;) {
      const t = ts[p.i];
      if (!t) throw new Error("This SELECT stops before it says FROM.");
      if (t.t === "p" && t.v === "*") { picks.push({ all: true }); p.i++; }
      else if (t.t === "word" && ["COUNT", "AVG", "SUM"].includes(t.v.toUpperCase())) {
        const fn = t.v.toUpperCase(); p.i++;
        if (!(ts[p.i] && ts[p.i].v === "(")) throw new Error(fn + " needs brackets after it.");
        p.i++;
        const inner = ts[p.i++];
        if (!inner) throw new Error(fn + "( is never closed.");
        const arg = inner.v === "*" ? "*" : inner.v;
        if (!(ts[p.i] && ts[p.i].v === ")")) throw new Error(fn + "( is never closed.");
        p.i++;
        picks.push({ fn, arg, label: fn + "(" + arg + ")" });
      } else if (t.t === "word") { picks.push({ col: t.v, label: t.v }); p.i++; }
      else throw new Error("I expected a column name here.");

      // optional AS alias
      if (ts[p.i] && ts[p.i].t === "word" && ts[p.i].v.toUpperCase() === "AS") {
        p.i++;
        const al = ts[p.i++];
        if (!al) throw new Error("AS needs a name after it.");
        picks[picks.length - 1].label = al.v;
      }
      if (ts[p.i] && ts[p.i].v === ",") { p.i++; continue; }
      break;
    }
    const from = ts[p.i++];
    if (!from || from.t !== "word" || from.v.toUpperCase() !== "FROM")
      throw new Error("A SELECT needs FROM and a table name.");
    const tname = ts[p.i++];
    if (!tname || tname.t !== "word") throw new Error("FROM needs a table name.");
    const table = tableNamed(tname.v);

    let rows = table.rows.slice();
    let where = null, group = null, order = null, dir = 1, limit = null;

    while (p.i < ts.length) {
      const k = ts[p.i];
      if (k.t === "p" && k.v === ";") { p.i++; continue; }
      if (k.t !== "word") break;
      const kw = k.v.toUpperCase();
      if (kw === "WHERE") { p.i++; where = parseWhere(ts, p, table); }
      else if (kw === "GROUP") {
        p.i++; if (ts[p.i] && ts[p.i].v.toUpperCase() === "BY") p.i++;
        group = ts[p.i++].v;
      } else if (kw === "ORDER") {
        p.i++; if (ts[p.i] && ts[p.i].v.toUpperCase() === "BY") p.i++;
        order = ts[p.i++].v;
        if (ts[p.i] && ts[p.i].t === "word" && ["ASC", "DESC"].includes(ts[p.i].v.toUpperCase())) {
          dir = ts[p.i].v.toUpperCase() === "DESC" ? -1 : 1; p.i++;
        }
      } else if (kw === "LIMIT") { p.i++; limit = ts[p.i++].v; }
      else if (["JOIN", "HAVING", "DISTINCT", "UNION"].includes(kw)) {
        throw new Error(kw + " is real SQL, but this lab does not do it yet. Try it in phpMyAdmin.");
      } else break;
    }

    if (where) rows = rows.filter(where);
    if (order) { const oi = colIndex(table, order); rows.sort((a, b) => cmp(a[oi], b[oi]) * dir); }

    // GROUP BY col with a COUNT/AVG/SUM beside it
    if (group) {
      const gi = colIndex(table, group);
      const seen = new Map();
      rows.forEach(r => {
        const k = r[gi];
        if (!seen.has(k)) seen.set(k, []);
        seen.get(k).push(r);
      });
      const cols = picks.map(pk => pk.label || pk.col);
      const out = [...seen.entries()].map(([k, group_rows]) =>
        picks.map(pk => pk.fn ? aggregate(pk, table, group_rows) : k));
      return { type: "select", cols, rows: limit ? out.slice(0, limit) : out };
    }

    if (picks.some(pk => pk.fn)) {
      return { type: "select",
        cols: picks.map(pk => pk.label),
        rows: [picks.map(pk => pk.fn ? aggregate(pk, table, rows) : rows.length ? rows[0][colIndex(table, pk.col)] : null)] };
    }

    if (limit !== null) rows = rows.slice(0, limit);
    if (picks.some(pk => pk.all)) return { type: "select", cols: table.cols.slice(), rows };
    const idx = picks.map(pk => colIndex(table, pk.col));
    return { type: "select",
      cols: picks.map(pk => pk.label),
      rows: rows.map(r => idx.map(i => r[i])) };
  }

  function aggregate(pk, table, rows) {
    if (pk.fn === "COUNT") return rows.length;
    const i = colIndex(table, pk.arg);
    const nums = rows.map(r => Number(r[i])).filter(n => !isNaN(n));
    if (!nums.length) return null;
    const sum = nums.reduce((a, b) => a + b, 0);
    return pk.fn === "SUM" ? sum : Math.round((sum / nums.length) * 10000) / 10000;
  }

  /* ---------- INSERT / UPDATE / DELETE ---------- */
  function doInsert(ts, p) {
    if (!(ts[p.i] && ts[p.i].v.toUpperCase() === "INTO")) throw new Error("INSERT needs INTO.");
    p.i++;
    const table = tableNamed(ts[p.i++].v);
    let cols = table.cols.filter(c => c !== "id");
    if (ts[p.i] && ts[p.i].v === "(") {
      p.i++; cols = [];
      while (ts[p.i] && ts[p.i].v !== ")") {
        if (ts[p.i].v !== ",") cols.push(ts[p.i].v);
        p.i++;
      }
      p.i++;
    }
    if (!(ts[p.i] && ts[p.i].t === "word" && ts[p.i].v.toUpperCase() === "VALUES"))
      throw new Error("INSERT needs VALUES.");
    p.i++;
    if (!(ts[p.i] && ts[p.i].v === "(")) throw new Error("VALUES needs brackets.");
    p.i++;
    const vals = [];
    while (ts[p.i] && ts[p.i].v !== ")") {
      if (ts[p.i].v !== ",") vals.push(ts[p.i].v);
      p.i++;
    }
    if (vals.length !== cols.length)
      throw new Error("You listed " + cols.length + " columns but "
        + vals.length + " values. They have to match.");
    const nextId = table.rows.reduce((m, r) => Math.max(m, r[0]), 0) + 1;
    const row = table.cols.map(c => {
      if (c === "id") return nextId;
      const at = cols.indexOf(c);
      return at === -1 ? null : vals[at];
    });
    table.rows.push(row);
    return { type: "write", affected: 1, verb: "inserted", newId: nextId };
  }

  function doUpdate(ts, p) {
    const table = tableNamed(ts[p.i++].v);
    if (!(ts[p.i] && ts[p.i].v.toUpperCase() === "SET")) throw new Error("UPDATE needs SET.");
    p.i++;
    const sets = [];
    for (;;) {
      const col = ts[p.i++].v;
      if (!(ts[p.i] && ts[p.i].v === "=")) throw new Error("SET needs col = value.");
      p.i++;
      sets.push({ ci: colIndex(table, col), v: ts[p.i++].v });
      if (ts[p.i] && ts[p.i].v === ",") { p.i++; continue; }
      break;
    }
    let where = null;
    if (ts[p.i] && ts[p.i].t === "word" && ts[p.i].v.toUpperCase() === "WHERE") {
      p.i++; where = parseWhere(ts, p, table);
    }
    let n = 0;
    table.rows.forEach(r => {
      if (where && !where(r)) return;
      sets.forEach(s => { r[s.ci] = s.v; });
      n++;
    });
    return { type: "write", affected: n, verb: "updated", noWhere: !where };
  }

  function doDelete(ts, p) {
    if (!(ts[p.i] && ts[p.i].v.toUpperCase() === "FROM")) throw new Error("DELETE needs FROM.");
    p.i++;
    const table = tableNamed(ts[p.i++].v);
    let where = null;
    if (ts[p.i] && ts[p.i].t === "word" && ts[p.i].v.toUpperCase() === "WHERE") {
      p.i++; where = parseWhere(ts, p, table);
    }
    const before = table.rows.length;
    table.rows = where ? table.rows.filter(r => !where(r)) : [];
    return { type: "write", affected: before - table.rows.length, verb: "deleted", noWhere: !where };
  }

  function run(sql) {
    const ts = lex(sql);
    if (!ts.length) throw new Error("Nothing to run.");
    const p = { i: 1 };
    const head = ts[0].v.toUpperCase();
    if (head === "SELECT") return doSelect(ts, p);
    if (head === "INSERT") return doInsert(ts, p);
    if (head === "UPDATE") return doUpdate(ts, p);
    if (head === "DELETE") return doDelete(ts, p);
    if (head === "CREATE" || head === "DROP" || head === "USE")
      throw new Error("The tables are already made for you here. Try SELECT, INSERT, UPDATE or DELETE.");
    throw new Error("A statement starts with SELECT, INSERT, UPDATE or DELETE.");
  }

  global.SQL = {
    run, reset,
    tables: () => db,
    snapshot: () => JSON.parse(JSON.stringify(db))
  };
})(window);
