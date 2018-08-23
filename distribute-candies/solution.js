/**
 * @param {number[]} candies
 * @return {number}
 */
const distributeCandies = candies => {
  /*
     idea: sister can try to take as many different kinds as she like,
     we just need to make sure that we'll have sufficient candies for the brother.
   */
  const kinds = new Set(candies)
  return Math.min(kinds.size, candies.length / 2)
}
