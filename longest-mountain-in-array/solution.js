/**
 * @param {number[]} A
 * @return {number}
 */
var longestMountain = xs => {
  if (xs.length < 3)
    return 0

  let ans = 0
  let startInd = 0, endInd = 0, downFlag = false
  const updateAns = () => {
    if (
      //    endInd - startInd + 1 >= 3
      // >> endInd - startInd >= 2
      endInd - startInd >= 2 &&
      xs[startInd] < xs[startInd+1] &&
      xs[endInd-1] > xs[endInd]
    ) {
      const l = endInd - startInd + 1
      if (ans < l)
        ans = l
    }
  }
  // assuming first height is a start of a partial mountain
  for (let i = 1; i < xs.length; ++i) {
    if (xs[i] > xs[i-1]) {
      // going up
      if (downFlag) {
        updateAns()
        // we expected it to go down. need to break right here.
        // note that we can reuse i-1 to make a bigger mountain.
        startInd = i-1, endInd = i, downFlag = false
      } else {
        endInd = i
      }
    } else if (xs[i] < xs[i-1]) {
      // going down
      if (downFlag) {
        endInd = i
      } else {
        // might go down.
        if (
          //    endInd - startInd + 1 >= 2
          // >> endInd - startInd >= 1
          endInd - startInd >= 1
        ) {
          // partial mountain (go far going up) going on,
          // we switch to expect going down.
          endInd = i, downFlag = true
        } else {
          updateAns()
          startInd = i, endInd = i, downFlag = false
        }
      }
    } else {
      // equal.
      updateAns()
      startInd = i, endInd = i, downFlag = false
    }
  }
  // test leftover
  updateAns()
  return ans
}

console.assert(longestMountain([2,1,4,7,3,2,5]) === 5)
console.assert(longestMountain([2,5,6,2,3,1,2,4,4,4,1,2,1,0]) === 4)
console.assert(longestMountain([5,4,3,2,1,2,3,4]) === 0)
