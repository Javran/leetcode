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
const getMinimumDifference = root => {
  // NOTE: exactly same code (except for function name)
  // for minimum-distance-between-bst-nodes
  // observation: the min diff can only be between two consecutive values
  // in BST's in-order traversal
  let min = null
  let prev = null
  // keep track of previous value so we don't have to
  // construct an in-order list of values
  const next = v => {
    if (prev !== null) {
      const newDiff = v - prev
      if (min === null || newDiff < min)
        min = newDiff
    }
    prev = v
  }

  // in-order traversal. next() for performing an action
  const go = root => {
    if (root) {
      go(root.left)
      next(root.val)
      go(root.right)
    }
  }
  go(root)
  return min
}
