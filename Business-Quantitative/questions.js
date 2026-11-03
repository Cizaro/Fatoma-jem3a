// Practice per topic (keyed t1..t15, same order as formulas.js) and the mock exam.
// Practice reuses the numbers from her own files. The mock exam uses the same formulas with new numbers.
// Number question: { q, a, unit, s }, optionally alt: [other accepted answers].
// Choice question: { q, o: [options], c: index of the right option, s }.
window.QUESTIONS = {
  practice: {
    t1: [
      { q: "A machine costs 100,000 and has a salvage value of 25,000 after 5 years. What is the average investment?", a: 62500, s: ["(100,000 + 25,000) ÷ 2 = <b>62,500</b>"] },
      { q: "The same machine brings net inflows of 20,000 in years 1 and 2, 10,000 in years 3 and 4, and 30,000 in year 5. What is the ARR, in %?", a: 4.8, unit: "%", s: ["Inflows = 40,000 + 20,000 + 30,000 = 90,000", "Depreciation = 100,000 − 25,000 = 75,000", "Total profit = 90,000 − 75,000 = 15,000; average = 15,000 ÷ 5 = 3,000", "ARR = 3,000 ÷ 62,500 = <b>4.8%</b>"] },
      { q: "The ARR is 4.8% and the company's required rate of return is 6%. What should it do?", o: ["Accept the project", "Reject the project"], c: 1, s: ["ARR is less than the required rate, so <b>reject</b>."] }
    ],
    t2: [
      { q: "Base prices 5, 10, 20 and base quantities 100, 200, 300. Year 2 prices are 7, 13, 24. Laspeyres index for year 2?", a: 123.53, s: ["Top = 7×100 + 13×200 + 24×300 = 700 + 2,600 + 7,200 = 10,500", "Bottom = 5×100 + 10×200 + 20×300 = 8,500", "10,500 ÷ 8,500 × 100 = <b>123.53</b>"] },
      { q: "The Laspeyres index weights prices with quantities from which period?", o: ["The base period", "The current (observation) period", "Both periods averaged"], c: 0, s: ["Laspeyres uses <b>base-period</b> quantities."] },
      { q: "What is the main disadvantage of the Laspeyres index?", o: ["It is expensive to build", "It tends to overstate price increases (upward bias)", "It needs new quantities every year"], c: 1, s: ["It is <b>upward-biased</b>: new goods, quality changes and substitution make it overstate inflation."] }
    ],
    t3: [
      { q: "Base prices 5, 10, 20. Year 2 prices 7, 13, 24 and year 2 quantities 57, 67, 77. Paasche index for year 2?", a: 124.97, s: ["Top = 7×57 + 13×67 + 24×77 = 399 + 871 + 1,848 = 3,118", "Bottom = 5×57 + 10×67 + 20×77 = 285 + 670 + 1,540 = 2,495", "3,118 ÷ 2,495 × 100 = <b>124.97</b>"] },
      { q: "The Paasche index weights prices with quantities from which period?", o: ["The base period", "The current (observation) period"], c: 1, s: ["Paasche uses <b>current-period</b> quantities, which is why it is called the current weighted index."] },
      { q: "Which is a disadvantage of the Paasche index?", o: ["It is upward-biased", "Current quantity data can be hard to get, so it costs more", "It ignores consumption patterns"], c: 1, s: ["Current weightings are <b>hard to obtain and costlier</b>. It also tends to understate price changes."] }
    ],
    t4: [
      { q: "You invest 100,000 in shares and after 12 months they are worth 160,000. ROI in %?", a: 60, unit: "%", s: ["(160,000 − 100,000) ÷ 100,000 = 0.6 = <b>60%</b>"] },
      { q: "A home bought for 1,000,000 is sold for 1,120,000. ROI in %?", a: 12, unit: "%", s: ["120,000 ÷ 1,000,000 = <b>12%</b>"] },
      { q: "Which is a limitation of ROI?", o: ["It is hard to calculate", "It does not adjust for risk or the holding period", "It counts non-financial benefits"], c: 1, s: ["ROI <b>does not adjust for risk</b> and ignores how long the money was held."] }
    ],
    t5: [
      { q: "Sales are 750,000 and total variable costs are 450,000. What is the contribution margin ratio, in %?", a: 40, unit: "%", s: ["CM = 750,000 − 450,000 = 300,000", "300,000 ÷ 750,000 = <b>40%</b>"] },
      { q: "Fixed costs 300,000, contribution margin 1.20 per unit. Break-even in units?", a: 250000, unit: "units", s: ["300,000 ÷ 1.20 = <b>250,000 units</b>"] },
      { q: "Same company (CM ratio 40%). What sales are needed for a targeted income of 60,000?", a: 900000, s: ["(300,000 + 60,000) ÷ 0.40 = <b>900,000</b>"] },
      { q: "Now the 60,000 is net income after a 40% tax. What sales are needed?", a: 1000000, s: ["Income before tax = 60,000 ÷ (1 − 0.40) = 100,000", "(300,000 + 100,000) ÷ 0.40 = <b>1,000,000</b>"] },
      { q: "Break-even sales are 750,000. Why is the sales level for 60,000 of income 900,000 and not 810,000?", o: ["Fixed costs go up with sales", "Every extra unit sold also adds variable cost", "Taxes are added"], c: 1, s: ["Each additional unit has <b>variable costs</b> that reduce the extra revenue."] }
    ],
    t6: [
      { q: "Net income is 2,000 and shareholders' equity is 15,000. ROE in %?", a: 13.33, unit: "%", s: ["2,000 ÷ 15,000 = <b>13.33%</b>"] },
      { q: "Total assets are 2,600,000 and total liabilities are 920,000. Shareholders' equity?", a: 1680000, s: ["2,600,000 − 920,000 = <b>1,680,000</b>"] },
      { q: "When management buys back its own shares, ROE usually…", o: ["Increases, because equity (the denominator) shrinks", "Decreases", "Stays the same"], c: 0, s: ["Fewer shares, smaller equity, so ROE <b>increases</b>."] }
    ],
    t7: [
      { q: "A phone sells for 100. Variable manufacturing cost is 30 and variable selling cost is 10. Contribution margin per phone?", a: 60, s: ["100 − 30 − 10 = <b>60</b>"] },
      { q: "50,000 phones are sold. Total contribution margin?", a: 3000000, s: ["60 × 50,000 = <b>3,000,000</b>"] },
      { q: "Which one is a variable cost?", o: ["Rent", "Commissions", "Insurance", "Salaries"], c: 1, s: ["<b>Commissions</b> are paid per unit sold. The others are fixed."] },
      { q: "Which one is a fixed cost?", o: ["Direct materials", "Freight in/out", "Depreciation", "Per-unit labour"], c: 2, s: ["<b>Depreciation</b> does not change with volume."] }
    ],
    t8: [
      { q: "Invest 550,000. Cash flows: 75,000, 140,000, 200,000, 110,000, 60,000. Payback period in years?", a: 4.42, unit: "years", s: ["Cumulative: −475,000, −335,000, −135,000, −25,000 (year 4), +35,000", "4 + 25,000 ÷ 60,000 = <b>4.42 years</b>"] },
      { q: "Which is a disadvantage of the payback period?", o: ["It is hard to compute", "It ignores the time value of money", "It needs a lot of inputs"], c: 1, s: ["It <b>ignores the time value of money</b>, profitability and cash after payback."] }
    ],
    t9: [
      { q: "300,000 units at 25, variable cost 0.08 per unit, fixed costs 780,000. DOL?", a: 1.12, s: ["CM = 300,000 × 24.92 = 7,476,000", "Profit = 7,476,000 − 780,000 = 6,696,000", "DOL = 7,476,000 ÷ 6,696,000 = <b>1.12</b>"] },
      { q: "Now 450,000 units at 20 (same variable and fixed costs). DOL?", a: 1.10, s: ["CM = 450,000 × 19.92 = 8,964,000", "Profit = 8,964,000 − 780,000 = 8,184,000", "DOL = 8,964,000 ÷ 8,184,000 = <b>1.10</b>"] },
      { q: "DOL is 1.10. If sales rise 10%, by how many % do profits rise?", a: 11, unit: "%", s: ["10% × 1.10 = <b>11%</b>"] },
      { q: "A high degree of operating leverage means the company has…", o: ["A high proportion of fixed costs compared with variable costs", "A high proportion of variable costs", "No fixed costs"], c: 0, s: ["High DOL = <b>high fixed costs</b> relative to variable costs."] }
    ],
    t10: [
      { q: "Inflation is which type of risk?", o: ["Systematic", "Unsystematic"], c: 0, s: ["<b>Systematic</b>."] },
      { q: "An employee strike is which type of risk?", o: ["Systematic", "Unsystematic"], c: 1, s: ["<b>Unsystematic</b>."] },
      { q: "Changes in interest rates are which type of risk?", o: ["Systematic", "Unsystematic"], c: 0, s: ["<b>Systematic</b>."] },
      { q: "A high rate of employee turnover is which type of risk?", o: ["Systematic", "Unsystematic"], c: 1, s: ["<b>Unsystematic</b>."] }
    ],
    t11: [
      { q: "Employees are listed alphabetically. Start at number 6 and take every 10th person. Which method?", o: ["Simple random", "Systematic", "Cluster", "Quota"], c: 1, s: ["Regular intervals: <b>systematic</b>."] },
      { q: "800 women and 200 men. You randomly pick 80 women and 20 men. Which method?", o: ["Stratified", "Cluster", "Convenience", "Snowball"], c: 0, s: ["Each subgroup sampled in proportion: <b>stratified</b>."] },
      { q: "The company has 10 offices. You randomly pick 3 offices and survey them. Which method?", o: ["Stratified", "Systematic", "Cluster", "Purposive"], c: 2, s: ["Whole groups chosen: <b>cluster</b>."] },
      { q: "One homeless person puts you in contact with others they know. Which method?", o: ["Snowball", "Quota", "Voluntary response", "Consecutive"], c: 0, s: ["<b>Snowball</b>."] },
      { q: "You survey the students in your own classes after each lecture. Which method?", o: ["Simple random", "Convenience", "Stratified", "Cluster"], c: 1, s: ["Most accessible people: <b>convenience</b>."] },
      { q: "Which type of sampling allows generalisations about the whole population?", o: ["Probability sampling", "Non-probability sampling"], c: 0, s: ["<b>Probability</b> sampling (random selection)."] }
    ],
    t12: [
      { q: "Hours X: 2, 3, 4, 5, 6. Scores Y: 60, 75, 80, 90, 95. What is the sum of (X − X̄)(Y − Ȳ)?", a: 85, s: ["X̄ = 4, Ȳ = 80", "Products: (−2)(−20) + (−1)(−5) + 0 + (1)(10) + (2)(15) = 40 + 5 + 0 + 10 + 30 = <b>85</b>"] },
      { q: "Same data. Sample covariance?", a: 21.25, s: ["85 ÷ (5 − 1) = <b>21.25</b>"] },
      { q: "A covariance of +21.25 means…", o: ["A positive linear relationship", "A negative relationship", "A very strong relationship because the number is big"], c: 0, s: ["<b>Positive</b>: they move together. The size does not show strength."] }
    ],
    t13: [
      { q: "Q = 2K + 3L. Returns to scale?", o: ["Increasing", "Constant", "Decreasing"], c: 1, s: ["Output becomes m·Q: <b>constant</b>."] },
      { q: "Q = 0.5KL. Returns to scale?", o: ["Increasing", "Constant", "Decreasing"], c: 0, s: ["Output becomes m²·Q, more than m: <b>increasing</b>."] },
      { q: "Q = K<sup>0.3</sup>L<sup>0.2</sup>. Returns to scale?", o: ["Increasing", "Constant", "Decreasing"], c: 2, s: ["Output becomes m<sup>0.5</sup>·Q, less than m: <b>decreasing</b>."] },
      { q: "Hamburgers alone cost 500,000, sandwiches alone 1,200,000, both together 1,500,000. Economies of scope, in %?", a: 13.33, unit: "%", s: ["(500,000 + 1,200,000 − 1,500,000) ÷ 1,500,000 = <b>13.33%</b>"] }
    ],
    t14: [
      { q: "Mean 1150, standard deviation 150. What is the z-score of 1380?", a: 1.53, s: ["(1380 − 1150) ÷ 150 = 230 ÷ 150 = <b>1.53</b>"] },
      { q: "The z-table gives 0.937 for z = 1.53. What share of scores is above 1380? (as a decimal)", a: 0.063, alt: [6.3], z: 1.53, s: ["1 − 0.937 = <b>0.063</b> (6.3%)"] },
      { q: "Mean 1150, standard deviation 150. About 95% of scores lie between 850 and…?", a: 1450, s: ["2 standard deviations: 1150 + 2×150 = <b>1450</b>"] },
      { q: "In a normal distribution, the mean, median and mode are…", o: ["All different", "The same", "Mean bigger than median"], c: 1, s: ["They are <b>the same</b>."] }
    ],
    t15: [
      { q: "The middle value after the data is arranged in order is the…", o: ["Mean", "Median", "Mode", "Range"], c: 1, s: ["<b>Median</b>."] },
      { q: "The value that appears the most times is the…", o: ["Mean", "Median", "Mode", "Range"], c: 2, s: ["<b>Mode</b>."] },
      { q: "The n-th root of the product of the values is the…", o: ["Arithmetic mean", "Geometric mean", "Median"], c: 1, s: ["<b>Geometric mean</b>."] },
      { q: "Largest value minus smallest value is the…", o: ["Range", "Mode", "Mean"], c: 0, s: ["<b>Range</b>."] }
    ]
  },

  // Mock exam: her formulas, new numbers, mixed like a real paper. t = topic number.
  exam: [
    { t: 5, q: "Price 50, variable cost 30 per unit, fixed costs 80,000. Break-even in units?", a: 4000, unit: "units", s: ["CM = 50 − 30 = 20", "80,000 ÷ 20 = <b>4,000 units</b>"] },
    { t: 1, q: "A machine costs 300,000, lasts 5 years, salvage 0. It adds 120,000 revenue and 40,000 expenses a year. ARR in %?", a: 13.33, unit: "%", s: ["Total profit = 600,000 − 200,000 − 300,000 = 100,000; average = 20,000", "Average investment = 300,000 ÷ 2 = 150,000", "20,000 ÷ 150,000 = <b>13.33%</b>"] },
    { t: 10, q: "A rise in interest rates is which type of risk?", o: ["Systematic", "Unsystematic"], c: 0, s: ["<b>Systematic</b>."] },
    { t: 2, q: "Base prices A 4, B 10; base quantities 50, 20. Current prices 5, 12. Laspeyres index?", a: 122.5, s: ["Top = 5×50 + 12×20 = 490", "Bottom = 4×50 + 10×20 = 400", "490 ÷ 400 × 100 = <b>122.5</b>"] },
    { t: 8, q: "Invest 100,000. Cash flows: 30,000, 40,000, 50,000. Payback in years?", a: 2.6, unit: "years", s: ["Cumulative: −70,000, −30,000, +20,000", "2 + 30,000 ÷ 50,000 = <b>2.6 years</b>"] },
    { t: 6, q: "Net income 45,000. Total assets 500,000, total liabilities 200,000. ROE in %?", a: 15, unit: "%", s: ["Equity = 500,000 − 200,000 = 300,000", "45,000 ÷ 300,000 = <b>15%</b>"] },
    { t: 12, q: "X: 1, 2, 3 and Y: 2, 4, 9. Sample covariance?", a: 3.5, s: ["X̄ = 2, Ȳ = 5", "Products: (−1)(−3) + 0 + (1)(4) = 7", "7 ÷ 2 = <b>3.5</b>"] },
    { t: 5, q: "Same firm as Q1 (price 50, variable cost 30, fixed 80,000). Break-even sales in money?", a: 200000, s: ["CM ratio = 20 ÷ 50 = 40%", "80,000 ÷ 0.40 = <b>200,000</b>"] },
    { t: 3, q: "Base prices 4, 10; current prices 5, 12; current quantities 60, 10. Paasche index?", a: 123.53, s: ["Top = 5×60 + 12×10 = 420", "Bottom = 4×60 + 10×10 = 340", "420 ÷ 340 × 100 = <b>123.53</b>"] },
    { t: 11, q: "Customers are divided by age group, then a random sample is taken from each group. Which method?", o: ["Cluster", "Stratified", "Quota", "Systematic"], c: 1, s: ["<b>Stratified</b>."] },
    { t: 9, q: "10,000 units at 15, variable cost 5 per unit, fixed costs 60,000. DOL?", a: 2.5, s: ["CM = 10,000 × 10 = 100,000", "Profit = 100,000 − 60,000 = 40,000", "100,000 ÷ 40,000 = <b>2.5</b>"] },
    { t: 4, q: "You invest 40,000 and get back 46,000. ROI in %?", a: 15, unit: "%", s: ["6,000 ÷ 40,000 = <b>15%</b>"] },
    { t: 14, q: "Mean 70, standard deviation 8. z-score of 82?", a: 1.5, s: ["(82 − 70) ÷ 8 = <b>1.5</b>"] },
    { t: 5, q: "Same firm as Q1. Units needed for a targeted income of 20,000?", a: 5000, unit: "units", s: ["(80,000 + 20,000) ÷ 20 = <b>5,000 units</b>"] },
    { t: 13, q: "Q = 3K + 5L. Returns to scale?", o: ["Increasing", "Constant", "Decreasing"], c: 1, s: ["3(mK) + 5(mL) = m·Q: <b>constant</b>."] },
    { t: 7, q: "Fixed costs 90,000 and net income 30,000. Contribution margin?", a: 120000, s: ["CM = fixed costs + net income = <b>120,000</b>"] },
    { t: 9, q: "DOL is 2.5. Sales rise 8%. By how many % do profits rise?", a: 20, unit: "%", s: ["8% × 2.5 = <b>20%</b>"] },
    { t: 13, q: "Product A alone costs 200,000, product B alone 300,000, together 400,000. Economies of scope in %?", a: 25, unit: "%", s: ["(200,000 + 300,000 − 400,000) ÷ 400,000 = <b>25%</b>"] },
    { t: 14, q: "Mean 70, standard deviation 8. About 68% of values lie between 62 and…?", a: 78, s: ["70 + 8 = <b>78</b>"] },
    { t: 3, q: "Which index uses the current period's quantities?", o: ["Laspeyres", "Paasche"], c: 1, s: ["<b>Paasche</b>."] },
    { t: 5, q: "Same firm as Q1. Target net income 18,000 after a 40% tax. Sales needed in money?", a: 275000, s: ["Before tax = 18,000 ÷ 0.6 = 30,000", "(80,000 + 30,000) ÷ 0.40 = <b>275,000</b>"] },
    { t: 15, q: "Data: 2, 4, 8. Geometric mean?", a: 4, s: ["(2 × 4 × 8)<sup>1/3</sup> = 64<sup>1/3</sup> = <b>4</b>"] },
    { t: 15, q: "Data: 7, 3, 9, 5, 1. Median?", a: 5, s: ["In order: 1, 3, 5, 7, 9", "Middle value = <b>5</b>"] }
  ]
};
