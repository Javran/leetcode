/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number[]} G
 * @return {number}
 */
const numComponents = (head, G) => {
  // marking all values that we are watching.
  const wanted = new Int8Array(10000)
  G.forEach(v => { wanted[v] = 1 })
  let ans = 0
  let connected = false
  // the idea is to traverse the list,
  // recognizing and expand groups.
  // when the current value is not in G,
  // the current group must end.
  for (let cur = head; cur; cur = cur.next) {
    if (wanted[cur.val]) {
      connected = true
    } else {
      // break connection
      if (connected) {
        ++ans, connected = false
      }
    }
  }
  // to get the last group right
  if (connected) {
    ++ans, connected = false
  }
  return ans
}
