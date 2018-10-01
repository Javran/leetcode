/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = root => {
  if (root === null) {
    return null
  } else {
    const newRight = invertTree(root.left)
    const newLeft = invertTree(root.right)
    root.left = newLeft
    root.right = newRight
    return root
  }
}
