function ListNode(val) {
  this.val = val
  this.next = null
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const oddEvenList = head => {
  if (head === null || head.next === null)
    return head
  const p1 = head
  const p2 = head.next
  /*
     basic idea:

     - for every pointer p, we do p.next = p.next.next until the end.
     - now we should end up with two linked list: one with all odd elements and another
       all even.
     - to put these two linked list together, we need to keep an initial record by
       p1 = head, p2 = head.next at the very beginning.
     - to finish the link, we need to consider two cases:
       - when the # of elements is even, we need to link "next" of the second to last element to "p2"
       - otherwise, we need to link "next" of last element to "p2"
       - to keep track of this, we simply keep a flag (q1odd).

   */
  let q1 = head, q2 = head.next, q1odd = true
  while (true) {
    const tmp = q1.next
    q1.next = tmp.next
    if (q2.next === null) {
      if (q1odd) {
        q1.next = p2
      } else {
        q2.next = p2
      }
      break
    }
    q1 = tmp, q2 = tmp.next, q1odd = !q1odd
  }
  return head
}

const mkLink = xs => {
  const root = new ListNode('dummy')
  let prev = root
  for (let i = 0; i < xs.length; ++i) {
    const node = new ListNode(xs[i])
    prev.next = node
    prev = node
  }
  return root.next
}

const linkToStr = head => {
  if (head === null)
    return '-'
  return `${head.val} -> ${linkToStr(head.next)}`
}

console.log(linkToStr(oddEvenList(mkLink([1,2,3,4,5]))))
console.log(linkToStr(oddEvenList(mkLink([1,2,3,4]))))
console.log(linkToStr(oddEvenList(mkLink([1,2,3,4,5,6]))))
