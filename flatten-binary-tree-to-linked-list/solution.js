/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = root => {
  if (!root)
    return
  const dummy = new TreeNode(null)
  let cur = dummy
  const go = root => {
    if (root) {
      const l = root.left, r = root.right
      // repurposing current node
      cur.right = root
      root.left = null, root.right = null
      cur = root
      go(l)
      go(r)
    }
  }
  go(root)
  root.left = null
  // 1st value is the root itself.
  root.right = dummy.right.right
  return
}
