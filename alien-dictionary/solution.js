function LNode(key) {
  this.key = key
  this.children = null
  this.next = null
}

function TrieLike() {
  this.head = new LNode(null)
  // keeping a list of chars.
  this.tail = this.head
}

/**
 * @param {string[]} words
 * @return {string}
 */
const alienOrder = words => {
  /*
     idea:

     - do a trie-like structure, which allows us to figure out ordering of characters
       (this is because all words are inserted in their sorted order)
     - if we keep track of all ordering clues, we can toposort this,
       which gives us a potentially partial ordering.
     - if toposort detects a loop, there is no way this could be solved, return ""
     - otherwise put all other characters into the answer (as we need a full list of
       all chars that have appeared.
   */

  // graph[i][j] !== 0 implies edge i ==> j
  const graph = new Array(26)
  // for recording indegree
  const inDeg = new Int8Array(26)
  const allCodes = new Set()
  const mkEdge = (x,y) => {
    if (!(x in graph))
      graph[x] = new Int8Array(26)
    if (!graph[x][y]) {
      graph[x][y] = 1
      ++inDeg[y]
    }
  }

  const tRoot = new TrieLike()
  const trieInsert = (w, i, tCur) => {
    if (i >= w.length)
      return
    const keyCode = w.codePointAt(i) - 97
    allCodes.add(keyCode)
    if (tCur.tail.key !== keyCode) {
      const newNode = new LNode(keyCode)
      if (tCur.tail.key !== null)
        mkEdge(tCur.tail.key, keyCode)
      tCur.tail.next = newNode
      tCur.tail = newNode
      if (i !== w.length-1) {
        newNode.children = new TrieLike()
        trieInsert(w, i+1, newNode.children)
      }
    } else {
      if (tCur.tail.children === null) {
        tCur.tail.children = new TrieLike()
      }
      trieInsert(w, i+1, tCur.tail.children)
    }
  }
  words.forEach(w => trieInsert(w, 0, tRoot))
  const queue = []
  allCodes.forEach(code => {
    if (inDeg[code] === 0)
      queue.push(code)
  })
  qHead = 0
  const ans = []
  while (qHead < queue.length) {
    const code = queue[qHead]
    ans.push(code)
    ++qHead
    for (let i = 0; i < 26; ++i)
      if (graph[code] && graph[code][i]) {
        --inDeg[i]
        if (inDeg[i] === 0)
          queue.push(i)
      }
  }
  if (inDeg.some(x => x > 0)) {
    // circular graph
    return ""
  }
  // move indecisive codes into answer
  allCodes.forEach(code => {
    if (ans.indexOf(code) === -1)
      ans.push(code)
  })

  return String.fromCodePoint.apply(
    null,
    ans.map(x => x + 97)
  )
}

console.assert(
  alienOrder(
    [
      "wrt",
      "wrf",
      "er",
      "ett",
      "rftt"
    ]
  ) === "wertf"
)
console.log(alienOrder(["z", "x"]))
console.log(alienOrder(["z", "x", "z"]))
console.log(alienOrder(["a", "b", "a"]))
