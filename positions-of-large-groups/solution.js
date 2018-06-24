/**
 * @param {string} S
 * @return {number[][]}
 */
const largeGroupPositions = xs => {
  const ans = []
  let i = 0
  while (i < xs.length) {
    const startInd = i
    const hd = xs[startInd]
    while (i+1 < xs.length && xs[i+1] === hd)
      ++i
    const endInd = i
    // large if it has 3 or more
    //   eI - sI + 1 >= 3
    // > eI - sI >= 2
    if (endInd - startInd >= 2)
      ans.push([startInd, endInd])
    ++i
  }
  return ans
}

console.log(largeGroupPositions("abcdddeeeeaabbbcd"))
