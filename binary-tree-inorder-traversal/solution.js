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

     - if we have lost our focus (=== null),
       the current "go deep" part is done
       so we go back and revisit things on stack
       as if we are doing the recursive version.

   */
  const ans = []
  const stack = []
  let focus = root
  while (focus || stack.length > 0) {
    if (focus) {
      stack.push(focus)
      focus = focus.left
    } else {
      focus = stack.pop()
      ans.push(focus.val)
      focus = focus.right
    }
  }
  return ans
}
