/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = word => {
  if (word === '')
    return ['']

  const ans = []
  const groups = new Array(word.length)
  // split word into non-empty groups
  const doGroup = (startInd, dep) => {
    if (startInd === word.length) {
      // once we have all groups, the word-number has to alternate
      // to avoid duplication.
      // and we have exactly two ways of doing so.
      const xs = groups.slice(0, dep)
      ans.push(xs.map((x, ind) =>
        (ind & 1) ? x : String(x.length)).join('')
      )
      ans.push(xs.map((x, ind) =>
        (ind & 1) ? String(x.length) : x).join('')
      )
      return
    }
    for (let i = startInd; i < word.length; ++i) {
      groups[dep] = word.substring(startInd, i+1)
      doGroup(i+1, dep+1)
    }
  }

  doGroup(0,0)
  return ans
}

console.log(generateAbbreviations("w"))
console.log(generateAbbreviations("word"))
console.log(generateAbbreviations("worfasdfd"))
