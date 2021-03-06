/**
 * @param {number} n
 * @return {number[]}
 */
const lexicalOrder = n => {
  /*
     idea: notice that DFS generates the correct order
     so we may just as well use it.
   */
  const ans = new Array(n)
  let sz = 0
  const gen = cur => {
    // note that cur is never expected to be 0,
    // as we don't want numbers with leading 0s
    if (cur > n)
      return
    ans[sz] = cur
    ++sz
    const s = cur*10
    const upBound = Math.min(9, n - s)
    for (let i = 0; i <= upBound; ++i) {
      gen(s+i)
    }
  }

  for (let i = 1; i <= 9; ++i)
    gen(i)
  return ans
}

console.time(1)
const xs = lexicalOrder(5000000)
console.timeEnd(1)
