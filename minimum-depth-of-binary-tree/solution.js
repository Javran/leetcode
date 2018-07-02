/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = root => {
  // nothing much to say
  if (!root)
    return 0

  let ans = null
  const go = (root, dep) => {
    if (root) {
      if (!root.left && !root.right) {
        if (ans === null || ans > dep)
          ans = dep
      } else {
        go(root.left, dep+1)
        go(root.right, dep+1)
      }
    }
  }
  go(root,1)
  return ans
}
