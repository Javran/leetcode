const {consoleTest, ListNode, mkListNode, listNodeToArray} = require('leetcode-zwischenzug')

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = head => {
  /*
     idea: nothing difficult, but we can't be too careful
     when it comes to manipulating pointers.

     we'll use 3 pointers in the following relative position:

     ... -> prev -> fst -> snd -> ...

     where fst = prev.next, snd = fst.next.
     (of course if either of `fst` or `snd` becomes null
     we can stop the swapping process immediately)

     now that we can swap `fst` and `snd` and proceed by setting `prev` to new `snd`:

     ... -> prev -> snd -> fst (next prev position) -> ...

   */
  const dummy = {next: head}
  for (let prev = dummy; prev !== null; /* NOOP */) {
    const fst = prev.next
    if (fst === null)
      break
    const snd = fst.next
    if (snd === null)
      break
    prev.next = snd
    fst.next = snd.next
    snd.next = fst
    prev = fst
  }
  return dummy.next
}

const f = consoleTest(function swapPairsTest(xs) {
  const l = mkListNode(xs)
  return listNodeToArray(swapPairs(l))
})

f([])([])
f([1])([1])
f([1,2,3,4])([2,1,4,3])
f([1,2,3,4,5])([2,1,4,3,5])
f([1,2,3,4,5,6])([2,1,4,3,6,5])
