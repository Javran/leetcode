const mkGuard = () => {
  const node = {}
  node.prev = node
  node.next = node
  return node
}

/**
 * @param {number} capacity
 */
const LFUCache = function(capacity) {
  this.size = 0
  this.capacity = capacity

  // for storing the actual <k,v> pair
  this.store = new Map()
  // every key will have a corresponding node for bookkeeping.
  this.keyToNode = new Map()
  // doubly linked list for storing freq buckets
  const freqGuard = mkGuard()
  freqGuard.freq = null
  /*
     freqList: doubly linked list

     - prev & next: standard
     - freq: int or null for the guard
     - container: another doubly linked list

   */
  this.freqList = freqGuard
}

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (this.capacity <= 0)
    return -1
  if (!this.store.has(key))
    return -1
  const ret = this.store.get(key)
  const node = this.keyToNode.get(key)
  node.prev.next = node.next
  node.next.prev = node.prev
  const nextFreq = node.freqNode.freq + 1
  let newFreqNode
  if (node.freqNode.next.freq !== nextFreq) {
    // need to create new freq node
    newFreqNode = {
      prev: node.freqNode,
      next: node.freqNode.next,
      freq: nextFreq,
      container: mkGuard(),
    }
    newFreqNode.prev.next = newFreqNode
    newFreqNode.next.prev = newFreqNode
  } else {
    // insert as last element
    newFreqNode = node.freqNode.next
  }
  // insert node into container
  node.prev = newFreqNode.container.prev
  node.next = newFreqNode.container
  node.prev.next = node
  node.next.prev = node
  node.freqNode = newFreqNode
  return ret
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.capacity <= 0)
    return
  // delete old value (if any)
  if (this.store.has(key)) {
    this.store.delete(key)
    const node = this.keyToNode.get(key)
    node.prev.next = node.next
    node.next.prev = node.prev
    this.keyToNode.delete(key)
    --this.size
  }

  if (this.size === this.capacity) {
    // evict
    // remove list nodes of empty container
    while (
      this.freqList.next !== this.freqList &&
      this.freqList.next.container.next === this.freqList.next.container
    ) {
      const tmp = this.freqList.next
      tmp.prev.next = tmp.next
      tmp.next.prev = tmp.prev
    }
    const oldNode = this.freqList.next.container.next
    const oldKey = oldNode.key
    console.log(`evict ${oldKey}`)
    this.store.delete(oldKey)
    this.keyToNode.delete(oldKey)
    oldNode.prev.next = oldNode.next
    oldNode.next.prev = oldNode.prev
    --this.size
  }

  // insert new value
  const node = {prev: null, next: null, freqNode: null, key}
  this.store.set(key, value)
  this.keyToNode.set(key, node)
  ++this.size
  let newFreqNode
  if (this.freqList.next.freq !== 1) {
    // need to create new freq node
    newFreqNode = {
      prev: this.freqList,
      next: this.freqList.next,
      freq: 1,
      container: mkGuard(),
    }
    newFreqNode.prev.next = newFreqNode
    newFreqNode.next.prev = newFreqNode
  } else {
    newFreqNode = this.freqList.next
  }
  // insert node into container
  node.prev = newFreqNode.container.prev
  node.next = newFreqNode.container
  node.prev.next = node
  node.next.prev = node
  node.freqNode = newFreqNode
}

LFUCache.prototype.debug = function() {
  console.log(`size: ${this.size}`)
  console.log(`keys: ${[...this.store.keys()]}`)
  const guard = this.freqList
  for (let cur = guard.next; cur !== guard; cur = cur.next) {
    console.log(`  freq: ${cur.freq}`)
    const guard1 = cur.container
    for (let cur1 = guard1.next; cur1 !== guard1; cur1 = cur1.next) {
      console.log(`    key: ${cur1.key}`)
    }
  }

}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = Object.create(LFUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
const s = new LFUCache(2)
console.log(s.put(1,1))
console.log(s.put(2,2))
console.log(s.get(1))
console.log(s.put(3,3))
console.log(s.get(2))
console.log(s.get(3))
console.log(s.put(4,4))
console.log(s.get(1))
console.log(s.get(3))
console.log(s.get(4))
