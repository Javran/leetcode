/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  if (root === null || root === p || root === q)
    return root
  const rL = lowestCommonAncestor(root.left, p, q)
  const rR = lowestCommonAncestor(root.right, p, q)
  // when exactly one of them is true, both p and q
  // falls into the same branch so we just need to
  // return the non-null result.
  if (rL === null)
    return rR
  if (rR === null)
    return rL
  /*
     now that rL !== null && rR !== null,
     this result might not make sense for finding lowest common ancestor,
     but it tells us that root is the one that splits apart p and q,
     therefore it's the lowest common ancestor
   */
  return root
}
