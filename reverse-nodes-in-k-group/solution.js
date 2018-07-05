const toStr = (head, endPtr) => {
  if (head) {
    const ret = []
    while (head !== null && head !== endPtr) {
      ret.push(head.val)
      head = head.next
    }
    return ret.join("->")
  } else {
    return "-"
  }
}

const reverseGroup = (beginPrev, endNext) => {
  // console.log('bf', toStr(beginPrev.next, endNext))
  let prev = beginPrev, cur = prev.next, tmp
  while (cur !== endNext) {
    tmp = cur.next
    cur.next = prev
    prev = cur
    cur = tmp
  }
  beginPrev.next.next = endNext
  beginPrev.next = prev
  // console.log('af', toStr(beginPrev.next, tmp))
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = (head, k) => {
  if (k === 1)
    // nothing to do when a group is just an element
    return head
  const dummy = {next: head}
  // prev: a structure whose next points to the beginning of cur group
  // count: how many elements are currently in group
  let prev = dummy, count = 0
  for (cur = head; cur !== null; cur = cur.next) {
    ++count
    if (count === k) {
      // trigger group reverse only when we can just form a group
      // after the reverse, first element becomes last
      const newCur = prev.next
      const next = cur.next
      reverseGroup(prev, cur.next)
      prev = newCur
      // cur will move to intended position after entering next loop
      cur = newCur
      count = 0
    }
  }
  return dummy.next
}
