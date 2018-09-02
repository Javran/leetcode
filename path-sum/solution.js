/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = (root, sum) => {
  /*
     idea: clear structure for recursion.
     well except that the problem setter is a dick
   */
  if (root === null) {
    // to problem setter: FUCK YOU
    return false
  }
  if (root.left === null && root.right === null) {
    return root.val === sum
  }
  const target = sum - root.val
  return hasPathSum(root.left, target) || hasPathSum(root.right, target)
}
