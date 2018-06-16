/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
const kthSmallest = (root, k) => {
  // keep track of total # of nodes,
  // which allows us to determine which branch to go
  // if root element is not the one we are looking for.
  const go = root => {
    if (root) {
      const l = go(root.left)
      const r = go(root.right)
      const count = l + r + 1
      root.count = count
      return count
    } else {
      return 0
    }
  }
  go(root)

  const findKth = (root, k) => {
    const lCount = root.left ? root.left.count : 0
    const rCount = root.right ? root.right.count : 0
    if (k == lCount + 1) {
      return root.val
    } else if (k <= lCount) {
      return findKth(root.left, k)
    } else {
      // must be in right tree
      return findKth(root.right, k-lCount-1)
    }
  }
  return findKth(root, k)
}
