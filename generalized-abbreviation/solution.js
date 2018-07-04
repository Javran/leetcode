const isDigitCode = code => code >= 48 && code <= 57

/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = word => {
  // not in the way of fast, but it works
  const gen = w => {
    if (w.length === 0)
      return ['']
    const ans = [w, String(w.length)]
    for (let i = 1; i < w.length; ++i) {
      const l = w.substring(0,i)
      const r = w.substring(i)
      // don't do recursive call, or we end up with more duplicates
      const ls = [l, String(l.length)]
      const rs = gen(r)
      for (let u = 0; u < ls.length; ++u)
        for (let v = 0; v < rs.length; ++v) {
          if (u === 0 && v === 0)
            continue
          const x = ls[u], y = rs[v]
          // note that since we are cutting in the middle
          // it is guaranteed that both x and y won't be 0
          if (
            !(
              // it's fine to merge when we don't have facing digits
              isDigitCode(x.codePointAt(x.length-1)) &&
              isDigitCode(y.codePointAt(0))
            )
          ) {
              ans.push(x+y)
          }
        }
    }
    return ans
  }

  return Array.from(new Set(gen(word)))
}

console.log(generateAbbreviations("word"))
console.log(generateAbbreviations("worfasdfd"))
