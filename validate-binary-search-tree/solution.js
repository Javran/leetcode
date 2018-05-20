/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = root => {
  const inOrder = []
  const go = node => {
    if (!node)
      return
    go(node.left)
    inOrder.push(node.val)
    go(node.right)
  }
  go(root)
  let increaseFlag = true
  for (let i = 1; i < inOrder.length && increaseFlag; ++i) {
    if (inOrder[i-1] >= inOrder[i])
      increaseFlag = false
  }
  return increaseFlag
}
