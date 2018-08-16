/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = root => {
  /*
     idea: do level order from top to bottom first then reverse the result.
     as at the beginning of the program we don't know the maximum depth,
     it's easy to do a top-to-bottom level "traversal"
     (well, not really a traversal in terms of visiting order)
     but bottom-to-top will be tricky.
     we resolve this issue by just reverse our results of top-to-bottom one.
   */
  const ans = []
  const go = (root, dep) => {
    if (root) {
      if (!(dep in ans)) {
        ans[dep] = []
      }
      ans[dep].push(root.val)
      go(root.left, dep+1)
      go(root.right, dep+1)
    }
  }
  go(root, 0)
  for (
    let i = 0, j = ans.length-1;
    i < j;
    ++i, --j
  ) {
    const tmp = ans[i]
    ans[i] = ans[j]
    ans[j] = tmp
  }
  return ans
}
