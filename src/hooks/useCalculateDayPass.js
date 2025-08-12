export const useCalculateDayPass = (type, sessionPlans = []) => {
  const sessionPrices = {
    "muscle gaining": {
      regular: {
        "1 session": 100.0,
      },

      student: {
        "1 session": 80.0,
      },
    },
    "yoga fitness": {
      "1 session": 300.0,
      "10 session": 2000.0,
    },
    "athlete training": {
      "1 session": 200.0,
      "12 session": 2200.0,
      "15 session": 2600.0,
    },
    "personal training": {
      "1 session": 200.0,
      "12 session": 6000.0,
      "15 session": 7000.0,
    },
    boxing: {
      "1 session": 250.0,
    },
  };

  const dayPassCost = sessionPlans
    .map((plan) => {
      const programPricing = sessionPrices[plan.program];

      if (!programPricing) return 0;

      if (typeof programPricing[type] === "object") {
        return programPricing[type]?.[plan.session] || 0;
      }

      return programPricing?.[plan.session] || 0;
    })
    .reduce((total, cost) => total + cost, 0);

  return dayPassCost;
};
