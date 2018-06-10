/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = root => {
  const convert = (root, acc) => {
    // accumulate from:
    if (root) {
      // right first, as it has all the greater values
      let newAcc = convert(root.right, acc)
      // node itself
      root.val += newAcc
      // convert left, return new accumulated value
      return convert(root.left, root.val)
    } else {
      return acc
    }
  }
  convert(root, 0)
  return root
}
