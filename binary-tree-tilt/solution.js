/**
 * @param {TreeNode} root
 * @return {number}
 */
const findTilt = root => {
  let tSum = 0
  const go = cur => {
    if (cur !== null) {
      const lSum = go(cur.left)
      const rSum = go(cur.right)
      tSum += Math.abs(lSum - rSum)
      return cur.val + lSum + rSum
    } else {
      return 0
    }
  }
  go(root)
  return tSum
}

const {cTestFunc, mkTree, genList} = require('leetcode-zwischenzug')

const f = cTestFunc(findTilt)
f(mkTree([1,2,3]))(1)
f(mkTree([763,285,944,190,21,602,872,342,776,17]))()
