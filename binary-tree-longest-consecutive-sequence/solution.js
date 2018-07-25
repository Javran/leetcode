/**
 * @param {TreeNode} root
 * @return {number}
 */
const longestConsecutive = root => {
  /*
     idea: do DFS, let the recursive function return the longest
     path starting at root, and let upper level root decide
     whether it can form a longer path.
     and also since the return value of the recursive function is
     not necessary the answer, we keep track of the max value as well.
   */
  let ans = 0
  const go = root => {
    if (root) {
      // cur is suppose to be 1, but we can hold that
      // until we actually want to return or update ans
      let cur = 0
      let nextVal = root.val+1
      if (root.left) {
        const lLen = go(root.left)
        if (
          root.left.val === nextVal &&
          cur < lLen
        )
          cur = lLen
      }

      if (root.right) {
        const rLen = go(root.right)
        if (
          root.right.val === nextVal &&
          cur < rLen
        )
          cur = rLen
      }
      ++cur
      if (ans < cur)
        ans = cur
      return cur
    } else {
      return 0
    }
  }
  go(root)
  return ans
}

const {consoleTest, mkTree} =  require('leetcode-zwischenzug')
const f = consoleTest(longestConsecutive)

f(mkTree([]))(0)
f(mkTree([1,null,3,2,4,null,null,null,5]))(3)
f(mkTree([2,null,3,2,null,1]))(2)
f(mkTree([1,3,2,4,null,3,null,5,5,null,null,null,null,6]))(4)
