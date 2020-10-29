const probability = (rateX, rateY) => 1 / (1 + 10 ** ((rateX - rateY) / 400));

module.exports = (rateA, rateB, K, d) => {
  const probA = probability(rateB, rateA);
  const probB = probability(rateA, rateB);

  if (d)
    return {
      rateA: Math.round(rateA + K * (1 - probA)),
      rateB: Math.round(rateB + K * (0 - probB)),
    };
  return {
    rateA: Math.round(rateA + K * (0 - probA)),
    rateB: Math.round(rateB + K * (1 - probB)),
  };
};
