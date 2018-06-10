/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
const pathSum = (root, sumTarget) => {
  let count = 0
  const search = (root, prevSums) => {
    if (root) {
      // nondeterministic.
      const sums = prevSums.map(x => x + root.val)
      // assume a prevSum "0" is there.
      sums.push(root.val)
      for (let i = 0; i < sums.length; ++i)
        if (sums[i] === sumTarget)
          count += 1
      search(root.left, sums)
      search(root.right, sums)
    }
  }
  search(root, [])
  return count
}
