/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = nums => {
  /*
     idea: break into 3 parts:
     - the element right in the middle
     - left subarray and right subarray

     then deal with them recursively

   */
  const mk = (l,r) => {
    if (l > r) {
      return null
    }
    const mid = (l + r) >>> 1
    const ret = new TreeNode(nums[mid])
    ret.left = mk(l,mid-1)
    ret.right = mk(mid+1,r)
    return ret
  }
  return mk(0, nums.length-1)
}
