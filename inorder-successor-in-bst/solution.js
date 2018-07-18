/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
const inorderSuccessor = (root, p) => {
  /*
     idea: since we know p, we know exactly which path
     to take to get to that node,
     after that, we just work by considering every situation
   */
  // returns inorder successor of p in branch root
  // null if not found
  const go = root => {
    if (root) {
      if (root === p) {
        if (root.right === null)
          // no inorder successor the tree with root being the root.
          return null
        let cur = root.right
        // pick the leftmost one
        while (cur.left !== null)
          cur = cur.left
        return cur
      }
      if (p.val < root.val) {
        // search in left branch
        const ret = go(root.left)
        if (ret !== null)
          return ret
        // if not found in left branch, return root itself.
        return root
      } else {
        // search in right branch
        // no other way of retrying, in which case
        // we let the recursive call take full control.
        return go(root.right)
      }
    } else {
      return null
    }
  }
  return go(root, p)
}
