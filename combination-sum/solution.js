/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (cs, target) => {
  /*
     idea: just DFS. typical knapsack problem with replacement.
     DP could work but since we are supposed to output all possible results,
     DP would just result in more waste of space which doesn't worth it.
   */

  // order doesn't matter, and we want to reduce search space
  // and eliminate duplicate answers, we may just as well sort it and remove dups first
  cs.sort((x,y) => x - y)
  {
    // in-place de-dup
    let sz = 0
    for (let i = 0; i < cs.length; ++i) {
      if (sz === 0 || cs[sz-1] !== cs[i]) {
        cs[sz] = cs[i]
        ++sz
      }
    }
    cs.length = sz
  }
  const ans = []
  const cur = []
  const search = (l,r,dep,target) => {
    if (target === 0) {
      ans.push(cur.slice(0,dep))
      return
    }
    if (l > r || cs[l] > target) {
      return
    }
    // INVARIANT: cs[l] <= target
    cur[dep] = cs[l]
    // 2 possibilities:
    // (1) take current value, and keep the candidate list
    search(l,r,dep+1,target-cs[l])
    // (2) don't take current value, and no longer use this value in future
    search(l+1,r,dep,target)
  }

  search(0,cs.length-1,0,target)
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(combinationSum)

f([2,3,3,3,3,3,6,6,7], 7)()
f([2,3,5], 8)()
