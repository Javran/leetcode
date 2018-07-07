/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (sRaw, tRaw) => {
  if (tRaw.length === 0)
    return ""
  // tRaw should not be empty
  if (tRaw.length > sRaw.length)
    return ""
  // sRaw should at least have the same length as tRaw,
  // which implies that sRaw is non-empty

  /*
     idea: freq count with sliding window.

     window range: (startInd, endInd),
     in other words, element [startInd .. endInd-1].
     we fix endInd, and find the minimum window
     by moving startInd to its left.
     then we move endInd one step at a time until hitting the end.
   */
  const targetFC = new Uint16Array(128)
  for (let i = 0; i < tRaw.length; ++i) {
    ++targetFC[tRaw.codePointAt(i)]
  }
  const windowFC = new Uint16Array(128)
  let ans = ""
  let endInd = 0, startInd = 0
  const nextUnsatCode = initInd => {
    for (let i = initInd; i < 128; ++i) {
      /*
         it's unnecessary to check targetFC[i] === 0,
         but in case where target is "sparse", this could
         save us some time.
       */
      if (windowFC[i] < targetFC[i])
        return i
    }
    return -1
  }

  let unsatCode = nextUnsatCode(0)
  while (unsatCode !== -1 && endInd <= sRaw.length) {
    const code = sRaw.codePointAt(endInd)
    ++endInd
    ++windowFC[code]
    if (
      code === unsatCode &&
      targetFC[unsatCode] <= windowFC[unsatCode]
    ) {
      unsatCode = nextUnsatCode(unsatCode+1)
    }
  }
  if (unsatCode !== -1)
    return ""

  while (true) {
    // note that endInd can be optimal only when
    // it points to a character of interest, otherwise we don't need any checking
    if (targetFC[sRaw.codePointAt(endInd-1)] > 0) {
      // now sRaw.substring(startInd, endInd) contains all chars we want.
      // we want to shrink it by moving startInd
      while (startInd+1 < endInd) {
        const code = sRaw.codePointAt(startInd)
        if (
          windowFC[code] > targetFC[code]
        ) {
          --windowFC[code]
          ++startInd
        } else break
      }
      if (ans === "" || ans.length > endInd - startInd) {
        ans = sRaw.substring(startInd, endInd)
      }
    }
    if (endInd < sRaw.length) {
      ++windowFC[sRaw.codePointAt(endInd)]
      ++endInd
    } else break
  }
  return ans
}

console.assert(minWindow("ADOBECODEBANC", "ABC") === "BANC")
console.assert(minWindow("ab", "a") === "a")
