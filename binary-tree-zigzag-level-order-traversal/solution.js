function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = root => {
  // output depth order, but with 2nd, 4th, 6th ... line reversed.
  const merge = (xs, ys) => {
    const len = Math.max(xs.length, ys.length)
    const zs = new Array(len)
    for (let i = 0; i < len; ++i) {
      zs[i] = (xs[i] || []).concat(ys[i] || [])
    }
    return zs
  }

  const depthOrder = root => {
    if (!root)
      return []
    const resultL = depthOrder(root.left)
    const resultR = depthOrder(root.right)
    const ret = merge(resultL, resultR)
    ret.unshift([root.val])
    return ret
  }

  const depOrd = depthOrder(root)
  for (let i = 1; i < depOrd.length; i += 2)
    depOrd[i].reverse()

  return depOrd
}

const n0 = new TreeNode(0)
const n1 = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)
const n4 = new TreeNode(4)
const n5 = new TreeNode(5)

n0.left = n1
n0.right = n2
n1.left = n3
n2.left = n4
n2.right = n5

zigzagLevelOrder(n0)
