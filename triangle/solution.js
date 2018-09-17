/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = ts => {
  const N = ts.length
  if (N === 0)
    return 0
  /*
     idea: DP line by line, and as the recurrence relation
     only require the previous line to be present,
     we can just keep two latest rows for that. (tmp in my solution below)

     apparently you can mutate input Array to do the trick,
     which in no way like a tasteful practice for me. so, forget about all that business.
   */
  /*
     valid indices:
     ts[0][0..0]
     ts[1][0..1]
     ts[2][0..2]
     ...
     ts[i][0..i]

     if best solution at coord [i][j] is f[i][j]:

     f[i][0] = f[i-1][0] + ts[i][0]
     f[i][i] = f[i-1][i-1] + ts[i][i]
     f[i][j] = min(f[i-1][j-1], f[i-1][j]) + ts[i][j]
   */

  const tmp = [new Int32Array(N), new Int32Array(N)]
  // first row
  tmp[0][0] = ts[0][0]
  for (let i = 1; i < N; ++i) {
    const tNow = i & 1
    const tPrev = 1-tNow
    tmp[tNow][0] = tmp[tPrev][0] + ts[i][0]
    tmp[tNow][i] = tmp[tPrev][i-1] + ts[i][i]
    for (let j = 1; j < i; ++j)
      tmp[tNow][j] = ts[i][j] + Math.min(tmp[tPrev][j-1], tmp[tPrev][j])
  }
  const arr = tmp[1-(N & 1)]
  let min = arr[0]
  for (let i = 1; i < N; ++i)
    if (min > arr[i])
      min = arr[i]
  return min
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(minimumTotal)

f([[2],[3,4],[6,5,7],[4,1,8,3]])(11)
