/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const rightSideView = root => {
  // idea: in-order traversal and overwrite.
  const ans = []
  const go = (root, dep) => {
    if (root) {
      go(root.left, dep+1)
      ans[dep] = root.val
      go(root.right, dep+1)
    }
  }
  go(root, 0)
  return ans
}
