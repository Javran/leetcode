/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = (xs, ys) => {
  if (xs === ys)
    return true
  if (xs.length !== ys.length)
    return false

  const isScrambleAux = xL => xR => yL => yR => {
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

      for (let i = xL; i < xR; ++i) {
        /*
        console.log(
          'brk x:',
          xs.substring(xL,i+1) + ' | ' +
          xs.substring(i+1,xR+1)
        )
        console.log(
          'brk y:',
          ys.substring(yL,yL+i-xL+1) + ' | ' +
          ys.substring(yR-xR+(i+1),yR+1)
        )
        */
        if (
          isScrambleAux(xL)(i)(yL)(yL+i-xL) &&
          isScrambleAux(i+1)(xR)(yR-xR+(i+1))(yR)
        )
          return true
        /*
        console.log(
          'brk x:',
          xs.substring(xL,i+1) + ' | ' +
          xs.substring(i+1,xR+1)
        )
        console.log(
          'brk y:',
          ys.substring(xL-i+yR,yR+1) + ' | ' +
          ys.substring(yL,xR-(i+1)+yL+1)
        )
        */
        if (
          isScrambleAux(xL)(i)(xL-i+yR)(yR) &&
          isScrambleAux(i+1)(xR)(yL)(xR-(i+1)+yL)
        )
          return true
      }
      return false
    }

  return isScrambleAux(0)(xs.length-1)(0)(ys.length-1)
}

console.log(isScramble("great", "rgtae"))
