export const useCalculateMembership = (type, plan, sessionPlans = []) => {
  const basePrices = {
    regular: {
      "1 month": 1000.0,
      "3 month": 2700.0,
      "6 month": 4500.0,
      "12 month": 6500.0,
    },
    student: {
      "1 month": 600.0,
      "3 month": 1500.0,
      "6 month": 3000.0,
      "12 month": 5400.0,
    },
  };

  const sessionPrices = {
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

  const basePrice = basePrices[type]?.[plan] || 0;

  const addOnCost = sessionPlans.reduce((total, { program, session }) => {
    if (program === "muscle gaining") return total;
    const price = sessionPrices[program]?.[session] || 0;
    return total + price;
  }, 0);

  return basePrice + addOnCost;
};
