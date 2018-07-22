function DXLink(val) {
  this.val = val
  this.prev = null
  this.next = null
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = nums => {
  /*
     idea: well, just want to give dancing links a shot.
   */
  const header = new DXLink(null)
  header.prev = header
  header.next = header
  nums.forEach(n => {
    const node = new DXLink(n)
    node.next = header
    node.prev = header.prev
    header.prev.next = node
    header.prev = node
  })
  const ans = []
  const newAns = () => {
    const xs = []
    for (let cur = header.next; cur !== header; cur = cur.next)
      xs.push(cur.val)
    ans.push(xs)
  }

  const go = cur => {
    if (cur === header) {
      newAns()
      return
    }
    cur.next.prev = cur.prev
    cur.prev.next = cur.next
    go(cur.next)
    cur.next.prev = cur
    cur.prev.next = cur
    go(cur.next)
  }
  go(header.next)
  return ans
}

console.log(subsets([1,2,3,4,5]))
