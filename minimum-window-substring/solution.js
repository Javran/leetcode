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

  const targetFC = new Uint16Array(128)
  for (let i = 0; i < tRaw.length; ++i) {
    ++targetFC[tRaw.codePointAt(i)]
  }
  const windowFC = new Uint16Array(128)
  let ans = ""
  let endInd = 0, startInd = 0
  const nextUnsatCode = initInd => {
    for (let i = initInd; i < 128; ++i) {
      if (targetFC[i] !== 0 && windowFC[i] < targetFC[i])
        return i
    }
    return -1
  }
  while (endInd <= sRaw.length) {
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
    if (endInd > sRaw.length)
      break
    // now sRaw.substring(startInd, endInd) contains all chars we want.
    // we want to shrink it by moving startInd
    while (startInd+1 < endInd) {
      const code = sRaw.codePointAt(startInd)
      if (
        targetFC[code] === 0 ||
        windowFC[code] > targetFC[code]
      ) {
        --windowFC[code]
        ++startInd
      } else break
    }
    if (ans === "" || ans.length > endInd - startInd) {
      ans = sRaw.substring(startInd, endInd)
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
