/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  /*
     idea: recursive approach. if both side managed to find an ancestor,
     that means p and q are distributed to different side of root,
     which means root is the LCA.
   */
  if (root === null || root === p || root === q)
    return root
  const lResult = lowestCommonAncestor(root.left, p, q)
  const rResult = lowestCommonAncestor(root.right, p, q)
  return (lResult !== null && rResult !== null) ? root : (lResult || rResult)
}
