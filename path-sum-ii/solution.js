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
 * @return {number[][]}
 */
const pathSum = (root, sumTarget) => {
  if (!root)
    return []
  // keeping track while performing DFS
  const ans = []
  const pathHist = []
  const search = (root, prevSum, depth) => {
    if (root) {
      const sum = prevSum + root.val
      if (root.left === null && root.right === null) {
        // is leaf node
        if (sum === sumTarget) {
          const xs = pathHist.slice(0,depth)
          xs.push(root.val)
          ans.push(xs)
        }
      } else {
        pathHist[depth] = root.val
        search(root.left, sum, depth+1)
        search(root.right, sum, depth+1)
      }
    }
  }
  search(root, 0, 0)
  return ans
}
