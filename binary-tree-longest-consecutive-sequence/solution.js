/**
 * @param {TreeNode} root
 * @return {number}
 */
const longestConsecutive = root => {
  let ans = 0
  const go = root => {
    if (root) {
      if (root.left === null && root.right === null) {
        if (ans < 1)
          ans = 1
        return 1
      }
      let cur = 1
      const lLen = go(root.left)
      if (root.left && root.left.val === root.val + 1) {
        if (cur < lLen + 1)
          cur = lLen + 1
      }
      const rLen = go(root.right)
      if (root.right && root.right.val === root.val + 1) {
        if (cur < rLen + 1)
          cur = rLen + 1
      }
      if (ans < cur)
        ans = cur
      return cur
    } else {
      return 0
    }
  }
  go(root)
  return ans
}

const {consoleTest, mkTree} =  require('leetcode-zwischenzug')
const f = consoleTest(longestConsecutive)

f(mkTree([1,null,3,2,4,null,null,null,5]))(3)
f(mkTree([2,null,3,2,null,1]))(2)
f(mkTree([1,3,2,4,null,3,null,5,5,null,null,null,null,6]))(4)
