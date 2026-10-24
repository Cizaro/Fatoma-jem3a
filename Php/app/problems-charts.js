/* ---------------------------------------------------------------
   Every problem's flowchart, as shapes rather than as a description
   of shapes. flowchart.js draws these; see the comment there for the
   node types.

     start / stop   oval
     io             parallelogram - input or output
     proc           rectangle - do something
     dec            diamond - a question
       .yes         a box reached by "yes" that rejoins lower down
       .body        a loop - runs while the answer is yes
--------------------------------------------------------------- */
const CHARTS = {

/* ============================ Set I ============================ */
p1a: { nodes: [
  { t:"start" },
  { t:"proc", s:"NUM1 <-- 100" },
  { t:"proc", s:"NUM2 <-- 10" },
  { t:"proc", s:"SUM, PRODUCT, DIFFERENCE, QUOTIENT" },
  { t:"io",   s:"print the four results" },
  { t:"stop" }
]},

p1b: { nodes: [
  { t:"start" },
  { t:"io",   s:"read NUM1 and NUM2 from the URL" },
  { t:"proc", s:"work out the four results" },
  { t:"io",   s:"print the four results" },
  { t:"stop" }
]},

p1c: { nodes: [
  { t:"start" },
  { t:"io",  s:"read NUM1, NUM2 and the button" },
  { t:"dec", s:"ADD pressed ?",  yes:{ t:"proc", s:"RESULT <-- NUM1 + NUM2" } },
  { t:"dec", s:"SUB pressed ?",  yes:{ t:"proc", s:"RESULT <-- NUM1 - NUM2" } },
  { t:"dec", s:"MULT pressed ?", yes:{ t:"proc", s:"RESULT <-- NUM1 * NUM2" } },
  { t:"proc", s:"RESULT <-- NUM1 / NUM2" },
  { t:"io",  s:"print The result = RESULT" },
  { t:"stop" }
]},

p2: { nodes: [
  { t:"start" },
  { t:"io",   s:"read the five prices" },
  { t:"proc", s:"HIGHEST <-- P1   LOWEST <-- P1" },
  { t:"dec",  s:"any prices left ?", body:[
      { t:"proc", s:"take the next price" },
      { t:"dec",  s:"price > HIGHEST ?", yes:{ t:"proc", s:"HIGHEST <-- price" } },
      { t:"dec",  s:"price < LOWEST ?",  yes:{ t:"proc", s:"LOWEST <-- price" } }
  ]},
  { t:"io",   s:"print HIGHEST green, LOWEST red" },
  { t:"stop" }
]},

p3: { nodes: [
  { t:"start" },
  { t:"io",  s:"read DAY" },
  { t:"dec", s:"DAY MOD 2 = 0 ?", yes:{ t:"io", s:"print EVEN, extra power" } },
  { t:"io",  s:"print ODD, eco mode" },
  { t:"stop" }
]},

p4: { nodes: [
  { t:"start" },
  { t:"io",   s:"print the header row ONCE" },
  { t:"proc", s:"N <-- 0" },
  { t:"dec",  s:"N <= 5 ?", body:[
      { t:"proc", s:"SQUARE <-- N*N   CUBE <-- N*N*N" },
      { t:"io",   s:"print the row" },
      { t:"proc", s:"N <-- N + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

p5: { nodes: [
  { t:"start" },
  { t:"io",   s:"print the header row ONCE" },
  { t:"proc", s:"N <-- 1" },
  { t:"dec",  s:"N <= 6 ?", body:[
      { t:"proc", s:"STORAGE, BANDWIDTH, REQUESTS from N" },
      { t:"io",   s:"print the row" },
      { t:"proc", s:"N <-- N + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

/* ====================== from the lecture slides ====================== */
d1: { nodes: [
  { t:"start" },
  { t:"proc", s:"RADIUS <-- 5" },
  { t:"proc", s:"AREA <-- PI * R * R" },
  { t:"proc", s:"VOLUME <-- 4/3 * PI * R * R * R" },
  { t:"io",   s:"print radius, area, volume" },
  { t:"stop" }
]},

d2: { nodes: [
  { t:"start" },
  { t:"io",  s:"read RADIUS" },
  { t:"dec", s:"not a number OR <= 0 ?", yes:{ t:"io", s:"print the error" } },
  { t:"proc", s:"AREA <-- PI * R * R" },
  { t:"proc", s:"VOLUME <-- 4/3 * PI * R * R * R" },
  { t:"io",  s:"print the results" },
  { t:"stop" }
]},

/* ============================ Set II ============================ */
q1: { nodes: [
  { t:"start" },
  { t:"io",   s:"read A, B, C" },
  { t:"dec",  s:"A = 0 ?", yes:{ t:"io", s:"print not a quadratic" } },
  { t:"proc", s:"D <-- B*B - 4*A*C" },
  { t:"dec",  s:"D > 0 ?", yes:{ t:"io", s:"print two solutions" } },
  { t:"dec",  s:"D = 0 ?", yes:{ t:"io", s:"print one solution" } },
  { t:"io",   s:"print no real solution" },
  { t:"stop" }
]},

q2: { nodes: [
  { t:"start" },
  { t:"io",  s:"read A, B, C" },
  { t:"dec", s:"any two fail to reach past the third ?",
             yes:{ t:"io", s:"print Not a triangle" } },
  { t:"dec", s:"A = B AND B = C ?", yes:{ t:"io", s:"print Equilateral" } },
  { t:"dec", s:"A = B OR B = C OR A = C ?", yes:{ t:"io", s:"print Isosceles" } },
  { t:"io",  s:"print Scalene" },
  { t:"stop" }
]},

q3: { nodes: [
  { t:"start" },
  { t:"io",  s:"read A and B" },
  { t:"dec", s:"A = 0 AND B = 0 ?", yes:{ t:"io", s:"print Infinite solutions" } },
  { t:"dec", s:"A = 0 ?", yes:{ t:"io", s:"print No solution" } },
  { t:"proc", s:"X <-- -B / A" },
  { t:"io",  s:"print x = X" },
  { t:"stop" }
]},

q4: { nodes: [
  { t:"start" },
  { t:"io",   s:"read N and ROWS" },
  { t:"io",   s:"print the header row ONCE" },
  { t:"proc", s:"I <-- 1" },
  { t:"dec",  s:"I <= ROWS ?", body:[
      { t:"proc", s:"ANSWER <-- N * I" },
      { t:"io",   s:"print the row" },
      { t:"proc", s:"I <-- I + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

q5: { nodes: [
  { t:"start" },
  { t:"io",   s:"read ROWS and COLS" },
  { t:"proc", s:"R <-- 1" },
  { t:"dec",  s:"R <= ROWS ?", body:[
      { t:"io",   s:"start a new row" },
      { t:"proc", s:"C <-- 1" },
      { t:"dec",  s:"C <= COLS ?", body:[
          { t:"io",   s:"print a cell holding R * C" },
          { t:"proc", s:"C <-- C + 1" }
      ]},
      { t:"io",   s:"end the row" },
      { t:"proc", s:"R <-- R + 1" }
  ]},
  { t:"stop" }
]},

q6: { nodes: [
  { t:"start" },
  { t:"io",   s:"read BALANCE, RATE, YEARS" },
  { t:"io",   s:"print the header row ONCE" },
  { t:"proc", s:"Y <-- 1" },
  { t:"dec",  s:"Y <= YEARS ?", body:[
      { t:"proc", s:"INTEREST <-- BALANCE * RATE / 100" },
      { t:"proc", s:"BALANCE <-- BALANCE + INTEREST" },
      { t:"io",   s:"print the row" },
      { t:"proc", s:"Y <-- Y + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

q7: { nodes: [
  { t:"start" },
  { t:"proc", s:"I <-- 1" },
  { t:"dec",  s:"I <= 4 ?", body:[
      { t:"io",   s:"print the username and grade boxes for student I" },
      { t:"proc", s:"I <-- I + 1" }
  ]},
  { t:"io",   s:"print the Submit button" },
  { t:"dec",  s:"Submit NOT pressed ?", yes:{ t:"io", s:"show the form only" } },
  { t:"io",   s:"print the heading row ONCE" },
  { t:"proc", s:"I <-- 1" },
  { t:"dec",  s:"I <= 4 ?", body:[
      { t:"proc", s:"read username I and grade I" },
      { t:"io",   s:"print a row for student I" },
      { t:"proc", s:"I <-- I + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

q8: { nodes: [
  { t:"start" },
  { t:"io",   s:"read N" },
  { t:"dec",  s:"N not a number, or outside 1 to 100 ?",
              yes:{ t:"io", s:"print the error" } },
  { t:"proc", s:"I <-- 1" },
  { t:"dec",  s:"I <= N ?", body:[
      { t:"io",   s:"print Hello world" },
      { t:"proc", s:"I <-- I + 1" }
  ]},
  { t:"stop" }
]},

/* ========================= Extra practice ========================= */
x1: { nodes: [
  { t:"start" },
  { t:"io",   s:"read C" },
  { t:"proc", s:"F <-- C * 9 / 5 + 32" },
  { t:"io",   s:"print C and F" },
  { t:"stop" }
]},

x2: { nodes: [
  { t:"start" },
  { t:"io",   s:"read A, B, C" },
  { t:"proc", s:"LARGEST <-- A" },
  { t:"dec",  s:"B > LARGEST ?", yes:{ t:"proc", s:"LARGEST <-- B" } },
  { t:"dec",  s:"C > LARGEST ?", yes:{ t:"proc", s:"LARGEST <-- C" } },
  { t:"io",   s:"print LARGEST" },
  { t:"stop" }
]},

x3: { nodes: [
  { t:"start" },
  { t:"io",  s:"read YEAR" },
  { t:"dec", s:"YEAR MOD 400 = 0 ?", yes:{ t:"io", s:"print is a LEAP year" } },
  { t:"dec", s:"YEAR MOD 100 = 0 ?", yes:{ t:"io", s:"print NOT a leap year" } },
  { t:"dec", s:"YEAR MOD 4 = 0 ?",   yes:{ t:"io", s:"print is a LEAP year" } },
  { t:"io",  s:"print NOT a leap year" },
  { t:"stop" }
]},

x4: { nodes: [
  { t:"start" },
  { t:"proc", s:"N <-- 7" },
  { t:"proc", s:"I <-- 1" },
  { t:"dec",  s:"I <= 10 ?", body:[
      { t:"io",   s:"print the row for N x I" },
      { t:"proc", s:"I <-- I + 1" }
  ]},
  { t:"stop" }
]},

x5: { nodes: [
  { t:"start" },
  { t:"io",   s:"print the header row ONCE" },
  { t:"proc", s:"N <-- 1" },
  { t:"dec",  s:"N <= 5 ?", body:[
      { t:"proc", s:"PRICE, SMS, MINUTES from N" },
      { t:"io",   s:"print the row" },
      { t:"proc", s:"N <-- N + 1" }
  ]},
  { t:"io",   s:"print the end of the table" },
  { t:"stop" }
]},

x6: { nodes: [
  { t:"start" },
  { t:"io",   s:"read PRICE, QTY, VAT" },
  { t:"proc", s:"SUBTOTAL <-- PRICE * QTY" },
  { t:"proc", s:"TAX <-- SUBTOTAL * VAT / 100" },
  { t:"proc", s:"TOTAL <-- SUBTOTAL + TAX" },
  { t:"io",   s:"print the three money lines" },
  { t:"stop" }
]},

x7: { nodes: [
  { t:"start" },
  { t:"io",  s:"read MARK" },
  { t:"dec", s:"MARK >= 18 ?", yes:{ t:"proc", s:"LETTER <-- A" } },
  { t:"dec", s:"MARK >= 16 ?", yes:{ t:"proc", s:"LETTER <-- B" } },
  { t:"dec", s:"MARK >= 14 ?", yes:{ t:"proc", s:"LETTER <-- C" } },
  { t:"dec", s:"MARK >= 10 ?", yes:{ t:"proc", s:"LETTER <-- D" } },
  { t:"proc", s:"LETTER <-- F" },
  { t:"io",  s:"print the mark and the letter" },
  { t:"stop" }
]},

x8: { nodes: [
  { t:"start" },
  { t:"io",   s:"read WEIGHT and ZONE" },
  { t:"proc", s:"COST <-- 3" },
  { t:"dec",  s:"WEIGHT > 1 ?", yes:{ t:"proc", s:"COST <-- COST + round up (W-1) * 2" } },
  { t:"dec",  s:"ZONE = intl ?", yes:{ t:"proc", s:"COST <-- COST * 2" } },
  { t:"io",   s:"print Shipping: COST" },
  { t:"stop" }
]},

x9: { nodes: [
  { t:"start" },
  { t:"io",   s:"read N" },
  { t:"proc", s:"I <-- N" },
  { t:"dec",  s:"I >= 1 ?", body:[
      { t:"dec",  s:"I MOD 2 = 0 ?", yes:{ t:"io", s:"print I is EVEN" } },
      { t:"io",   s:"print I is ODD" },
      { t:"proc", s:"I <-- I - 1" }
  ]},
  { t:"io",   s:"print Liftoff!" },
  { t:"stop" }
]},

x10: { nodes: [
  { t:"start" },
  { t:"io",   s:"read WEIGHT and HEIGHT" },
  { t:"proc", s:"BMI <-- WEIGHT / (HEIGHT * HEIGHT)" },
  { t:"dec",  s:"BMI < 18.5 ?", yes:{ t:"proc", s:"BAND <-- Underweight" } },
  { t:"dec",  s:"BMI < 25 ?",   yes:{ t:"proc", s:"BAND <-- Normal" } },
  { t:"dec",  s:"BMI < 30 ?",   yes:{ t:"proc", s:"BAND <-- Overweight" } },
  { t:"proc", s:"BAND <-- Obese" },
  { t:"io",   s:"print BMI and BAND" },
  { t:"stop" }
]}

};
