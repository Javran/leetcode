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
const largestValues = root => {
  // straightforward, just need to keep track of depth
  const ans = []
  const go = (root, dep) => {
    if (root) {
      if (!(dep in ans) || ans[dep] < root.val)
        ans[dep] = root.val
      go(root.left, dep+1)
      go(root.right, dep+1)
    }
  }
  go(root, 0)
  return ans
}
