/**
 * @param {number[]} nums
 * @return {boolean}
 */
const xorGame = nums => {
  /*
     analysis:

     - []: winning.
     - [a]: losing unless a = 0
     - [a,b]: winning.

     any state with even nums.length is an automatic win.
     also for the rest of states,
     (XOR over whole array) === 0 is also a win

   */
  return nums.length % 2 === 0 ||
    nums.reduce((x,y) => x ^ y) === 0
}
