function BinHeap(lessThan) {
  this.size = 0
  this.container = []
  this.lessThan = lessThan
}

const siftUp = pq => ind => {
  const {container, lessThan} = pq
  while (ind !== 0) {
    const parentInd = (ind - 1) >> 1
    if (lessThan(container[ind], container[parentInd])) {
      const tmp = container[parentInd]
      container[parentInd] = container[ind]
      container[ind] = tmp
      ind = parentInd
    } else {
      break
    }
  }
}

const siftDown = pq => ind => {
  const {size, container, lessThan} = pq
  while (true) {
    const lcInd = ind*2+1
    const rcInd = ind*2+2
    if (lcInd >= size)
      break
    let preferInd = ind
    if (
      !(lessThan(container[preferInd], container[lcInd]))
    )
      preferInd = lcInd
    if (
      rcInd < size &&
      !(lessThan(container[preferInd], container[rcInd]))
    )
      preferInd = rcInd

    if (preferInd !== ind) {
      const tmp = container[preferInd]
      container[preferInd] = container[ind]
      container[ind] = tmp
      ind = preferInd
    } else {
      break
    }
  }
}

BinHeap.prototype.insert = function(e) {
  const eInd = this.size
  this.container[this.size] = e
  ++this.size
  siftUp(this)(eInd)
}

BinHeap.prototype.extractMin = function() {
  if (this.size === 0)
    return null
  const ret = this.container[0]
  this.container[0] = this.container[this.size-1]
  --this.size
  siftDown(this)(0)
  return ret
}

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = (words, k) => {
  /*
     idea: freq count first, then we can heapify
     the result pairs to establish a heap in O(n),
     for first k elements, just extract from heap,
     which results in O(k*lg(n)) complexity.
     not sure about the "O(n*lg(k))" as mentioned in the problem though.
   */
  const freqs = new Map()
  words.forEach(w => {
    if (freqs.has(w)) {
      freqs.set(w, freqs.get(w) + 1)
    } else {
      freqs.set(w, 1)
    }
  })
  const lessThan = (u,v) => {
    if (v.freq !== u.freq) {
      // high freq first
      return v.freq < u.freq
    }
    return u.word < v.word
  }
  const heap = new BinHeap(lessThan)
  const xs = [...freqs].map(([word,freq]) => ({word, freq}))
  heap.size = xs.length
  heap.container = xs
  // O(n) heapify
  for (let i = (xs.length - 2) >> 1; i >= 0; --i)
    siftDown(heap)(i)
  const ans = new Array(k)
  for (let i = 0; i < k; ++i)
    ans[i] = heap.extractMin().word
  return ans
}

const {consoleTest, genInt, genList} = require('leetcode-zwischenzug')
const f = consoleTest(topKFrequent)
f(["plpaboutit","jnoqzdute","sfvkdqf","mjc","nkpllqzjzp","foqqenbey","ssnanizsav","nkpllqzjzp","sfvkdqf","isnjmy","pnqsz","hhqpvvt","fvvdtpnzx","jkqonvenhx","cyxwlef","hhqpvvt","fvvdtpnzx","plpaboutit","sfvkdqf","mjc","fvvdtpnzx","bwumsj","foqqenbey","isnjmy","nkpllqzjzp","hhqpvvt","foqqenbey","fvvdtpnzx","bwumsj","hhqpvvt","fvvdtpnzx","jkqonvenhx","jnoqzdute","foqqenbey","jnoqzdute","foqqenbey","hhqpvvt","ssnanizsav","mjc","foqqenbey","bwumsj","ssnanizsav","fvvdtpnzx","nkpllqzjzp","jkqonvenhx","hhqpvvt","mjc","isnjmy","bwumsj","pnqsz","hhqpvvt","nkpllqzjzp","jnoqzdute","pnqsz","nkpllqzjzp","jnoqzdute","foqqenbey","nkpllqzjzp","hhqpvvt","fvvdtpnzx","plpaboutit","jnoqzdute","sfvkdqf","fvvdtpnzx","jkqonvenhx","jnoqzdute","nkpllqzjzp","jnoqzdute","fvvdtpnzx","jkqonvenhx","hhqpvvt","isnjmy","jkqonvenhx","ssnanizsav","jnoqzdute","jkqonvenhx","fvvdtpnzx","hhqpvvt","bwumsj","nkpllqzjzp","bwumsj","jkqonvenhx","jnoqzdute","pnqsz","foqqenbey","sfvkdqf","sfvkdqf"],1)(["fvvdtpnzx"])
f(["i", "love", "leetcode", "i", "love", "coding"], 2)(["i", "love"])
f(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)(["the", "is", "sunny", "day"])
f(["aaa","aa","a"], 1)(["a"])
