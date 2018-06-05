/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findFrequentTreeSum = root => {
  if (root === null)
    return []

  const m = new Map()
  const reportSum = s => {
    if (m.has(s)) {
      m.set(s, m.get(s)+1)
    } else {
      m.set(s, 1)
    }
  }

  // traverse, while computing subtree sums, report it by using "reportSum"
  const computeSum = root => {
    if (root) {
      const lSum = computeSum(root.left)
      const rSum = computeSum(root.right)
      const ret = lSum + rSum + root.val
      reportSum(ret)
      return ret
    } else {
      return 0
    }
  }
  computeSum(root)

  // now we have the freqs, only pick max one.
  const xs = [...m.values()]
  let max = xs[0]
  for (let i = 1; i < xs.length; ++i)
    if (xs[i] > max)
      max = xs[i]

  // one last scan on pairs of m to pick all sums with that freq
  const ans = []
  const ys = [...m.entries()]
  for (let i = 0; i < ys.length; ++i)
    if (ys[i][1] === max)
      ans.push(ys[i][0])
  return ans
}
