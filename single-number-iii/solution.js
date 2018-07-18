/**
 * @param {number[]} nums
 * @return {number[]}
 */
const singleNumber = nums => {
  /*
     we need a clever system. credit for zhiqing_xiao who figures it out.

     first of all, we XOR all nums together, which gives us
     totalXor = a XOR b in which a,b are the two different numbers (all other numbers cancel out)

     note that totalXor cannot be zero,
     otherwise a === b (assume that a and b's sign/unsign-ness is consistently interpreted)

     now we use a trick to extract the lowest set bit of number (with mask).
     in theory all set bits of totalXor will do, but since there's a
     simple way of extracting lowest set bit, we'll use that.

     the obseration is that the set bit of an xor result indicates that a and b
     are different in that position, so we do another scan at the list,
     this time we distinguish numbers by whether this very bit is set or not,
     and take XOR of each group respectively.
     and the result from each group is the final answer.

     this is because all number of equal value will always stick to the same group,
     so they still cancel out, but this time a and b won't be able to mix.

   */
  const totalXor = nums.reduce((x,y) => x^y)
  const mask = (totalXor & (-totalXor))
  let sum0 = 0, sum1 = 0
  nums.forEach(n => {
    if (mask & n) {
      sum1 ^= n
    } else {
      sum0 ^= n
    }
  })
  // a slight caveat here: JS interprets bitwise using signed int32,
  // so here we can end up returning numbers that has the same binary representation
  // but the exactly the same number (e.g. -1 vs. 4294967295)
  // luckly we doesn't seem to have that trouble here.
  return [sum0, sum1]
}
