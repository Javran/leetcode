/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = head => {
  // idea: standard slow & fast trick
  let slow = head
  let fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}

const {consoleTest, listNodeToArray, mkListNode} = require('leetcode-zwischenzug')
const f = consoleTest(x => listNodeToArray(middleNode(mkListNode(x))))
f([1,2,3,4,5])([3,4,5])
f([1,2,3,4,5,6])([4,5,6])
f([1,2])([2])
f([1,2,3])([2,3])
f([1])([1])
