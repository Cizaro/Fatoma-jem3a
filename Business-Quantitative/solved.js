// Solved questions per chapter (t1..t15), shown with full answers so she can read them.
// Concepts and formulas come only from her files; the numbers are new.
// Each: { q: question, s: steps, a: final answer in words }.
window.SOLVED = {
  t1: [
    { q: "A machine costs 200,000, lasts 4 years and has a salvage value of 40,000. It brings net inflows of 70,000 a year. The company requires 20%. Find the ARR and decide.",
      s: ["Total inflows = 70,000 × 4 = 280,000", "Depreciation = 200,000 − 40,000 = 160,000", "Total profit = 280,000 − 160,000 = 120,000", "Average annual profit = 120,000 ÷ 4 = 30,000", "Average investment = (200,000 + 40,000) ÷ 2 = 120,000", "ARR = 30,000 ÷ 120,000 = 25%"],
      a: "ARR = 25%. That is higher than the required 20%, so accept the project." },
    { q: "A project costs 60,000 with no salvage value. Net inflows are 25,000, 25,000 and 31,000 over 3 years. Find the ARR.",
      s: ["Total inflows = 25,000 + 25,000 + 31,000 = 81,000", "Depreciation = 60,000 − 0 = 60,000", "Total profit = 81,000 − 60,000 = 21,000; average = 21,000 ÷ 3 = 7,000", "Average investment = (60,000 + 0) ÷ 2 = 30,000", "ARR = 7,000 ÷ 30,000 = 23.33%"],
      a: "ARR = 23.33%: about 23 cents of profit per 1 invested, per year." }
  ],
  t2: [
    { q: "Base year: good A costs 2, good B costs 5, with quantities 10 and 4. Now A costs 3 and B costs 6. Find the Laspeyres index.",
      s: ["Use the base quantities (10 and 4) on top and bottom", "Top = 3×10 + 6×4 = 30 + 24 = 54", "Bottom = 2×10 + 5×4 = 20 + 20 = 40", "Index = 54 ÷ 40 × 100 = 135"],
      a: "Laspeyres = 135: prices rose 35% since the base year." },
    { q: "Base prices 1, 4, 10 with base quantities 20, 5, 2. Current prices 2, 4, 12. Find the Laspeyres index.",
      s: ["Top = 2×20 + 4×5 + 12×2 = 40 + 20 + 24 = 84", "Bottom = 1×20 + 4×5 + 10×2 = 20 + 20 + 20 = 60", "Index = 84 ÷ 60 × 100 = 140"],
      a: "Laspeyres = 140: prices rose 40%." }
  ],
  t3: [
    { q: "Base prices 2 and 5. Current prices 3 and 6. Current quantities 12 and 3. Find the Paasche index.",
      s: ["Use the current quantities (12 and 3) on top and bottom", "Top = 3×12 + 6×3 = 36 + 18 = 54", "Bottom = 2×12 + 5×3 = 24 + 15 = 39", "Index = 54 ÷ 39 × 100 = 138.46"],
      a: "Paasche = 138.46: prices rose about 38%." },
    { q: "Base prices 10 and 20. Current prices 12 and 22. Current quantities 5 and 5. Find the Paasche index.",
      s: ["Top = 12×5 + 22×5 = 60 + 110 = 170", "Bottom = 10×5 + 20×5 = 50 + 100 = 150", "Index = 170 ÷ 150 × 100 = 113.33"],
      a: "Paasche = 113.33: prices rose about 13%." }
  ],
  t4: [
    { q: "An advertising campaign costs 8,000 and generates 10,000. Find the ROI.",
      s: ["ROI = (gain − cost) ÷ cost", "= (10,000 − 8,000) ÷ 8,000 = 2,000 ÷ 8,000 = 0.25"],
      a: "ROI = 25%." },
    { q: "You invest 50,000 in shares and a year later they are worth 45,000. Find the ROI.",
      s: ["ROI = (45,000 − 50,000) ÷ 50,000 = −5,000 ÷ 50,000 = −0.10"],
      a: "ROI = −10%: the investment lost money." }
  ],
  t5: [
    { q: "Price 20, variable cost 12 per unit, fixed costs 40,000. Find the contribution margin, the CM ratio and the break-even point in units and in sales.",
      s: ["CM per unit = 20 − 12 = 8", "CM ratio = 8 ÷ 20 = 40%", "Break-even units = 40,000 ÷ 8 = 5,000 units", "Break-even sales = 40,000 ÷ 0.40 = 100,000 (check: 5,000 × 20 = 100,000)"],
      a: "CM = 8 per unit, CM ratio 40%, break-even 5,000 units = 100,000 in sales." },
    { q: "Same company. How many units and how much in sales for a targeted income of 16,000?",
      s: ["Units = (40,000 + 16,000) ÷ 8 = 56,000 ÷ 8 = 7,000", "Sales = (40,000 + 16,000) ÷ 0.40 = 140,000"],
      a: "7,000 units = 140,000 in sales." },
    { q: "Same company. The owner wants 12,000 of net income after a 25% tax. What sales are needed?",
      s: ["Income before tax = 12,000 ÷ (1 − 0.25) = 12,000 ÷ 0.75 = 16,000", "Sales = (40,000 + 16,000) ÷ 0.40 = 140,000", "Units = 56,000 ÷ 8 = 7,000"],
      a: "140,000 in sales (7,000 units)." }
  ],
  t6: [
    { q: "Net income is 30,000. Total assets are 400,000 and total liabilities are 150,000. Find the ROE.",
      s: ["Shareholders' equity = 400,000 − 150,000 = 250,000", "ROE = 30,000 ÷ 250,000 = 0.12"],
      a: "ROE = 12%." },
    { q: "The same company buys back shares and equity falls to 200,000. Net income stays 30,000. What happens to ROE?",
      s: ["ROE = 30,000 ÷ 200,000 = 0.15"],
      a: "ROE rises from 12% to 15% only because equity got smaller, not because the business improved." }
  ],
  t7: [
    { q: "A firm sells 2,000 units at 50. Variable manufacturing cost is 20 and variable selling cost is 5 per unit. Find the contribution margin per unit, in total, and the CM ratio.",
      s: ["CM per unit = 50 − 20 − 5 = 25", "Total CM = 25 × 2,000 = 50,000", "CM ratio = 25 ÷ 50 = 50%"],
      a: "CM = 25 per unit, 50,000 in total, ratio 50%." },
    { q: "Same firm: fixed costs are 30,000. What is the net income?",
      s: ["Contribution margin = fixed costs + net income", "50,000 = 30,000 + net income", "Net income = 20,000"],
      a: "Net income = 20,000." }
  ],
  t8: [
    { q: "An investment of 120,000 brings cash flows of 50,000, 40,000 and 60,000. Find the payback period.",
      s: ["Cumulative: year 0 −120,000; year 1 −70,000; year 2 −30,000; year 3 +30,000", "Year 2 is the last negative year; 30,000 is still missing", "Payback = 2 + 30,000 ÷ 60,000 = 2.5"],
      a: "Payback = 2.5 years." },
    { q: "An investment of 90,000 brings 30,000 every year. Find the payback period.",
      s: ["Cumulative: −60,000, −30,000, 0", "Year 2 is the last negative year; 30,000 missing; year 3 brings 30,000", "Payback = 2 + 30,000 ÷ 30,000 = 3"],
      a: "Payback = 3 years." }
  ],
  t9: [
    { q: "A firm sells 5,000 units at 40. Variable cost is 24 per unit and fixed costs are 50,000. Find the DOL.",
      s: ["Q × (P − V) = 5,000 × 16 = 80,000 (contribution margin)", "Profit = 80,000 − 50,000 = 30,000", "DOL = 80,000 ÷ 30,000 = 2.67"],
      a: "DOL = 2.67." },
    { q: "Same firm. Sales rise 15%. By how much do profits rise?",
      s: ["% change in profit = DOL × % change in sales", "= 2.67 × 15% = 40%"],
      a: "Profits rise about 40%, much faster than sales, because of the high fixed costs." }
  ],
  t10: [
    { q: "Classify each risk: a rise in unemployment, corruption, higher costs of operations, an employee strike.",
      s: ["A rise in unemployment comes from the economy: systematic", "Corruption comes from the economy: systematic", "Higher costs of operations come from inside the company: unsystematic", "An employee strike happens inside the company: unsystematic"],
      a: "Systematic: unemployment, corruption. Unsystematic: higher operating costs, employee strike." },
    { q: "Classify: a change in prices across the country, and a high rate of employee turnover.",
      s: ["Price changes across the country: systematic", "Employee turnover in one company: unsystematic"],
      a: "Price changes are systematic; employee turnover is unsystematic." }
  ],
  t11: [
    { q: "A bank numbers all its customers and uses a random number generator to choose 200. Which method?",
      s: ["Every customer has an equal chance and selection is fully by chance"],
      a: "Simple random sampling (probability)." },
    { q: "A shop puts a survey on its website and whoever wants to answers it. Which method?",
      s: ["People choose themselves; the researcher does not pick them"],
      a: "Voluntary response sampling (non-probability). It is biased: people with strong opinions answer more." },
    { q: "A researcher needs 300 employed and 200 unemployed people and keeps interviewing until both groups are full. Which method?",
      s: ["Set numbers (quotas) for each group are filled"],
      a: "Quota sampling (non-probability)." }
  ],
  t12: [
    { q: "Price X: 1, 2, 3, 4. Units sold Y: 10, 8, 6, 4. Find the sample covariance.",
      s: ["X̄ = 10 ÷ 4 = 2.5 and Ȳ = 28 ÷ 4 = 7", "X − X̄: −1.5, −0.5, 0.5, 1.5 and Y − Ȳ: 3, 1, −1, −3", "Products: −4.5, −0.5, −0.5, −4.5; sum = −10", "Covariance = −10 ÷ (4 − 1) = −3.33"],
      a: "Covariance = −3.33: negative, so when price goes up, units sold go down." },
    { q: "X: 2, 4, 6. Y: 5, 9, 10. Find the sample covariance.",
      s: ["X̄ = 4 and Ȳ = 8", "X − X̄: −2, 0, 2 and Y − Ȳ: −3, 1, 2", "Products: 6, 0, 4; sum = 10", "Covariance = 10 ÷ 2 = 5"],
      a: "Covariance = 5: positive, they move together." }
  ],
  t13: [
    { q: "Q = 4K + 6L. Increasing, constant or decreasing returns to scale?",
      s: ["Multiply K and L by m: 4(mK) + 6(mL)", "= m(4K + 6L) = m·Q"],
      a: "Output grows exactly m times: constant returns to scale." },
    { q: "Q = K·L. Increasing, constant or decreasing returns to scale?",
      s: ["(mK)(mL) = m²·K·L = m²·Q", "m² is bigger than m (m > 1)"],
      a: "Increasing returns to scale." },
    { q: "Fixed costs are 10,000. What is the fixed cost per unit at 1,000 units and at 5,000 units?",
      s: ["1,000 units: 10,000 ÷ 1,000 = 10 per unit", "5,000 units: 10,000 ÷ 5,000 = 2 per unit"],
      a: "It falls from 10 to 2 per unit: economies of size from spreading fixed costs." },
    { q: "Product A alone costs 80,000, product B alone costs 120,000, and both together cost 150,000. Find the economies of scope.",
      s: ["S = (C(a) + C(b) − C(a + b)) ÷ C(a + b)", "= (80,000 + 120,000 − 150,000) ÷ 150,000 = 50,000 ÷ 150,000 = 0.3333"],
      a: "S = 33.33% (> 0): producing them together is 33.33% cheaper." }
  ],
  t14: [
    { q: "Exam scores are normal with mean 500 and standard deviation 100. Use the empirical rule.",
      s: ["1 SD: 500 ± 100 → 400 to 600", "2 SD: 500 ± 200 → 300 to 700", "3 SD: 500 ± 300 → 200 to 800"],
      a: "68% between 400 and 600, 95% between 300 and 700, 99.7% between 200 and 800." },
    { q: "Same scores. The z-table gives 0.9332 for z = 1.5. What share of scores is above 650?", z: 1.5,
      s: ["z = (650 − 500) ÷ 100 = 1.5", "Area below 650 = 0.9332", "Area above = 1 − 0.9332 = 0.0668"],
      a: "0.0668, about 6.68% of scores are above 650." }
  ],
  t15: [
    { q: "Data: 4, 7, 7, 2, 10. Find the mean, median, mode and range.",
      s: ["Mean = (4 + 7 + 7 + 2 + 10) ÷ 5 = 30 ÷ 5 = 6", "In order: 2, 4, 7, 7, 10, so the median (middle) = 7", "Mode = 7 (appears twice)", "Range = 10 − 2 = 8"],
      a: "Mean 6, median 7, mode 7, range 8." },
    { q: "Find the geometric mean of 1, 3 and 9.",
      s: ["Product = 1 × 3 × 9 = 27", "n = 3, so take the cube root: 27<sup>1/3</sup> = 3"],
      a: "Geometric mean = 3." }
  ]
};
