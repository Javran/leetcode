function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  /*
     idea: before doing addition, we need to ensure that digits are aligned,
     to do so, we pad 0s as most significant digits to the shorter of the two
     (if they are of different size)
     then we just perform addition as usual: a sum and a carry.
   */
  for (
    let cur1 = l1, cur2 = l2;
    cur1 !== null || cur2 !== null;
    /* NOOP */
  ) {
    if (cur1 && cur2) {
      cur1 = cur1.next
      cur2 = cur2.next
      continue
    }
    // or one of them is null, pad 0 in front
    if (cur1 === null) {
      const new1 = new ListNode(0)
      new1.next = l1
      l1 = new1
      cur2 = cur2.next
    } else {
      const new2 = new ListNode(0)
      new2.next = l2
      l2 = new2
      cur1 = cur1.next
    }
  }
  // now l1 and l2 should be aligned
  const st = []
  let ans = null
  for (
    let cur1 = l1, cur2 = l2;
    cur1 !== null;
    cur1 = cur1.next, cur2 = cur2.next
  ) {
    st.push([cur1, cur2])
  }
  let carry = 0
  while (st.length) {
    const [l,r] = st.pop()
    let sum = l.val + r.val + carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    const n = new ListNode(sum)
    n.next = ans
    ans = n
  }
  if (carry) {
    const n = new ListNode(1)
    n.next = ans
    ans = n
  }
  return ans
}

const {consoleTest, mkListNode, listNodeToArray} = require('leetcode-zwischenzug')
const f = consoleTest((xs, ys) => listNodeToArray(addTwoNumbers(mkListNode(xs), mkListNode(ys))))
f([9,9,9,9], [1])([1,0,0,0,0])
