/**
 * @param {number[]} nums
 * @return {number}
 */
const totalHammingDistance = nums => {
  // note: the maximum elemnet would be 10^9,
  // which takes 30 digits in binary.
  // no element can exceed this limit.
  const ones = new Array(30).fill(0)
  const count = nums.length
  // the trick is to count for Hamming distance for each bits
  // and put it together.
  const process = v => {
    for (
      let i = 0, base = 1;
      i < ones.length; ++i,
      base <<= 1
    ) {
      if (v & base) {
        ones[i] += 1
      }
    }
  }
  nums.map(process)

  return ones.reduce(
    // for an array that contains m 0s and n 1s, we have m*n as Hamming distance.
    (acc, i) => acc + i*(count-i),
    0
  )
}

console.log(totalHammingDistance([4,14,2]))
