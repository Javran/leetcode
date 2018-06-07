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

  /*
     what we need is a dynamic programming on tree:

     - let f(<node>) be the max value of the tree with <node> as root can have
       when taking the value of <node>
     - let g(<node>) be the max value of the tree with <node> as root can have
       when not taking the value of <node>
     - for f(<node>), we takes the value of current node,
       and in addition, all "g" values of their children,
       as taking <node> prevents all its direct children from being taken.

     - for g(<node>), we can have choices of either taking or not taking a child
       and therefore we need both case being taken into account.

   */

  const compute = root => {
    if (root) {
      compute(root.left)
      compute(root.right)

      // f: taking root, g: not taking root
      let f = root.val, g = 0
      if (root.left) {
        // as root is taken, we have no choice but to leave all its direct children
        f += root.left.g
        // as root is not taken, we are free to make decisions about direct children
        g += Math.max(root.left.f, root.left.g)
      }
      if (root.right) {
        // symmetric case.
        f += root.right.g
        g += Math.max(root.right.f, root.right.g)
      }

      // yup this is the convenient part of JS
      root.f = f
      root.g = g
    }
  }
  compute(root)
  return Math.max(root.f, root.g)
}
