/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = (xs, ys) => {
  if (xs === ys)
    return true
  if (xs.length !== ys.length)
    return false

  const isScrambleAux = (xL, xR, yL, yR) => {
    if (xs.substring(xL, xR+1) === ys.substring(yL, yR+1))
      return true
    // console.log('cur', xs.substring(xL,xR+1), ys.substring(yL, yR+1))
    const sz = xR - xL + 1
    const freqs = new Int8Array(26)
    for (let i = 0; i < sz; ++i) {
      ++freqs[xs.codePointAt(xL+i) - 97]
      --freqs[ys.codePointAt(yL+i) - 97]
    }
    if (freqs.some(x => x !== 0))
      return false

    // 2 cases:
    for (let i = xL; i < xR; ++i) {
      // NOTE: note that xL - xR = yL - yR for any valid bounds
      // the following indices might be scary but they are quite easy to derive
      // using this invariant.

      // separate into non-empty chunks of same size
      // (1) cut in the same position
      if (
        // xL - i = yL - j, derive j
        isScrambleAux(xL,i,yL, yL+i-xL) &&
        // (i+1) - xR = j - yR, derive j
        isScrambleAux(i+1,xR,yR-xR+(i+1),yR)
      )
        return true
      // (2) cut in the opposite position
      // in other words the case in which two children have swapped
      if (
        // xL - i = j - yR, derive j
        isScrambleAux(xL,i,xL-i+yR,yR) &&
        // (i+1) - xR = yL - j, derive j
        isScrambleAux(i+1,xR,yL,xR-(i+1)+yL)
      )
        return true
    }
    return false
  }

  return isScrambleAux(0,xs.length-1,0,ys.length-1)
}

console.log(isScramble("great", "rgtae"))
