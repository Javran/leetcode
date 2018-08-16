/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = root => {
  const ans = []
  const go = (root, dep) => {
    if (root) {
      if (!(dep in ans)) {
        ans[dep] = []
      }
      ans[dep].push(root.val)
      go(root.left, dep+1)
      go(root.right, dep+1)
    }
  }
  go(root, 0)
  for (
    let i = 0, j = ans.length-1;
    i < j;
    ++i, --j
  ) {
    const tmp = ans[i]
    ans[i] = ans[j]
    ans[j] = tmp
  }
  return ans
}
