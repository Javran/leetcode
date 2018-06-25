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
const diameterOfBinaryTree = root => {
  /*
     the path of this max diameter
     must be:
     - going through a root that we will traverse,
       in which case it is derived from the height of both subtrees
     - inside either left or right subtree. to handle this case,
       we keep a global value updated so we won't miss the answer
       during traversal.
   */

  // keep current max diameter.
  let max = 0
  // return height
  const go = root => {
    if (root) {
      const lH = go(root.left)
      const rH = go(root.right)
      let curDia = 0
      let height = 0
      if (root.left) {
        curDia += lH + 1
        if (height < lH + 1)
          height = lH + 1
      }
      if (root.right) {
        curDia += rH + 1
        if (height < rH + 1)
          height = rH + 1
      }
      if (curDia > max)
        max = curDia
      return height
    } else {
      return 0
    }
  }
  go(root)
  return max
}
