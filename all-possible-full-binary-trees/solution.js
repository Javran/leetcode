const memo = []

memo[0] = []
memo[1] = [new TreeNode(0)]

/**
 * @param {number} N
 * @return {TreeNode[]}
 */
const allPossibleFBT = N => {
  /*
     idea: an ideal situation where memoization comes in handy:
     knowing N alone allows us to look results up in a table,
     so we might as well do that to maximize shared structure -
     given that the result does not suppose to be mutated.
   */
  if (N in memo)
    return memo[N]
  const ans = []
  for (
    let lCount = 1, rCount = N-1-lCount;
    rCount >= 1;
    ++lCount, --rCount
  ) {
    const lResults = allPossibleFBT(lCount)
    const rResults = allPossibleFBT(rCount)
    // non-determinism
    lResults.forEach(lT => {
      rResults.forEach(rT => {
        const bt = new TreeNode(0)
        bt.left = lT
        bt.right = rT
        ans.push(bt)
      })
    })
  }
  memo[N] = ans
  return ans
}
