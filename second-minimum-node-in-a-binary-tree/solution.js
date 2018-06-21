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
const findSecondMinimumValue = root => {
  // root is guaranteed to be non-empty
  const rootV = root.val
  let ans = -1
  const go = root => {
    if (
      /*
         only interested in non-leave nodes whose value is root value.
         because that's where the second minimum, if present, can be found
       */
      root && root.val === rootV &&
      root.left && root.right
    ) {
      // note that exactly one value will be different
      // as root value comes from one of its two-subtress
      if (root.left.val !== rootV) {
        if (ans === -1 || root.left.val < ans)
          ans = root.left.val
      } else {
        go(root.left)
      }

      if (root.right.val !== rootV) {
        if (ans === -1 || root.right.val < ans)
          ans = root.right.val
      } else {
        go(root.right)
      }
    }
  }
  go(root)
  return ans
}
