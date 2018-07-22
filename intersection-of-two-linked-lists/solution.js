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
  let countA = 0
  let curA
  for (curA = headA; curA.next !== null; curA = curA.next)
    ++countA
  let countB = 0
  for (curB = headB; curB.next !== null; curB = curB.next)
    ++countB
  // if 2 linked list have intersection at all, they must meet at the end.
  if (curA !== curB)
    return null
  const diff = countA - countB
  // figure out how many jumps we need in order to get curA and curB sync
  curA = headA, curB = headB
  if (diff > 0) {
    for (let i = 0; i < diff; ++i)
      curA = curA.next
  } else {
    for (let i = 0; i < -diff; ++i)
      curB = curB.next
  }
  while (curA !== curB) {
    curA = curA.next
    curB = curB.next
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
