/*
   idea:

   - freq increases by 1 each time, which suggests that
     if we put key into buckets by freq, then we can use a doubly linked
     list to efficiently
     - access least used item
     - do freq + 1 to any key and maintain the structure

   - ideally we would like all buckets to be non-empty,
     but we can also do lasy-deletion: we remove values only when
     we are required to evict a value, this simplifies the impl and give us
     amortized time complexity of O(1) - all we do is simply delaying the deletion until needed.

  - also since for every bucket we need to remove least recently used one,
     this justifies a FIFO structure that also requires removing arbitrary element in the middle of it,
     and another doubly linked list for our bucket representation is sufficient to solve the problem

 */

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
    /*
       note: it makes no sense to me why
       setting another value to an existing key
       preserves the previous frequency,
       but since the expected answer can only be explained by taking
       this weird behavior into account.
     */
    this.store.set(key,value)
    this.get(key)
    return
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

const {genInt} = require('leetcode-zwischenzug')

const genTest = () => {
  const cmds = ["LFUCache"]
  const args = [[3]]
  const genKey = () => genInt(0,5)
  const genVal = () => genInt(0,65535)
  for (let i = 0; i < 10; ++i) {
    const which = genInt(0,9)
    if (which <= 4) {
      cmds.push("get")
      args.push([genKey()])
    } else {
      cmds.push("put")
      args.push([genKey(), genVal()])
    }
  }
  console.log(JSON.stringify(cmds))
  console.log(JSON.stringify(args))
}

// genTest()

// TODO: zwischenzug

const assert = require('assert')

const testImpl =
  (mkFunc, assertEqual = assert.deepStrictEqual) => (cmds, argLists) => expected => {
  const fName = mkFunc.name
  let obj = null
  const ans = []

  console.time(fName)
  for (let i = 0; i < cmds.length; ++i) {
    const cmd = cmds[i]
    if (cmd === fName) {
      obj = new mkFunc(...argLists[i])
      ans.push(null)
    } else {
      const ret = obj[cmd].apply(obj, [...argLists[i]])
      ans.push(ret || null)
    }
  }
  console.timeEnd(fName)
  if (typeof expected !== 'undefined') {
    try {
      assertEqual(ans, expected)
    } catch (e) {
      console.error(`[FAILED]`)
      console.error('expected:')
      console.error(JSON.stringify(expected))
      console.error('actual:')
      console.error(JSON.stringify(ans))
      if (assertEqual !== assert.deepStrictEqual) {
        console.error(`error:`)
        console.error(e)
      }
    }
  } else {
    console.log(`Result:`)
    console.log(JSON.stringify(ans))
  }
}

const f = testImpl(LFUCache)

f(
  ["LFUCache","put","put","get","get","get","put","get","get","put","get","put","get","get","put","get","get"],
  [[3],[5,23],[4,54],[4],[4],[5],[5,60],[3],[4],[3,12],[2],[2,22],[3],[4],[3,37],[2],[3]]
)(
  [null,null,null,54,54,23,null,-1,54,null,-1,null,-1,54,null,-1,37]
)

f(
  ["LFUCache","get","get","get","get","get","put","get","get","get","get","put","put","get","get","get","get","get","get","get","get","get","get","get","put","get","get","get","get","get","put","get","get","get","get","put","get","get","get","put","put","put","get","get","put","get","get","get","get","get","get","put","get","put","get","put","get","get","put","get","get","get","get","put","get","put","get","get","get","put","get","get","put","put","get","get","put","get","put","get","get","get","get","get","get","put","get","get","get","get","get","get","get","get","get","get","put","get","put","get","get"],
  [[3],[1],[7],[2],[1],[3],[0,56481],[3],[10],[10],[6],[8,60824],[1,62140],[10],[1],[5],[3],[2],[1],[8],[8],[10],[0],[2],[7,34034],[1],[5],[9],[0],[7],[4,24837],[1],[8],[8],[1],[3,25179],[2],[9],[1],[7,1581],[6,15872],[1,22631],[1],[1],[10,31762],[0],[1],[5],[1],[9],[8],[1,3948],[8],[1,52691],[5],[6,33822],[10],[7],[1,41819],[6],[3],[2],[1],[5,64540],[10],[2,62287],[1],[0],[10],[5,62881],[0],[9],[10,52551],[10,60057],[9],[3],[5,41100],[4],[10,58506],[10],[9],[6],[3],[6],[6],[1,28879],[10],[5],[9],[8],[2],[7],[4],[7],[6],[3],[8,58986],[10],[4,11287],[2],[1]]
)(
  [null,-1,-1,-1,-1,-1,null,-1,-1,-1,-1,null,null,-1,62140,-1,-1,-1,62140,60824,60824,-1,56481,-1,null,62140,-1,-1,-1,34034,null,62140,60824,60824,62140,null,-1,-1,62140,null,null,null,22631,22631,null,-1,22631,-1,22631,-1,60824,null,60824,null,-1,null,-1,-1,null,33822,-1,-1,41819,null,-1,null,41819,-1,-1,null,-1,-1,null,null,-1,-1,null,-1,null,58506,-1,-1,-1,-1,-1,null,58506,-1,-1,60824,-1,-1,-1,-1,-1,-1,null,58506,null,-1,28879]
)
