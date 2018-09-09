/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
const deleteNode = node => {
  // idea: well I don't know what is the purpose of this problem.
  node.val = node.next.val
  node.next = node.next.next
}
