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
const averageOfLevels = root => {
  // Array<{count: ?, sum: ?}>
  const vals = []
  const go = (root, dep) => {
    if (root) {
      if (dep in vals) {
        vals[dep].count += 1
        vals[dep].sum += root.val
      } else {
        vals[dep] = {count: 1, sum: root.val}
      }
      go(root.left, dep+1)
      go(root.right, dep+1)
    }
  }
  go(root, 0)
  return vals.map(x => x.sum / x.count)
}
