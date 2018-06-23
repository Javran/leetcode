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
const longestUnivaluePath = root => {
  // idea: traverse the tree, compute "univalue" height of left & right children
  // and because all paths can be split into left height + right height
  // the traversal guarantees to find the longest one.
  let max = 0
  // compute longest "univalue" height
  const go = root => {
    if (root) {
      const lHeight = go(root.left)
      const rHeight = go(root.right)
      // if we assume the ans path runs past root
      // and probably its left and right children
      let curPath = 0
      let height = 0
      if (root.left && root.left.val === root.val) {
        curPath += lHeight + 1
        if (height < lHeight + 1)
          height = lHeight + 1
      }
      if (root.right && root.right.val === root.val) {
        curPath += rHeight + 1
        if (height < rHeight + 1)
          height = rHeight + 1
      }
      if (curPath > max)
        max = curPath
      return height
    } else {
      return 0
    }
  }
  go(root)
  return max
}
