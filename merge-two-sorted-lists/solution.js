const {ListNode, cTestFunc, mkListNode, listNodeToArray} = require('leetcode-zwischenzug')

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = (l1, l2) => {
  /*
     idea: exactly how you do it in functional programming.
   */
  if (l1 === null)
    return l2
  if (l2 === null)
    return l1
  if (l1.val <= l2.val) {
    const n = new ListNode(l1.val)
    n.next = mergeTwoLists(l1.next, l2)
    return n
  } else {
    const n = new ListNode(l2.val)
    n.next = mergeTwoLists(l1, l2.next)
    return n
  }
}

const f = cTestFunc(function mergeTest(xs, ys) {
  const l1 = mkListNode(xs)
  const l2 = mkListNode(ys)
  return listNodeToArray(mergeTwoLists(l1,l2))
})

f([],[])([])
f([1,1,2],[])([1,1,2])
f([],[3,4,5])([3,4,5])
f([1,3,5,7],[2,4,6,6,8])([1,2,3,4,5,6,6,7,8])
