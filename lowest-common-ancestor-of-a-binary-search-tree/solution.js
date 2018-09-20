/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  if (root === null || root === p || root === q)
    return root
  const lResult = lowestCommonAncestor(root.left, p, q)
  const rResult = lowestCommonAncestor(root.right, p, q)
  return (lResult !== null && rResult !== null) ? root : (lResult || rResult)
}
