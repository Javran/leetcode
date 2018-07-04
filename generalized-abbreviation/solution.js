const isDigitCode = code => code >= 48 && code <= 57

/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = word => {
  const gen = w => {
    if (w.length === 0)
      return ['']
    const ans = []
    ans.push(w)
    ans.push(String(w.length))
    for (let i = 1; i < w.length; ++i) {
      const l = w.substring(0,i)
      const r = w.substring(i)
      const ls = [l, String(l.length)]
      const rs = gen(r)
      for (let u = 0; u < ls.length; ++u)
        for (let v = 0; v < rs.length; ++v) {
          const x = ls[u], y = rs[v]
          if (
            x.length === 0 ||
            y.length === 0 ||
            !(isDigitCode(x.codePointAt(x.length-1)) && isDigitCode(y.codePointAt(0)))
          ) {
            const w2 = x + y
            if (w2 !== w)
              ans.push(w2)
          }
        }
    }
    return ans
  }

  return Array.from(new Set(gen(word)))
}

console.log(generateAbbreviations("word"))
console.log(generateAbbreviations("worfasdfd"))
