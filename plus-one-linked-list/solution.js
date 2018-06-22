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
  // idea: use return value as carry flag.
  const go = head => {
    if (!head)
      return false
    const carry = go(head.next)
    if (carry || head.next === null) {
      // either it's the last digit or we need to respect carry flag
      if (head.val === 9) {
        head.val = 0
        return true
      } else {
        ++head.val
        return false
      }
    }
    return false
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
