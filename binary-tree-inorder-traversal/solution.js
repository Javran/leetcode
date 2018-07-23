/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = root => {
  /*
     idea: it's either you or the language maintains the stack.

     let stack store partial trees that we pretend
     it doesn't have a left subtree, every time we check two things:

     - if we are focusing on a node, switch focus to it left tree
       and meanwhile push previous focus onto the stack
       and pretend it doesn't have a left subtree.

   */
  const ans = []
  const stack = []
  let focus = root
  while (focus || stack.length > 0) {
    if (focus) {
      if (focus.left) {
        stack.push(focus)
        focus = focus.left
      } else {
        ans.push(focus.val)
        focus = focus.right
      }
    } else {
      focus = stack.pop()
      ans.push(focus.val)
      focus = focus.right
    }
  }
  return ans
}
