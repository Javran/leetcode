/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = root => {
  // straightforward traversal
  const ans = []
  const st = []
  const go = root => {
    if (root) {
      st.push(root.val)
      if (!root.left && !root.right) {
        ans.push(st.join("->"))
      } else {
        go(root.left)
        go(root.right)
      }
      st.pop()
    }
  }
  go(root)
  return ans
}
