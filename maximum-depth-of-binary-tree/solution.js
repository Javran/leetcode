/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = root => {
  /*
     idea: update with DFS
   */
  let ans = 0
  const go = (root, dep) => {
    if (root) {
      if (dep > ans)
        ans = dep
      go(root.left,dep+1)
      go(root.right,dep+1)
    }
  }
  go(root, 1)
  return ans
}
