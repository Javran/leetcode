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
    return head
  const dummy = {next: head}
  let prev = dummy, count = 0
  for (cur = prev.next; cur !== null; cur = cur.next) {
    ++count
    if (count === k) {
      const newCur = prev.next
      const next = cur.next
      reverseGroup(prev, cur.next)
      prev = newCur
      cur = {next}
      count = 0
    }
  }
  return dummy.next
}
