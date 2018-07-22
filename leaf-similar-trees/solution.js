/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
const leafSimilar = (root1, root2) => {
  /*
     idea: nothing fancy. just collect values and compare.
     correctness first won't hurt.
   */
  const go = (root, out) => {
    if (root) {
      if (root.left === null && root.right === null)
        out.push(root.val)
      go(root.left, out)
      go(root.right, out)
    }
  }
  const xs = [], ys = []
  go(root1, xs)
  go(root2, ys)
  return xs.length === ys.length && xs.every((x,ind) => x === ys[ind])
}
