/**
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = nums => {
  /*
     idea: frequence count, return when found.

     note that:

     - there can only be one element whose freq is more than half of the array
     - and an answer is always guaranteed

     which means we can return right after the first one that meets the criteria.

   */
  const threshold = nums.length >> 1
  const freq = new Map()
  for (let i = 0; i < nums.length; ++i) {
    const n = nums[i]
    let newFreq
    if (freq.has(n)) {
      newFreq = 1 + freq.get(n)
    } else {
      newFreq = 1
    }
    if (newFreq > threshold)
      return n
    freq.set(n, newFreq)
  }
}
