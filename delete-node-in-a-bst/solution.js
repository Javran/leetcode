// ref: https://en.wikipedia.org/wiki/Binary_search_tree#Deletion

/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = (root, key) => {
  if (root) {
    if (root.val === key) {
      if (root.left) {
        if (root.right) {
          // we have both
          // find in-order successor
          let succ = root.right
          while (succ.left)
            succ = succ.left
          root.val = succ.val
          // guarantee to have no more than one child
          root.right = deleteNode(root.right, succ.val)
          return root
        } else {
          // root.right === null
          return root.left
        }
      } else {
        // root.left === null
        if (root.right) {
          return root.right
        } else {
          // is leaf
          return null
        }
      }
    } else if (root.val > key) {
      root.left = deleteNode(root.left, key)
      return root
    } else {
      // root.val < key
      root.right = deleteNode(root.right, key)
      return root
    }
  } else {
    return root
  }
}
