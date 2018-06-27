function RandomListNode(label) {
  this.label = label
  this.next = this.random = null
}

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
const copyRandomList = srcHead => {
  if (srcHead === null)
    return null

  const dummy = {next: null}
  const newNodesMap = new Map()
  // first pass, shallow copy.
  for (
    let dstPrev = dummy, src = srcHead;
    src !== null;
    dstPrev = dstPrev.next, src = src.next
  ) {
    const node = new RandomListNode(src.label)
    newNodesMap.set(src, node)
    node.random = src.random
    dstPrev.next = node
  }

  // second pass, re-wiring random pointers to copied ones
  for (let cur = dummy.next; cur; cur = cur.next) {
    if (cur.random) {
      cur.random = newNodesMap.get(cur.random)
    }
  }

  return dummy.next
}

const test = () => {
  const pprList = head => {
    if (head === null)
      return "<nil>"
    const xs = []
    while (head) {
      let link
      if (head.random) {
        link = String(head.random.label)
      } else {
        link = '-'
      }
      xs.push(`${head.label} (${link})`)
      head = head.next
    }
    return xs.join(" -> ")
  }
  const xs = [1,2,3,4,5,6]
  const nodes = []
  let head
  {
    const dummy = {next: null}
    let cur = dummy
    xs.forEach(x => {
      const node = new RandomListNode(x)
      cur.next = node
      nodes.push(node)
      cur = cur.next
    })
    head = dummy.next
  }
  {
    for (let cur = head; cur; cur = cur.next) {
      if (Math.random() <= 0.2) {
        cur.random = null
      } else {
        cur.random = nodes[Math.floor(Math.random() * xs.length)]
      }
    }
  }
  const copied = copyRandomList(head)
  console.log(pprList(head))
  console.log(pprList(copied))
}

test()
