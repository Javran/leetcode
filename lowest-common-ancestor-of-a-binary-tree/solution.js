/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  const pAncestors = new Set()
  // collect ancestors of p
  const go = cur => {
    if (cur === null)
      return false
    if (cur === p || go(cur.left) || go(cur.right)) {
      pAncestors.add(cur)
      return true
    }
    return false
  }
  go(root)

  let ans = null
  const go2 = cur => {
    if (cur === null)
      return false
    if (cur === q) {
      if (pAncestors.has(cur)) {
        ans = cur
      }
      return true
    }
    const rL = go2(cur.left)
    if (ans !== null)
      return true
    const rR = go2(cur.right)
    if (ans !== null)
      return true
    if (rL || rR) {
      if (pAncestors.has(cur)) {
        ans = cur
      }
      return true
    } else {
      return false
    }
  }
  go2(root)

  return ans
}
