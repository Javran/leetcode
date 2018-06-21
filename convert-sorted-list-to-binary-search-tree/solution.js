function ListNode(val) {
  this.val = val
  this.next = null
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/* try splitting the linked list into 3 parts
   where:
   - mid === null iff. head is null
   - size of left - size of right = 1 or 0 (left-biased)
 */
const splitList = head => {
  if (!head)
    return {left: null, mid: null, right: null}
  if (head.next === null)
    return {left: null, mid: head, right: null}

  const dummy = {next: head}
  // one slow one fast to find the middle point of the linked list
  let slow = dummy, fast = dummy
  while (fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
  }
  const mid = slow.next
  const right = mid.next
  slow.next = null
  mid.next = null
  return {left: head, mid, right}
}

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
const sortedListToBST = head => {
  if (!head)
    return null
  const {left, mid, right} = splitList(head)
  const root = new TreeNode(mid.val)
  root.left = sortedListToBST(left)
  root.right = sortedListToBST(right)
  return root
}

const mkList = xs => {
  const dummy = {next: null}
  let cur = dummy
  xs.forEach(x => {
    const node = new ListNode(x)
    cur.next = node
    cur = node
  })
  return dummy.next
}

const pprList = head => {
  if (head === null)
    return "<null>"
  const ys = []
  for (let cur = head; cur; cur = cur.next)
    ys.push(cur.val)
  return ys.join("->")
}

const xs = mkList([1,2,3,4,5,6,7])
const {left, mid, right} = splitList(xs)

console.log(pprList(left))
console.log(pprList(mid))
console.log(pprList(right))
