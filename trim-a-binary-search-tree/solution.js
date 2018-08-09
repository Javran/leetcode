const {TreeNode, consoleTest, mkTree} = require('leetcode-zwischenzug')

/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {TreeNode}
 */
const trimBST = (root, L, R) => {
  /*
     idea: should be straightforward, just slight discussion regarding
     the relationship between L,R and root.val
   */
  const go = root => {
    if (root === null)
      return null
    // val ... [L, R] (outside)
    if (root.val < L)
      return go(root.right)
    // [L, R] ... val (outside)
    if (root.val > R)
      return go(root.left)
    // val is within range.
    root.left = go(root.left)
    root.right = go(root.right)
    return root
  }
  return go(root)
}

const f = consoleTest(trimBST)
f(mkTree([1,0,2],1,2))()
f(mkTree([3,0,4,null,2,null,null,1]),1,3)()
