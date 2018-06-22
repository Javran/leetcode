/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const plusOne = head => {
  const go = head => {
    if (head.next === null) {
      ++head.val
      if (head.val === 10) {
        head.val = 0
        return true
      } else {
        return false
      }
    } else {
      const carry = go(head.next)
      if (carry) {
        ++head.val
        if (head.val === 10) {
          head.val = 0
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
  const carry = go(head)
  if (carry) {
    const newNode = new ListNode(1)
    newNode.next = head
    return newNode
  } else {
    return head
  }
}
