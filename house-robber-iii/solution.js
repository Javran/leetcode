/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const rob = root => {
  if (root === null)
    return 0

  const compute = root => {
    if (root) {
      compute(root.left)
      compute(root.right)

      // f: when we want to take the value of current node
      // in which case we cannot take values of all its sub-nodes
      // g: when not taking the value of current node
      let f = root.val, g = 0
      if (root.left) {
        f += root.left.g
        g += Math.max(root.left.f, root.left.g)
      }
      if (root.right) {
        f += root.right.g
        g += Math.max(root.right.f, root.right.g)
      }

      root.f = f
      root.g = g
    }
  }
  compute(root)
  return Math.max(root.f, root.g)
}
