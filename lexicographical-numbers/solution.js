/**
 * @param {number} n
 * @return {number[]}
 */
const lexicalOrder = n => {
  /*
     idea: notice that DFS generates the correct order
     so we may just as well use it.
   */
  const ans = []
  const gen = cur => {
    // note that cur is never expected to be 0,
    // as we don't want numbers with leading 0s
    if (cur > n)
      return
    ans.push(cur)
    const s = cur*10
    for (let i = 0; i <= 9 && s + i <= n; ++i) {
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
