function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = lists => {
  // maintaining a min-heap should be good enough
  const root = new ListNode(null)
  let cur = root
  const newVal = val => {
    const newNode = new ListNode(val)
    cur.next = newNode
    cur = newNode
  }

  const xs = lists.filter(x => x !== null)
  let hpSize = xs.length
  const downHeap = i => {
    const lChild = i*2 + 1
    const rChild = i*2 + 2
    let prefer = i
    if (lChild < hpSize && xs[lChild].val < xs[prefer].val)
      prefer = lChild
    if (rChild < hpSize && xs[rChild].val < xs[prefer].val)
      prefer = rChild
    if (prefer !== i) {
      const tmp = xs[i]
      xs[i] = xs[prefer]
      xs[prefer] = tmp
      downHeap(prefer)
    }
  }

  const extractMin = () => {
    // assume hpSize > 0
    const ret = xs[0]
    xs[0] = xs[hpSize-1]
    --hpSize
    downHeap(0)
    return ret
  }

  const upHeap = i => {
    if (i === 0)
      return
    const parent = (i-1) >> 1
    if (xs[parent].val > xs[i].val) {
      const tmp = xs[parent]
      xs[parent] = xs[i]
      xs[i] = tmp
      upHeap(parent)
    }
  }

  const heapInsert = node => {
    xs[hpSize] = node
    ++hpSize
    upHeap(hpSize-1)
  }

  // creating heap
  for (
    let i = (xs.length-1) >> 1;
    i >= 0;
    --i) {
    downHeap(i)
  }

  while (hpSize > 0) {
    const x = extractMin()
    newVal(x.val)
    if (x.next !== null)
      heapInsert(x.next)
  }

  return root.next
}

const mkList = xs => {
  const root = new ListNode(null)
  let cur = root
  for (let i = 0; i < xs.length; ++i) {
    const newNode = new ListNode(xs[i])
    cur.next = newNode
    cur = newNode
  }
  return root.next
}

const pprList = l => {
  if (l === null)
    return '<empty>'
  const xs = []
  for (
    let cur = l;
    cur !== null;
    cur = cur.next
  ) {
    xs.push(cur.val)
  }
  return xs.join(' -> ')
}

console.log(
  pprList(
  mergeKLists(
    [
      mkList([10,20,30,40]),
      mkList([1,3,5,7,9]),
      mkList([2,4,50,52]),
      mkList([6]),
      mkList([8]),
    ]
  )
  )
)
