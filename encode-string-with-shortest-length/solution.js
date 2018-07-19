const encodeRep = s => {
  // see: https://leetcode.com/problems/repeated-substring-pattern/description/
  const ind = (s + s).substr(1, s.length*2-2).indexOf(s)
  if (ind === -1)
    return s
  const cLen = ind+1
  const ret = `${s.length/cLen}[${s.substr(0,cLen)}]`
  return ret.length < s.length ? ret : s
}

/**
 * @param {string} s
 * @return {string}
 */
const encode = s => {
  // since we know encoding is always of form "?[?]",
  // any string whose length is less than 4 does not need any encoding.
  if (s.length <= 4)
    return s

  const N = s.length
  const enc = new Array(N)
  for (let i = 0; i < N; ++i)
    enc[i] = new Array(N)

  for (let l = 1; l <= 4; ++l) {
    for (let i = 0, j = i+l-1; j < N; ++i, ++j) {
      enc[i][j] = s.substring(i,j+1)
    }
  }

  for (let l = 5; l <= N; ++l) {
    for (let i = 0, j = i+l-1; j < N; ++i, ++j) {
      // either encode current partial string
      let minEnc = encodeRep(s.substring(i,j+1))
      for (let k = i; k < j; ++k) {
        // or break it into two parts and combine
        const l = enc[i][k]
        const r = enc[k+1][j]
        const lrEnc = encodeRep(l+r)
        if (lrEnc.length < minEnc.length)
          minEnc = lrEnc
      }
      enc[i][j] = minEnc
    }
  }
  return enc[0][N-1]
}

console.assert(encodeRep("abababab") === "4[ab]")
console.assert(encodeRep("aaaaa") === "5[a]")

console.log(encode("aabcaabcd"))
console.log(encode("abbbabbbcabbbabbbc"))
