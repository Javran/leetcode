/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = root => {
  // idea: do as told
  const ans = []
  const go = (root, dep) => {
    if (root) {
      if (dep in ans) {
        ans[dep].push(root.val)
      } else {
        ans[dep] = [root.val]
      }
      go(root.left, dep+1)
      go(root.righ, dep+1)
    }
  }
  go(root, 0)
  return ans
}
