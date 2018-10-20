/**
 * @param {TreeNode} root
 * @return {number}
 */
const findTilt = root => {
  /*
     idea: we can have a recursive function
     to compute sum of each subtree.
     by doing so, we notice that because
     the recursive call gives us sum of two subtress of the current node,
     we have a perfect chance to compute tilt and accumulate that value somewhere.
   */
  let tSum = 0
  // returns sum of the given tree
  const go = cur => {
    if (cur !== null) {
      const lSum = go(cur.left)
      const rSum = go(cur.right)
      // while we have sums of two subtrees,
      // we might as well compute and accumulate tilt here.
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
