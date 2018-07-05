function ListNode(str, step, minInd) {
  this.str = str
  this.step = step
  this.minInd = minInd
  this.next = null
}

const pack = str => {
  const xs = new Int8Array(str.length)
  for (let i = 0; i < str.length; ++i)
    xs[i] = str.codePointAt(i) - 97
  return xs
}

/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */
const kSimilarity = (srcInp, tgtInp) => {
  const src = pack(srcInp), tgt = pack(tgtInp)
  let vDiff = null
  let visited = new Set()
  let qHead = new ListNode(src, 0, 0)
  let qTail = qHead
  while (qHead !== null) {
    let {str, step, minInd} = qHead
    visited.add(str)
    const diffLocs = []
    for (let i = 0; i < src.length; ++i) {
      if (str[i] !== tgt[i])
        diffLocs.push(i)
    }
    if (diffLocs.length === 0)
      return step
    ++step
    // all locations that have difference
    if (vDiff === null) {
      vDiff = diffLocs.length
    } else if (vDiff > diffLocs.length) {
      vDiff = diffLocs.length
      visited = new Set()
    }
    while (diffLocs.length > 1 && diffLocs[0] < minInd)
      diffLocs.shift()

    for (let i = 0; i < diffLocs.length; ++i) {
      const lInd = diffLocs[i]
      for (let j = i+1; j < diffLocs.length; ++j) {
        const rInd = diffLocs[j]
        if (str[lInd] === str[rInd])
          continue

        // see if swapping diffLocs[i], diffLocs[j] can be any better
        if (
          str[rInd] === tgt[lInd] ||
          str[lInd] === tgt[rInd]
        ) {
          const newStr = Int8Array.from(str)
          newStr[lInd] = str[rInd]
          newStr[rInd] = str[lInd]
          if (!visited.has(newStr)) {
            qTail.next = new ListNode(newStr, step, lInd+1)
            qTail = qTail.next
          }
        }
      }
    }
    qHead = qHead.next
  }
}

console.assert(kSimilarity("abac", "baca") === 2)
console.assert(kSimilarity("a", "a") === 0)
console.log(kSimilarity("abccaacceecdeea","bcaacceeccdeaae"))
