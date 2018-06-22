/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const constructMaximumBinaryTree = nums => {
  // positional indices.
  const go = (l,r) => {
    if (l >= r)
      return null
    let maxVal = nums[l]
    let maxInd = l
    for (let i = l+1; i < r; ++i) {
      if (nums[i] > maxVal) {
        maxVal = nums[i]
        maxInd = i
      }
    }
    const root = new TreeNode(nums[maxInd])
    root.left = go(l,maxInd)
    root.right = go(maxInd+1,r)
    return root
  }
  return go(0, nums.length)
}
