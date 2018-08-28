const next = xs => {
  const ys = new Array(xs.length+1)
  ys[0] = 1
  ys[xs.length] = 1
  for (let i = 0; i + 1< xs.length; ++i) {
    ys[i+1] = xs[i] + xs[i+1]
  }
  return ys
}

/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = n => {
  const ans = []
  let cur = [1]
  for (let i = 1; i <= n; ++i) {
    ans.push(cur)
    if (i + 1 <= n)
      cur = next(cur)
    else
      break
  }
  return ans
}
