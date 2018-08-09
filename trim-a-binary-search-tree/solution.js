const {TreeNode, consoleTest, mkTree} = require('leetcode-zwischenzug')

/**
 * @param {TreeNode} root
 * @param {number} L
 * @param {number} R
 * @return {TreeNode}
 */
const trimBST = (root, L, R) => {
  if (root === null)
    return null
  // val ... [L, R] (outside)
  if (root.val < L)
    return trimBST(root.right, L, R)
  // [L, R] ... val (outside)
  if (root.val > R)
    return trimBST(root.left, L, R)
  // val is within range.
  root.left = trimBST(root.left, L, root.val)
  root.right = trimBST(root.right, root.val, R)
  return root
}

// TODO: bug fix
const f = consoleTest(trimBST)
f(mkTree([1,0,2],1,2))()
f(mkTree([3,0,4,null,2,null,null,1]),1,3)()
