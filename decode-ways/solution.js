/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = sRaw => {
  const s = sRaw.split('').map(x => parseInt(x, 10))
  if (s.some(x => isNaN(x)))
    // no way of decoding invalid strings
    return 0

  /*
     dynamic programming should be sufficient.
     let f[i] be the # of ways of decoding from s[0..i-1].
     then what we want is f[n] where n = s.length

     - f[0] = 1
     - f[i] = f1 + f2 where
       f1 = f[i-1] (if s[i-1] = 1..9)
          = 0      (otherwise)
       f2 = f[i-2] (if "s[i-2]s[i-1]" is in "10", "11", "12", ..., "26")
          = 0      (otherwise)

     note: be careful about conditions, it's another problem
     that does nothing but try to screw you over.
  */
  const f = new Array(s.length+1)
  f[0] = 1
  for (let i = 1; i <= s.length; ++i) {
    let f1 = 0
    let f2 = 0
    if (s[i-1] >= 1 && s[i-1] <= 9) {
      f1 = f[i-1]
    }
    if (/* this must be true: s[i-1] >= 0 && s[i-1] <= 9 */
        i-2 >= 0 && s[i-2] >= 1 && s[i-2] <= 2
    ) {
      const next = s[i-2]*10 + s[i-1]
      if (next >= 10 && next <= 26)
        f2 = f[i-2]
    }
    f[i] = f1 + f2
  }
  return f[s.length]
}

console.log(numDecodings("226") === 3)
console.log(numDecodings("27") === 1)
console.log(numDecodings("0026") === 0)
console.log(numDecodings("1026") === 2)
console.log(numDecodings("22612"))
