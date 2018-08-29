/**
 * @param {number[]} flowers
 * @param {number} k
 * @return {number}
 */
const kEmptySlots = (flowers, k) => {
  /*
     idea:

     (credit to awice for the write up.)

     - converting to "days" array is a good idea indeed,
       this allows us to convert the problem into just searching all windows
       that contains k elements in between and leftmost and rightmost element
       of the window happens to be the smallest two numbers of them all.
       (we'll call them "candidate windows" for the time being)
     - a key observation is that candidate windows can't overlap,
       this allows us to:

       - skip all in-between elements when a candidate is found
       - when checking elements inbetween for days[i] > days[left] && days[i] > days[right],
         if at some point this does not hold, that means days[i] is a smaller one
         and we can move leftmost of the window to i and continue
       - since in both case we always move forward, every element will be scaned exactly once,
         resulting in O(N) time complexity
   */
  const N = flowers.length
  const days = new Uint16Array(N)
  for (let i = 0; i < N; ++i) {
    // now note that now days contains 0-based value
    // and we need to convert it back to 1-based
    days[flowers[i]-1] = i
  }
  let ans = Infinity
  // right - left === k+1
  let left = 0, right = k+1
  while (right < N) {
    let bFlg = false
    for (let i = left+1; i < right && !bFlg; ++i) {
      if (days[i] < days[left] || days[i] < days[right]) {
        left = i
        right = i + k + 1
        bFlg = true
      }
    }
    if (bFlg)
      continue
    const cur = Math.max(days[left], days[right])
    // skipping all in-between elements
    left = right
    right = k+1+left
    if (ans > cur)
      ans = cur
  }

  // back to 1-based
  return ans === Infinity ? -1 : ans+1
}

const {consoleTest, genInt} = require('leetcode-zwischenzug')
const f = consoleTest(kEmptySlots)
f([1,3,2],1)(2)

const gen = () => {
  const size = 100
  const xs = new Array(size)
  for (let i = 0; i < size; ++i) {
    xs[i] = i+1
  }
  for (let i = 0; i < size; ++i) {
    const j = genInt(i, size-1)
    if (i !== j) {
      const tmp = xs[i]
      xs[i] = xs[j]
      xs[j] = tmp
    }
  }
  return xs
}

// console.log(JSON.stringify(gen()))
f([59,72,64,87,56,79,63,85,45,92,31,78,53,8,29,84,33,69,3,24,7,38,34,70,27,81,58,75,22,68,80,47,19,1,51,77,30,66,11,18,14,50,52,43,67,26,62,71,16,35,10,9,89,83,95,88,48,73,57,2,99,49,100,5,65,54,98,20,28,61,93,94,74,36,86,32,21,97,15,44,96,25,17,41,12,55,46,82,4,40,23,6,90,37,39,76,60,13,42,91],7)()
