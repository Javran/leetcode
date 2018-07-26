const codeA = 'a'.codePointAt(0)
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
const wordPatternMatch = (pRaw, str) => {
  if (pRaw.length === 0)
    return str.length === 0
  if (pRaw.length === 1)
    return str.length > 0
  /*
     idea: standard DFS with pruning
   */
  const ps = new Uint8Array(pRaw.length)
  for (let i = 0; i < pRaw.length; ++i) {
    ps[i] = pRaw.codePointAt(i) - codeA
  }
  // pattern letter-string bindings
  /*
     using '#' as placeholder - this captures the fact that
     all bindings must be non-empty and allows us to correctly estimate
     if current set of bindings could work.
   */
  const pMap = new Array(26).fill('#')
  const search = (startInd, dep) => {
    if (dep === ps.length) {
      return startInd === str.length
    }
    // need to find bindings for ps[dep ... ps.len-1]
    // estimate minimum len
    let minLen = ps.slice(dep,ps.length).reduce((acc,chInd) => acc + pMap[chInd].length, 0)
    if (minLen > str.length - startInd)
      return false
    const target = pMap[ps[dep]]
    if (target === '#') {
      // target === '#': find a binding for ps[dep]
      // we know that we need at least minLen - 1 (as first one is '#') elements after
      // binding this pattern, that's what the loop control statements say.
      // note that we start from longest possible candidate first,
      // which is beneficial as it reduces the branching factor
      for (
        /*
               <last ind> - <size> + 1
           ==> str.length-1 - (minLen-1) + 1
           ==> str.length - minLen + 1
        */
        let endInd = str.length - minLen + 1;
        endInd >= startInd;
        --endInd
      ) {
        const candidate = str.substring(startInd, endInd+1)
        if (pMap.indexOf(candidate) !== -1)
          // should be bijection
          continue
        pMap[ps[dep]] = candidate
        if (search(endInd+1,dep+1))
          return true
        pMap[ps[dep]] = '#'
      }
      return false
    } else {
      // target !== '#': see if current binding matches
      const endInd = startInd+target.length-1
      return str.substring(startInd, endInd+1) === target &&
        search(endInd+1, dep+1)
    }
  }
  return search(0, 0)
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(wordPatternMatch)

f("abab","redblueredblue")(true)
f("abcabc","redblueredblue")(true)
f("aaaa","asdasdasdasd")(true)
f("aabb","xyzabcxzyabc")(false)
f("abab","xyzabcxyzabc")(true)
f("abab", "aaaa")(false)
f("abcabc", "auaaua")(false)
f("", "")(true)
f("p", "")(false)
f("itwasthebestoftimes", "ittwaastthhebesttoofttimesss")(false)
