/* ---------------------------------------------------------------
   The pseudocode and the flowchart for every problem.

   Her lecturer marks a four-part answer: pseudocode, flowchart, HTML
   form, PHP code - and the handwriting on the exercise sheet says so
   outright. An answer that is only code is an incomplete answer, so
   the answers page shows all of it.

   Kept in its own file, keyed by problem id, so the problem data
   itself does not have to be edited to add a plan to an old question.

   Conventions are his, from Lesson 1: CAPITALS, <-- to put a value
   in, = to ask a question, [square brackets] for a comment,
   IF/THEN/ELSE/ENDIF, and a flowchart with Start AND Stop and nothing
   left unconnected.

   The flowcharts here are sketches to copy onto paper. The shapes:
     ( oval )      start and stop
     / slant /     input and output
     [ box ]       do something
     < diamond >   decide, two ways out
--------------------------------------------------------------- */
const PLANS = {

/* ============================ Set I ============================ */
p1a: {
  pseudo:
`START
  [the numbers are written by the developer, not typed in]
  NUM1 <-- 100
  NUM2 <-- 10
  SUM        <-- NUM1 + NUM2
  PRODUCT    <-- NUM1 * NUM2
  DIFFERENCE <-- NUM1 - NUM2
  QUOTIENT   <-- NUM1 / NUM2
  PRINT "Sum: " , SUM
  PRINT "Product: " , PRODUCT
  PRINT "Difference: " , DIFFERENCE
  PRINT "Quotient: " , QUOTIENT
STOP`,
  flow:
`( START )
    |
[ NUM1 <-- 100 ]
    |
[ NUM2 <-- 10 ]
    |
[ work out SUM, PRODUCT, DIFFERENCE, QUOTIENT ]
    |
/ print the four results /
    |
( STOP )`
},

p1b: {
  pseudo:
`START
  [the page was opened as calc.php?num1=100&num2=10]
  NUM1 <-- the first number from the URL
  NUM2 <-- the second number from the URL
  SUM        <-- NUM1 + NUM2
  PRODUCT    <-- NUM1 * NUM2
  DIFFERENCE <-- NUM1 - NUM2
  QUOTIENT   <-- NUM1 / NUM2
  PRINT the four results
STOP`,
  flow:
`( START )
    |
/ read NUM1 and NUM2 from the URL /
    |
[ work out the four results ]
    |
/ print the four results /
    |
( STOP )`
},

p1c: {
  pseudo:
`START
  [the form has been filled in and one button pressed]
  NUM1 <-- the first number from the form
  NUM2 <-- the second number from the form
  IF the ADD button was pressed THEN
      RESULT <-- NUM1 + NUM2
  ELSE IF the SUB button was pressed THEN
      RESULT <-- NUM1 - NUM2
  ELSE IF the MULT button was pressed THEN
      RESULT <-- NUM1 * NUM2
  ELSE IF the DIV button was pressed THEN
      RESULT <-- NUM1 / NUM2
  ENDIF
  PRINT "The result = " , RESULT
STOP`,
  flow:
`( START )
    |
/ read NUM1, NUM2 and which button /
    |
< ADD ? > --yes--> [ RESULT <-- NUM1 + NUM2 ] --+
    | no                                        |
< SUB ? > --yes--> [ RESULT <-- NUM1 - NUM2 ] --+
    | no                                        |
< MULT ? > -yes--> [ RESULT <-- NUM1 * NUM2 ] --+
    | no                                        |
< DIV ? > --yes--> [ RESULT <-- NUM1 / NUM2 ] --+
                                                |
                          / print RESULT / <----+
                                 |
                             ( STOP )`
},

p2: {
  pseudo:
`START
  [five prices arrive from the form]
  P1, P2, P3, P4, P5 <-- the five prices
  [start by assuming the first price is both]
  HIGHEST <-- P1
  LOWEST  <-- P1
  FOR each of P2, P3, P4, P5
      IF this price > HIGHEST THEN HIGHEST <-- this price ENDIF
      IF this price < LOWEST  THEN LOWEST  <-- this price ENDIF
  ENDFOR
  PRINT HIGHEST in green
  PRINT LOWEST in red
STOP`,
  flow:
`( START )
    |
/ read the five prices /
    |
[ HIGHEST <-- P1 ,  LOWEST <-- P1 ]
    |
[ take the next price ] <-----------+
    |                               |
< price > HIGHEST ? > --yes--> [ HIGHEST <-- price ]
    | no                            |
< price < LOWEST ? >  --yes--> [ LOWEST <-- price ]
    |                               |
< any prices left ? > --yes---------+
    | no
/ print HIGHEST green, LOWEST red /
    |
( STOP )`
},

p3: {
  pseudo:
`START
  DAY <-- the day from the form
  IF DAY MOD 2 = 0 THEN
      PRINT "Day " , DAY , " is EVEN: Extra power mode active!"
  ELSE
      PRINT "Day " , DAY , " is ODD: Eco-conservation mode active!"
  ENDIF
STOP`,
  flow:
`( START )
    |
/ read DAY /
    |
< DAY MOD 2 = 0 ? >
   /            \\
 yes             no
  |               |
/ print EVEN /  / print ODD /
  |               |
  +-------+-------+
          |
      ( STOP )`
},

p4: {
  pseudo:
`START
  [no input at all - it runs on page load]
  PRINT the table heading row
  FOR N <-- 0 TO 5
      SQUARE <-- N * N
      CUBE   <-- N * N * N
      PRINT a row holding N , SQUARE , CUBE
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
/ print the header row ONCE /
    |
[ N <-- 0 ]
    |
< N <= 5 ? > --no--> / print end of table / --> ( STOP )
    | yes
[ SQUARE <-- N*N ,  CUBE <-- N*N*N ]
    |
/ print the row /
    |
[ N <-- N + 1 ]
    |
    +---> back to < N <= 5 ? >`
},

p5: {
  pseudo:
`START
  [no input - it runs on page load]
  PRINT the table heading row
  FOR N <-- 1 TO 6
      STORAGE   <-- 10 * N
      BANDWIDTH <-- 100 * N
      REQUESTS  <-- 1000 * N
      PRINT a row holding N , STORAGE , BANDWIDTH , REQUESTS
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
/ print the header row ONCE /
    |
[ N <-- 1 ]              [ note: 1, not 0 - nobody buys zero servers ]
    |
< N <= 6 ? > --no--> / print end of table / --> ( STOP )
    | yes
[ STORAGE <-- 10*N , BANDWIDTH <-- 100*N , REQUESTS <-- 1000*N ]
    |
/ print the row /
    |
[ N <-- N + 1 ]
    |
    +---> back to < N <= 6 ? >`
},

/* ====================== from the lecture slides ====================== */
d1: {
  pseudo:
`START
  RADIUS <-- 5          [set by the developer]
  AREA   <-- PI * RADIUS * RADIUS
  VOLUME <-- (4 / 3) * PI * RADIUS * RADIUS * RADIUS
  PRINT "Radius: " , RADIUS
  PRINT "Circle area: " , AREA rounded to 2 decimal places
  PRINT "Sphere volume: " , VOLUME rounded to 2 decimal places
STOP`,
  flow:
`( START )
    |
[ RADIUS <-- 5 ]
    |
[ AREA <-- PI * r^2 ]
    |
[ VOLUME <-- 4/3 * PI * r^3 ]
    |
/ print radius, area, volume /
    |
( STOP )`
},

d2: {
  pseudo:
`START
  RADIUS <-- the radius from the form
  IF RADIUS is not a number OR RADIUS <= 0 THEN
      PRINT "Please enter a positive number."
  ELSE
      AREA   <-- PI * RADIUS * RADIUS
      VOLUME <-- (4 / 3) * PI * RADIUS * RADIUS * RADIUS
      PRINT the radius, the area and the volume
  ENDIF
STOP`,
  flow:
`( START )
    |
/ read RADIUS /
    |
< is it a number AND > 0 ? >
   /                     \\
 no                       yes
  |                        |
/ print the error /   [ AREA <-- PI*r^2 ]
  |                        |
  |                   [ VOLUME <-- 4/3*PI*r^3 ]
  |                        |
  |                   / print the results /
  |                        |
  +-----------+------------+
              |
          ( STOP )`
},

/* ============================ Set II ============================ */
q1: {
  pseudo:
`START
  A <-- the first coefficient
  B <-- the second coefficient
  C <-- the constant
  IF A = 0 THEN
      PRINT "Not a quadratic equation."
  ELSE
      D <-- B * B - 4 * A * C          [the discriminant]
      IF D > 0 THEN
          X1 <-- (-B + SQUARE ROOT of D) / (2 * A)
          X2 <-- (-B - SQUARE ROOT of D) / (2 * A)
          PRINT "Two solutions: " , X1 , " and " , X2
      ELSE IF D = 0 THEN
          X <-- -B / (2 * A)
          PRINT "One solution: " , X
      ELSE
          PRINT "No real solution"
      ENDIF
  ENDIF
STOP`,
  flow:
`( START )
    |
/ read A, B, C /
    |
< A = 0 ? > --yes--> / print "not a quadratic" / --> ( STOP )
    | no
[ D <-- B*B - 4*A*C ]
    |
< D > 0 ? > --yes--> [ X1 <-- (-B + root D) / 2A ]
    | no                  [ X2 <-- (-B - root D) / 2A ]
    |                          |
    |                     / print two solutions / --+
    |                                               |
< D = 0 ? > --yes--> [ X <-- -B / 2A ]              |
    | no                  |                         |
    |                / print one solution / --------+
    |                                               |
/ print "no real solution" / -----------------------+
                                                    |
                                                ( STOP )`
},

q2: {
  pseudo:
`START
  A <-- the first side
  B <-- the second side
  C <-- the third side
  [any two sides must reach further than the third, or it lies flat]
  IF A + B <= C OR A + C <= B OR B + C <= A THEN
      PRINT "Not a triangle"
  ELSE IF A = B AND B = C THEN
      PRINT "Triangle type: Equilateral"
  ELSE IF A = B OR B = C OR A = C THEN
      PRINT "Triangle type: Isosceles"
  ELSE
      PRINT "Triangle type: Scalene"
  ENDIF
STOP`,
  flow:
`( START )
    |
/ read A, B, C /
    |
< do any two fail to reach past the third ? >
    | yes --> / print "Not a triangle" / ----------+
    | no                                           |
< A = B AND B = C ? >                              |
    | yes --> / print "Equilateral" / -------------+
    | no                                           |
< A = B OR B = C OR A = C ? >                      |
    | yes --> / print "Isosceles" / ---------------+
    | no                                           |
/ print "Scalene" / --------------------------------+
                                                    |
                                                ( STOP )`
},

q3: {
  pseudo:
`START
  A <-- the coefficient
  B <-- the constant
  IF A = 0 AND B = 0 THEN
      PRINT "Infinite solutions"     [0x + 0 = 0 is always true]
  ELSE IF A = 0 THEN
      PRINT "No solution"            [0x + 5 = 0 can never be true]
  ELSE
      X <-- -B / A
      PRINT "x = " , X
  ENDIF
STOP`,
  flow:
`( START )
    |
/ read A and B /
    |
< A = 0 AND B = 0 ? > --yes--> / print "Infinite solutions" / --+
    | no                                                        |
< A = 0 ? > ----------yes--> / print "No solution" / -----------+
    | no                                                        |
[ X <-- -B / A ]                                                |
    |                                                           |
/ print X / ----------------------------------------------------+
                                                                |
                                                            ( STOP )`
},

q4: {
  pseudo:
`START
  N    <-- the number from the form
  ROWS <-- how many rows the user asked for
  PRINT the table heading row          [once, before the loop]
  FOR I <-- 1 TO ROWS
      ANSWER <-- N * I
      PRINT a row holding N , " x " , I , " = " , ANSWER
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
/ read N and ROWS /
    |
/ print the header row ONCE /
    |
[ I <-- 1 ]
    |
< I <= ROWS ? > --no--> / print end of table / --> ( STOP )
    | yes
[ ANSWER <-- N * I ]
    |
/ print the row /
    |
[ I <-- I + 1 ]
    |
    +---> back to < I <= ROWS ? >`
},

q5: {
  pseudo:
`START
  ROWS <-- how many rows
  COLS <-- how many columns
  FOR R <-- 1 TO ROWS               [the outer loop walks the rows]
      START a new row
      FOR C <-- 1 TO COLS           [the inner loop walks across it]
          PRINT a cell holding R * C
      ENDFOR
      END the row
  ENDFOR
STOP`,
  flow:
`( START )
    |
/ read ROWS and COLS /
    |
[ R <-- 1 ]
    |
< R <= ROWS ? > --no--> ( STOP )
    | yes
/ start a row /
    |
[ C <-- 1 ]
    |
< C <= COLS ? > --no--> / end the row / --> [ R <-- R + 1 ] --+
    | yes                                                     |
/ print a cell holding R * C /                                |
    |                                                         |
[ C <-- C + 1 ]                                               |
    |                                                         |
    +---> back to < C <= COLS ? >                             |
                                                              |
          back to < R <= ROWS ? > <---------------------------+`
},

q6: {
  pseudo:
`START
  BALANCE <-- the amount from the form      [set ONCE, before the loop]
  RATE    <-- the interest rate
  YEARS   <-- how many years
  PRINT the table heading row
  FOR Y <-- 1 TO YEARS
      INTEREST <-- BALANCE * RATE / 100     [work it out BEFORE changing]
      BALANCE  <-- BALANCE + INTEREST
      PRINT a row holding Y , INTEREST , BALANCE
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
/ read BALANCE, RATE, YEARS /
    |
/ print the header row ONCE /
    |
[ Y <-- 1 ]
    |
< Y <= YEARS ? > --no--> / print end of table / --> ( STOP )
    | yes
[ INTEREST <-- BALANCE * RATE / 100 ]
    |
[ BALANCE <-- BALANCE + INTEREST ]     [carried into the next pass]
    |
/ print the row /
    |
[ Y <-- Y + 1 ]
    |
    +---> back to < Y <= YEARS ? >`
},

q7: {
  pseudo:
`START
  [the form - one pair of boxes per student]
  I <-- 1
  WHILE I <= 4
      PRINT a username box named "username" joined to I
      PRINT a grade box named "grade" joined to I
      I <-- I + 1
  ENDWHILE
  PRINT the Submit button

  [the results - nothing here happens until Submit is pressed]
  IF the Submit button was pressed THEN
      PRINT "Results"
      PRINT the start of the table
      PRINT the heading row                  [once, outside the loop]
      I <-- 1
      WHILE I <= 4
          USERNAME <-- the value of the box named "username" joined to I
          GRADE    <-- the value of the box named "grade" joined to I
          PRINT a row holding USERNAME and GRADE
          I <-- I + 1
      ENDWHILE
      PRINT the end of the table
  ENDIF
STOP`
},

/* ========================= Extra practice ========================= */
x1: {
  pseudo:
`START
  C <-- the temperature in Celsius, from the URL
  F <-- C * 9 / 5 + 32
  PRINT C , "C = " , F , "F"
STOP`,
  flow:
`( START ) --> / read C / --> [ F <-- C * 9/5 + 32 ] --> / print C and F / --> ( STOP )`
},

x2: {
  pseudo:
`START
  A, B, C <-- the three numbers
  LARGEST <-- A                 [assume the first one wins]
  IF B > LARGEST THEN LARGEST <-- B ENDIF
  IF C > LARGEST THEN LARGEST <-- C ENDIF
  PRINT "Largest: " , LARGEST
STOP`,
  flow:
`( START )
    |
/ read A, B, C /
    |
[ LARGEST <-- A ]
    |
< B > LARGEST ? > --yes--> [ LARGEST <-- B ]
    |                            |
    +-------------+--------------+
                  |
< C > LARGEST ? > --yes--> [ LARGEST <-- C ]
    |                            |
    +-------------+--------------+
                  |
          / print LARGEST /
                  |
              ( STOP )`
},

x3: {
  pseudo:
`START
  YEAR <-- the year from the form
  [test 400 FIRST, then 100, then 4 - the order is the whole rule]
  IF YEAR MOD 400 = 0 THEN
      LEAP <-- TRUE
  ELSE IF YEAR MOD 100 = 0 THEN
      LEAP <-- FALSE
  ELSE IF YEAR MOD 4 = 0 THEN
      LEAP <-- TRUE
  ELSE
      LEAP <-- FALSE
  ENDIF
  IF LEAP THEN PRINT YEAR , " is a LEAP year"
  ELSE PRINT YEAR , " is NOT a leap year" ENDIF
STOP`,
  flow:
`( START )
    |
/ read YEAR /
    |
< YEAR MOD 400 = 0 ? > --yes--> [ LEAP <-- TRUE ] ---+
    | no                                             |
< YEAR MOD 100 = 0 ? > --yes--> [ LEAP <-- FALSE ] --+
    | no                                             |
< YEAR MOD 4 = 0 ? >   --yes--> [ LEAP <-- TRUE ] ---+
    | no                                             |
[ LEAP <-- FALSE ] -------------------------------- +
                                                    |
                                       < LEAP ? > <-+
                                        /        \\
                                      yes         no
                                       |           |
                            / print LEAP /   / print NOT leap /
                                       |           |
                                       +-----+-----+
                                             |
                                         ( STOP )`
},

x4: {
  pseudo:
`START
  N <-- 7
  PRINT the start of the table
  FOR I <-- 1 TO 10
      PRINT a row holding N , " x " , I , " = " , N * I
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
[ N <-- 7 ]
    |
[ I <-- 1 ]
    |
< I <= 10 ? > --no--> ( STOP )
    | yes
/ print the row for N x I /
    |
[ I <-- I + 1 ]
    |
    +---> back to < I <= 10 ? >`
},

x5: {
  pseudo:
`START
  PRINT the table heading row
  FOR N <-- 1 TO 5
      PRICE   <-- 5 * N
      SMS     <-- 100 * N
      MINUTES <-- 60 * N
      PRINT a row holding N , PRICE , SMS , MINUTES
  ENDFOR
  PRINT the end of the table
STOP`,
  flow:
`( START )
    |
/ print the header row ONCE /
    |
[ N <-- 1 ]
    |
< N <= 5 ? > --no--> / print end of table / --> ( STOP )
    | yes
[ PRICE <-- 5*N , SMS <-- 100*N , MINUTES <-- 60*N ]
    |
/ print the row /
    |
[ N <-- N + 1 ]
    |
    +---> back to < N <= 5 ? >`
},

x6: {
  pseudo:
`START
  PRICE, QTY, VAT <-- the three values from the form
  SUBTOTAL <-- PRICE * QTY
  TAX      <-- SUBTOTAL * VAT / 100
  TOTAL    <-- SUBTOTAL + TAX
  PRINT "Subtotal: " , SUBTOTAL to 2 decimal places
  PRINT "VAT: "      , TAX      to 2 decimal places
  PRINT "Total: "    , TOTAL    to 2 decimal places
STOP`,
  flow:
`( START )
    |
/ read PRICE, QTY, VAT /
    |
[ SUBTOTAL <-- PRICE * QTY ]
    |
[ TAX <-- SUBTOTAL * VAT / 100 ]
    |
[ TOTAL <-- SUBTOTAL + TAX ]
    |
/ print the three money lines /
    |
( STOP )`
},

x7: {
  pseudo:
`START
  MARK <-- the mark from the form
  IF MARK >= 18 THEN LETTER <-- "A"
  ELSE IF MARK >= 16 THEN LETTER <-- "B"
  ELSE IF MARK >= 14 THEN LETTER <-- "C"
  ELSE IF MARK >= 10 THEN LETTER <-- "D"
  ELSE LETTER <-- "F"
  ENDIF
  PRINT "Mark " , MARK , " = " , LETTER
STOP`,
  flow:
`( START )
    |
/ read MARK /
    |
< MARK >= 18 ? > --yes--> [ LETTER <-- "A" ] --+
    | no                                       |
< MARK >= 16 ? > --yes--> [ LETTER <-- "B" ] --+
    | no                                       |
< MARK >= 14 ? > --yes--> [ LETTER <-- "C" ] --+
    | no                                       |
< MARK >= 10 ? > --yes--> [ LETTER <-- "D" ] --+
    | no                                       |
[ LETTER <-- "F" ] ----------------------------+
                                               |
                            / print the mark and the letter /
                                               |
                                           ( STOP )`
},

x8: {
  pseudo:
`START
  WEIGHT <-- the weight from the form
  ZONE   <-- the zone from the form
  COST <-- 3                               [the first kilogram]
  IF WEIGHT > 1 THEN
      EXTRA <-- WEIGHT - 1 rounded UP to a whole number
      COST  <-- COST + EXTRA * 2
  ENDIF
  IF ZONE = "intl" THEN                    [a separate IF, not ELSE]
      COST <-- COST * 2
  ENDIF
  PRINT "Shipping: $" , COST
STOP`,
  flow:
`( START )
    |
/ read WEIGHT and ZONE /
    |
[ COST <-- 3 ]
    |
< WEIGHT > 1 ? > --yes--> [ EXTRA <-- round up (WEIGHT - 1) ]
    | no                        |
    |                      [ COST <-- COST + EXTRA * 2 ]
    |                           |
    +-------------+-------------+
                  |
< ZONE = intl ? > --yes--> [ COST <-- COST * 2 ]
    | no                        |
    +-------------+-------------+
                  |
          / print COST /
                  |
              ( STOP )`
},

x9: {
  pseudo:
`START
  N <-- the starting number from the form
  FOR I <-- N DOWN TO 1
      IF I MOD 2 = 0 THEN
          PRINT I , " is EVEN"
      ELSE
          PRINT I , " is ODD"
      ENDIF
  ENDFOR
  PRINT "Liftoff!"
STOP`,
  flow:
`( START )
    |
/ read N /
    |
[ I <-- N ]
    |
< I >= 1 ? > --no--> / print "Liftoff!" / --> ( STOP )
    | yes
< I MOD 2 = 0 ? >
   /           \\
 yes            no
  |              |
/ EVEN /      / ODD /
  |              |
  +------+-------+
         |
   [ I <-- I - 1 ]        [DOWN, not up - three changes from the usual loop]
         |
         +---> back to < I >= 1 ? >`
},

x10: {
  pseudo:
`START
  WEIGHT <-- the weight in kilograms
  HEIGHT <-- the height in metres
  BMI <-- WEIGHT / (HEIGHT * HEIGHT)      [brackets, or it undoes itself]
  BMI <-- BMI rounded to 2 decimal places
  IF BMI < 18.5 THEN BAND <-- "Underweight"
  ELSE IF BMI < 25 THEN BAND <-- "Normal"
  ELSE IF BMI < 30 THEN BAND <-- "Overweight"
  ELSE BAND <-- "Obese"
  ENDIF
  PRINT "BMI: " , BMI , " (" , BAND , ")"
STOP`,
  flow:
`( START )
    |
/ read WEIGHT and HEIGHT /
    |
[ BMI <-- WEIGHT / (HEIGHT * HEIGHT) ]
    |
< BMI < 18.5 ? > --yes--> [ BAND <-- "Underweight" ] --+
    | no                                               |
< BMI < 25 ? >   --yes--> [ BAND <-- "Normal" ] -------+
    | no                                               |
< BMI < 30 ? >   --yes--> [ BAND <-- "Overweight" ] ---+
    | no                                               |
[ BAND <-- "Obese" ] ----------------------------------+
                                                       |
                                  / print BMI and BAND /
                                                       |
                                                   ( STOP )`
}

};
