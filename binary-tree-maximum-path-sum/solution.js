/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxPathSum = root => {
  let max = -Infinity
  // return max path sum,
  const go = root => {
    if (root) {
      const lPath = go(root.left)
      const rPath = go(root.right)
      // since we have negative numbers, any path below is possible:
      const pathMax = Math.max(root.val, root.val + lPath, root.val + rPath)
      if (max < root.val + lPath + rPath) {
        max = root.val + lPath + rPath
      }
      // also need to include pathMax, in case all parent nodes are negative
      // we might as well just choose current value without further extending
      if (max < pathMax)
        max = pathMax
      return pathMax
    } else {
      return 0
    }
  }
  go(root)
  return max
}
