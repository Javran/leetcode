const {consoleTest, mkListNode, listNodeToArray} = require('leetcode-zwischenzug')

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = head => {
  /*
     idea: more straightforward to draw on something.
     just need to be careful not to lose any info:
     when we are about to change a something.next, make sure
     its old value has a backup somewhere so we can go back
     and work with the old value again
   */
  let last = null
  let cur = head
  while (cur !== null) {
    const tmp = cur.next
    cur.next = last
    last = cur
    cur = tmp
    if (cur === null)
      return last
  }
  return null
}

const f = consoleTest(function rev(xs) {
  const l = mkListNode(xs)
  return listNodeToArray(reverseList(l))
})

f([])([])
f([1])([1])
f([1,2,3,4])([4,3,2,1])
