// Her 15 lecture files, in the order they were saved. Used by the website (index.html)
// and by scripts/build-bq-formulas-pdf.js. In a formula, {top|bottom} is drawn as a fraction.
window.FORMULAS = [
  {
    title: "ARR: Accounting Rate of Return", file: "ARR",
    what: "How much profit a project makes each year, on average, for every 1 you invest. If ARR is equal to or higher than the rate the company wants, accept the project. If it is lower, reject it.",
    formulas: [
      ["ARR", "{Average annual profit|Average investment} × 100", "the answer is a % per year"],
      ["Average annual profit", "{Total profit over the whole life|Number of years}", ""],
      ["Total profit", "Total inflows − Total expenses − Depreciation", "depreciation = cost − salvage value"],
      ["Average investment", "{Initial cost + Salvage value|2}", "salvage = what the machine is worth at the end"]
    ],
    example: {
      q: "A machine costs 420,000, lasts 12 years and is worth 0 at the end. It adds 200,000 revenue and 50,000 expenses each year.",
      s: ["Total profit = 200,000×12 − 50,000×12 − 420,000 = 2,400,000 − 600,000 − 420,000 = 1,380,000",
          "Average annual profit = 1,380,000 ÷ 12 = 115,000",
          "Average investment = (420,000 + 0) ÷ 2 = 210,000",
          "ARR = 115,000 ÷ 210,000 = <b>54.76%</b>: about 55 cents of profit per 1 invested, per year"]
    },
    remember: "Subtract depreciation (cost − salvage) once for the whole life. Salvage value is added in the average investment."
  },
  {
    title: "Laspeyres price index", file: "Laspeyre's price index",
    what: "How much more the same shopping basket costs now compared with the base year. The quantities are frozen at the base year (the old basket). Base year = 100, so 128 means prices went up 28%.",
    formulas: [
      ["Laspeyres index", "{Σ p<sub>t</sub> × q<sub>0</sub>|Σ p<sub>0</sub> × q<sub>0</sub>} × 100", "q₀ = base-year quantities, top and bottom"],
      ["Symbols", "p<sub>0</sub> base-year price · p<sub>t</sub> current price · q<sub>0</sub> base-year quantity", ""]
    ],
    example: {
      q: "Base-year prices 5, 10, 20 and base-year quantities 100, 200, 300. Year 1 prices are 10, 12, 25.",
      s: ["Top (new prices × old quantities) = 10×100 + 12×200 + 25×300 = 1,000 + 2,400 + 7,500 = 10,900",
          "Bottom (old prices × old quantities) = 5×100 + 10×200 + 20×300 = 500 + 2,000 + 6,000 = 8,500",
          "Index = 10,900 ÷ 8,500 × 100 = <b>128.24</b>: prices rose about 28% (her file rounds it to 128.23)",
          "Year 2 prices 7, 13, 24: (700 + 2,600 + 7,200) ÷ 8,500 × 100 = <b>123.53</b>"]
    },
    remember: "Laspeyres uses the base-year quantities. It is cheap and easy, but it tends to overstate inflation (new goods, quality changes, people switching to cheaper goods)."
  },
  {
    title: "Paasche price index", file: "Paasche Price Index",
    what: "The same idea as Laspeyres, but the basket uses the current year's quantities (what people buy now). Base year = 100.",
    formulas: [
      ["Paasche index", "{Σ p<sub>t</sub> × q<sub>t</sub>|Σ p<sub>0</sub> × q<sub>t</sub>} × 100", "q<sub>t</sub> = current quantities, top and bottom"]
    ],
    example: {
      q: "Base prices 5, 10, 20. Year 1 prices 6, 11, 22. Year 1 quantities 55, 65, 75.",
      s: ["Top (new prices × new quantities) = 6×55 + 11×65 + 22×75 = 330 + 715 + 1,650 = 2,695",
          "Bottom (old prices × new quantities) = 5×55 + 10×65 + 20×75 = 275 + 650 + 1,500 = 2,425",
          "Index = 2,695 ÷ 2,425 × 100 = <b>111.13</b>: prices rose about 11%"]
    },
    remember: "Same quantities on top and bottom, only the prices change. Laspeyres = base quantities, Paasche = present quantities. Paasche tends to understate price changes and needs new quantity data every year, so it costs more."
  },
  {
    title: "ROI: Return on Investment", file: "ROI formula",
    what: "How much you gained compared with what you spent, as a percentage.",
    formulas: [
      ["ROI", "{Gain − Cost|Cost} × 100", ""]
    ],
    example: {
      q: "You buy a house for 1,000,000 and sell it for 1,120,000 three years later.",
      s: ["ROI = (1,120,000 − 1,000,000) ÷ 1,000,000 = 0.12 = <b>12%</b>",
          "Shares bought for 100,000 that grow to 160,000: (160,000 − 100,000) ÷ 100,000 = <b>60%</b>"]
    },
    remember: "Divide by the cost, not by the gain. Limits: ROI ignores risk and time (12% in 3 years is not the same as 12% in 1 year), needs accurate cost figures, and ignores non-money benefits."
  },
  {
    title: "CVP: Cost-Volume-Profit analysis", file: "COST VOLUME OF PROFIT",
    what: "How sales volume and costs decide profit. Each unit sold leaves its contribution margin (price − variable cost). That money first pays the fixed costs. Once fixed costs are covered, every extra unit is profit.",
    formulas: [
      ["Contribution margin per unit", "Price − Variable cost per unit", ""],
      ["CM ratio", "{Contribution margin|Sales}", "same as CM per unit ÷ price"],
      ["Variable cost %", "{Variable cost per unit|Price}", "1.80 ÷ 3.00 = 60%"],
      ["Break-even equation", "Sales = Variable costs + Fixed costs", "at break-even, net income = 0 and CM = fixed costs"],
      ["Break-even in units", "{Fixed costs|CM per unit}", ""],
      ["Break-even in sales (money)", "{Fixed costs|CM ratio}", "or break-even units × price"],
      ["Units for a target income", "{Fixed costs + Target income|CM per unit}", ""],
      ["Sales for a target income", "{Fixed costs + Target income|CM ratio}", ""],
      ["Income before tax needed", "{Target net income|1 − Tax rate}", "use this as the target income above"]
    ],
    example: {
      q: "Price 3, variable cost 1.80 per unit, fixed costs 300,000.",
      s: ["CM per unit = 3 − 1.80 = 1.20, CM ratio = 1.20 ÷ 3 = 40%",
          "Break-even = 300,000 ÷ 1.20 = <b>250,000 units</b> = 300,000 ÷ 0.40 = <b>750,000 in sales</b>",
          "Target income 60,000: (300,000 + 60,000) ÷ 0.40 = <b>900,000</b> in sales = 300,000 units",
          "Target 60,000 after a 40% tax: 60,000 ÷ 0.6 = 100,000 before tax, so (300,000 + 100,000) ÷ 0.40 = <b>1,000,000</b> = 333,333 units"]
    },
    remember: "Target sales is not break-even sales + target income (750,000 + 60,000 = 810,000 is wrong), because every extra unit also has variable cost. The model assumes price, variable cost per unit and fixed costs stay constant, and everything produced is sold."
  },
  {
    title: "ROE: Return on Equity", file: "Return on Equity",
    what: "How much profit the company makes for every 1 of the owners' (shareholders') money.",
    formulas: [
      ["ROE", "{Net income|Shareholders' equity} × 100", ""],
      ["Shareholders' equity", "Total assets − Total liabilities", ""]
    ],
    example: {
      q: "Net income 2,000, shareholders' equity 15,000. (Equity example: assets 2.6 million − liabilities 920,000 = 1.68 million.)",
      s: ["ROE = 2,000 ÷ 15,000 = 0.1333 = <b>13.33%</b>: 13.33 profit for every 100 of equity"]
    },
    remember: "A high ROE can be misleading: a lot of debt (leverage) or share buybacks make equity smaller and push ROE up without the business getting better."
  },
  {
    title: "Contribution margin", file: "What is Contribution Margin",
    what: "Sales minus variable costs: the money left to pay fixed costs. After fixed costs are paid, what remains is profit.",
    formulas: [
      ["Contribution margin", "Sales revenue − Variable costs", ""],
      ["Also equal to", "Fixed costs + Net income", ""],
      ["CM ratio", "{Sales revenue − Variable costs|Sales revenue}", ""]
    ],
    example: {
      q: "50,000 phones sold at 100 each. Variable manufacturing cost 30, variable selling cost 10 per phone.",
      s: ["CM per phone = 100 − 30 − 10 = 60", "Total CM = 60 × 50,000 = <b>3,000,000</b>", "CM ratio = 60 ÷ 100 = <b>60%</b>"]
    },
    remember: "Variable costs change with volume: raw materials, per-unit labour, commissions, shipping, supplies. Fixed costs do not: rent, salaries, insurance, depreciation, interest, property tax."
  },
  {
    title: "Payback period", file: "Payback Formula",
    what: "How many years it takes for the cash coming in to pay back the money invested. Shorter is safer.",
    formulas: [
      ["Payback period", "Last year with negative cumulative cash flow + {Cumulative cash flow at the end of that year|Cash flow of the year after}", "use the top number without its minus sign (absolute value)"]
    ],
    example: {
      q: "Invest 550,000. Cash flows: 75,000, 140,000, 200,000, 110,000, 60,000.",
      s: ["Running total: −550,000 → −475,000 → −335,000 → −135,000 → −25,000 (year 4) → +35,000 (year 5)",
          "Year 4 is the last negative year; 25,000 is still missing; year 5 brings 60,000",
          "Payback = 4 + 25,000 ÷ 60,000 = <b>4.42 years</b>"]
    },
    remember: "Good: simple, quick, shows risk and liquidity. Bad: ignores the time value of money, ignores cash after the payback year, and ignores profitability."
  },
  {
    title: "Operating leverage (DOL)", file: "Operating Leverage",
    what: "How strongly profit reacts to a change in sales. A company with high fixed costs has high DOL: when sales rise, profit rises faster, but when sales fall, profit falls faster too. That makes it riskier.",
    formulas: [
      ["DOL", "{Q × (P − V)|Q × (P − V) − Fixed costs}", "Q quantity, P price, V variable cost per unit"],
      ["General form", "{Sales − Variable costs|Profits}", ""]
    ],
    example: {
      q: "300,000 units at 25 each, variable cost 0.08 per unit, fixed costs 780,000.",
      s: ["CM = 300,000 × (25 − 0.08) = 300,000 × 24.92 = 7,476,000",
          "Operating income = 7,476,000 − 780,000 = 6,696,000",
          "DOL = 7,476,000 ÷ 6,696,000 = <b>1.12</b>",
          "So if sales rise 10%, profit rises 10% × 1.12 = <b>11.2%</b>"]
    },
    remember: "Typo in her file: it prints 7,437,000 and 6,657,000 here, and says profit rises 12%. The correct numbers are 7,476,000 and 6,696,000; DOL is still 1.12, so profit rises 11.2%. Second example: price 20, 450,000 units: 8,964,000 ÷ 8,184,000 = 1.10, so +10% sales gives +11% profit."
  },
  {
    title: "Systematic and unsystematic risk", file: "systematic and unsystematic risk",
    what: "No formula here, only examples. Systematic risk comes from the economy around the company. Unsystematic risk comes from inside the company itself.",
    formulas: [
      ["Systematic risk examples", "inflation, rise in unemployment, higher poverty, corruption, changes in interest rates, changes in prices", "the economy"],
      ["Unsystematic risk examples", "high employee turnover, employee strike, higher costs of operations", "inside the company"]
    ],
    remember: "Ask: does it come from the economy (systematic) or from inside the company (unsystematic)?"
  },
  {
    title: "Sampling methods", file: "Sampling Methods",
    what: "We rarely ask everyone (the population), so we ask a sample. The sampling frame is the actual list we pick from. Probability methods use chance and represent the population. Non-probability methods are easier and cheaper but can be biased.",
    formulas: [
      ["Simple random", "everyone has an equal chance (random numbers)", "probability"],
      ["Systematic", "pick at regular intervals from a numbered list", "probability: start at 6, then every 10th (6, 16, 26…) for 100 of 1,000"],
      ["Stratified", "split into groups (strata), sample each group in proportion", "probability: 800 women, 200 men, sample of 100 → 80 women and 20 men"],
      ["Cluster", "pick whole groups at random (e.g. 3 of 10 offices)", "probability"],
      ["Convenience", "whoever is easiest to reach", "non-probability"],
      ["Voluntary response", "people choose to answer (online survey)", "non-probability"],
      ["Purposive (judgement)", "the researcher picks who is most useful", "non-probability"],
      ["Snowball", "participants bring in other participants", "non-probability"],
      ["Consecutive", "one group after another over time", "non-probability"],
      ["Quota", "fill set numbers for each group (e.g. 250 men, 250 women)", "non-probability"]
    ],
    remember: "Stratified: sample inside every group. Cluster: pick whole groups. A questionnaire is the set of questions; a survey is the questions plus how you collect and analyse the answers (eggs and omelette)."
  },
  {
    title: "Covariance", file: "Covariance",
    what: "Shows whether two things move together. Positive: when one goes up, the other usually goes up. Negative: one up, the other down. Near zero: no straight-line relationship.",
    formulas: [
      ["Sample covariance", "{Σ (X − X̄)(Y − Ȳ)|n − 1}", "X̄, Ȳ are the means"]
    ],
    example: {
      q: "Hours studied X: 2, 3, 4, 5, 6. Test scores Y: 60, 75, 80, 90, 95.",
      s: ["Means: X̄ = 20 ÷ 5 = 4, Ȳ = 400 ÷ 5 = 80",
          "X − X̄: −2, −1, 0, 1, 2 and Y − Ȳ: −20, −5, 0, 10, 15",
          "Products: 40, 5, 0, 10, 30, sum = 85",
          "Covariance = 85 ÷ (5 − 1) = <b>21.25</b>: positive, so more study goes with higher scores"]
    },
    remember: "Only the sign tells you something. The size does not show how strong the relationship is, because it depends on the units."
  },
  {
    title: "Returns to scale, economies of size and scope", file: "Returns to scale-size,&scope",
    what: "Returns to scale: multiply all inputs (capital K and labour L) by m, and see what happens to output. Economies of size: producing more lowers the cost per unit, because fixed costs are spread over more units. Economies of scope: producing two products together is cheaper than producing them separately.",
    formulas: [
      ["Returns to scale test", "replace K by mK and L by mL, then factor out m", "output × more than m: increasing · exactly m: constant · less than m: decreasing"],
      ["Q = 2K + 3L", "2(mK) + 3(mL) = m(2K + 3L) = m·Q", "exactly m: constant returns"],
      ["Q = 0.5KL", "0.5(mK)(mL) = m<sup>2</sup>·Q", "m² is more than m: increasing returns"],
      ["Q = K<sup>0.3</sup>L<sup>0.2</sup>", "(mK)<sup>0.3</sup>(mL)<sup>0.2</sup> = m<sup>0.5</sup>·Q", "m<sup>0.5</sup> is less than m: decreasing returns"],
      ["Economies of size", "fixed cost per unit falls as more units are made", "1,000 units: 7.50 each · 10,000 units: 0.75 each"],
      ["Economies of scope", "S = {C(q<sub>a</sub>) + C(q<sub>b</sub>) − C(q<sub>a</sub> + q<sub>b</sub>)|C(q<sub>a</sub> + q<sub>b</sub>)} × 100", "S > 0: cheaper together"]
    ],
    example: {
      q: "1,000,000 hamburgers alone cost 0.50 each, 4,000,000 sandwiches alone cost 0.30 each, and both together cost 1,500,000.",
      s: ["C(a) = 1,000,000 × 0.50 = 500,000 and C(b) = 4,000,000 × 0.30 = 1,200,000",
          "S = (500,000 + 1,200,000 − 1,500,000) ÷ 1,500,000 = 200,000 ÷ 1,500,000 = <b>13.33%</b> cheaper together"]
    },
    remember: "Returns to scale only looks at production; economies of size and scope look at cost. Economies of size come from specialisation, bulk buying, marketing, risk bearing, bigger containers, cheaper borrowing and spreading overheads. They are bigger for a high-fixed-cost business (15 → 6 per unit, −60%) than a low-fixed-cost one (15 → 10.50, −30%)."
  },
  {
    title: "Normal distribution and z-scores", file: "Normal Distribution",
    what: "A symmetric bell-shaped curve. Mean = median = mode, all in the middle. The mean says where the centre is; the standard deviation says how wide the bell is. A z-score says how many standard deviations a value is from the mean.",
    formulas: [
      ["z-score", "z = {x − μ|σ}", "x value, μ mean, σ standard deviation"],
      ["Empirical rule", "68% within μ ± 1σ · 95% within μ ± 2σ · 99.7% within μ ± 3σ", ""],
      ["Probability above a value", "P(X > x) = 1 − P(X ≤ x)", "the z-table gives the area to the left"],
      ["Standard normal", "mean 0, standard deviation 1", ""]
    ],
    example: {
      q: "SAT scores: mean 1150, standard deviation 150. What share of scores are above 1380?",
      s: ["Empirical rule: 68% between 1,000 and 1,300; 95% between 850 and 1,450; 99.7% between 700 and 1,600",
          "z = (1380 − 1150) ÷ 150 = 230 ÷ 150 = 1.53",
          "z-table: 0.937 of scores are below 1380",
          "Above 1380: 1 − 0.937 = <b>0.063 = 6.3%</b>"]
    },
    remember: "The z-table gives the area to the left (below). For \"more than\", do 1 − the table value."
  },
  {
    title: "Mean, median, mode, range, geometric mean", file: "What are mean median mode",
    what: "Different ways to describe the middle of the data, plus the range for how spread out it is.",
    formulas: [
      ["Mean (arithmetic)", "{Σ x|n}", "add everything, divide by how many"],
      ["Geometric mean", "(x<sub>1</sub> × x<sub>2</sub> × … × x<sub>n</sub>)<sup>1/n</sup>", "multiply everything, take the n-th root"],
      ["Median", "the middle value after arranging the data in order", ""],
      ["Mode", "the value that appears most often", ""],
      ["Range", "Largest value − Smallest value", ""]
    ],
    remember: "Arrange the numbers in order before finding the median."
  }
];
