// intersect two sorted list, assuming every element is unique
// return null if the intersection is empty
const intersect = (xs, ys) => {
  if (xs === null || xs.length === 0)
    return null
  if (ys === null || ys.length === 0)
    return null
  const ret = []
  let i = 0, j = 0
  while (i < xs.length && j < ys.length) {
    if (xs[i] === ys[j]) {
      ret.push(xs[i])
      ++i, ++j
    } else if (xs[i] < ys[j]) {
      while (i < xs.length && xs[i] < ys[j])
        ++i
    } else {
      // xs[i] > ys[j]
      while (j < ys.length && xs[i] > ys[j])
        ++j
    }
  }
  return ret.length === 0 ? [] : ret
}

/**
 * @param {string[]} words
 * @return {string[][]}
 */
const wordSquares = words => {
  // we want elements to be inserted in sorted order
  // by doing so we can allow efficient "set intersection" on sorted arrays
  words.sort()
  const len = words[0].length
  // indDict[<ind>][<char>] = Array of words (sorted)
  const indDict = new Array(len)
  for (let i = 0; i < len; ++i) {
    indDict[i] = new Array(26).fill(null)
  }
  words.forEach(word => {
    for (let i = 0; i < word.length; ++i) {
      const chInd = word.codePointAt(i) - 97
      if (indDict[i][chInd] === null) {
        indDict[i][chInd] = [word]
      } else {
        indDict[i][chInd].push(word)
      }
    }
  })
  const ans = []
  const square = new Array(len).fill(null)
  const intersectWords = (xs, ys) => {
    if (xs === words)
      return ys
    if (ys === words)
      return xs
    return intersect(xs, ys)
  }

  const search = dep => {
    if (dep === len) {
      ans.push(square.slice())
      return
    }
    let searchSpace = words
    for (let i = 0; i < dep; ++i) {
      searchSpace =
        intersectWords(
          searchSpace,
          indDict[i][square[i].codePointAt(dep) - 97]
        )
    }
    if (searchSpace !== null && searchSpace.length > 0) {
      searchSpace.forEach(w => {
        square[dep] = w
        search(dep+1)
      })
    }
  }

  words.forEach(w => {
    square[0] = w
    // fill first word and continue search
    // we need to do this to start putting constraints
    // into the system to narrow down search space
    search(1)
  })

  return ans
}

console.log(wordSquares(["aa", "ab", "ba", "bb"]))
console.log(wordSquares(
  [
    "abcd", "befg", "cfhi", "dgij",
    "buvw", "cvxy", "dwyz",
  ]))
console.log(wordSquares(["area","lead","wall","lady","ball"]))
