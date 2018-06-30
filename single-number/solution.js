/**
 * @param {number[]} nums
 * @return {number}
 */
// XOR has the perfect property: associative, and cancels when applying the same num twice
// leaving the only single one as the final answer.
const singleNumber = nums => nums.reduce((x,y) => x ^ y)
