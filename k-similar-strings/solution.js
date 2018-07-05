function ListNode(str, step, minInd) {
  this.str = str
  this.step = step
  this.minInd = minInd
  this.next = null
}

/**
 * @param {string} A
 * @param {string} B
 * @return {number}
 */
const kSimilarity = (src, tgt) => {
  let qHead = new ListNode(src, 0, 0)
  let qTail = qHead
  let vDiff = null
  let visited = new Set()
  visited.add(src)
  while (qHead !== null) {
    let {str, step, minInd} = qHead
    const diffLocs = []
    for (let i = 0; i < src.length; ++i) {
      if (str[i] !== tgt[i])
        diffLocs.push(i)
    }
    if (diffLocs.length === 0)
      return step
    // all locations that have difference
    if (vDiff === null) {
      vDiff = diffLocs.length
    } else if (vDiff > diffLocs.length) {
      vDiff = diffLocs.length
      visited = new Set()
    }
    ++step
    let i = 0
    while (i < diffLocs.length && diffLocs[i] < minInd)
      ++i
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
        let newStr =
          [
            str.substring(0, lInd),
            str[rInd],
            str.substring(lInd+1, rInd),
            str[lInd],
            str.substring(rInd+1)
          ].join('')
        if (!visited.has(newStr)) {
          qTail.next = new ListNode(newStr, step, lInd+1)
          qTail = qTail.next
          visited.add(newStr)
        }
      }
    }
    qHead = qHead.next
  }
}

const test = (a,b,c=null) => {
  console.time(`test ${a} ${b}`)
  const result = kSimilarity(a,b)
  console.timeEnd(`test ${a} ${b}`)
  console.log(result)
  if (c !== null) {
    console.assert(kSimilarity(a,b) === c)
  }

}

test("abac", "baca", 2)
test("a", "a", 0)
test("abccaacceecdeea","bcaacceeccdeaae", 9)
test("cdebcdeadedaaaebfbcf","baaddacfedebefdabecc", 12)
test("abcdefabcdefabcdef", "fcacdfaaebebdfbedc", 9)
