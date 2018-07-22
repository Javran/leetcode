function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = (headA, headB) => {
  if (headA === null || headB === null)
    return null
  let curA = headA;
  let curB = headB;

  while(curA && curB && curA !== curB) {
    curA = curA.next
    curB = curB.next
    if (curA === curB)
      return curA
    /*
       a very interesting way of getting curA and curB sync
       without knowing the diff: when curA or curB runs out,
       just start from the opposite linked list header,
       by doing so, the difference is perfectly compensated
       so they will be in sync.

       same thing works even if headA and headB doesn't have intersection
       at all, in which case both curA and curB jumps
       (# of nodes in A) + (# of nodes in B) times in total
       before they both become null
     */
    if (curA === null)
      curA = headB
    if (curB === null)
      curB = headA
  }
  return curA
}

const a0 = new ListNode("a0")
const a1 = new ListNode("a1")
a0.next = a1
const b0 = new ListNode("b0")
const b1 = new ListNode("b1")
b0.next = b1
const c0 = new ListNode("c0")
const c1 = new ListNode("c1")
c0.next = c1
const c2 = new ListNode("c2")
c1.next = c2

a1.next = c0
b1.next = c0

console.assert(getIntersectionNode(a0, b0) === c0)
console.assert(getIntersectionNode(a0, b1) === c0)
console.assert(getIntersectionNode(a0, c0) === c0)
console.assert(getIntersectionNode(a0, c1) === c1)
