/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = root => {
  // returns false when tree is unbalanced
  const go = root => {
    if (root) {
      const lResult = go(root.left)
      if (lResult === false)
        return false
      const rResult = go(root.right)
      if (rResult === false)
        return false
      if (Math.abs(lResult - rResult) > 1)
        return false
      return 1 + (lResult >= rResult ? lResult : rResult)
    } else {
      // empty tree
      return 0
    }
  }

  return go(root) !== false
}

const {consoleTest, mkTree} = require('leetcode-zwischenzug')
const f = consoleTest(isBalanced)
f(mkTree([3,9,20,null,null,15,7]))(true)
f(mkTree([1,2,2,3,3,null,null,4,4]))(false)
