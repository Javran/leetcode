/**
 * @param {string} word
 * @return {string[]}
 */
const generateAbbreviations = word => {
  // alternate solution. slow but looks clear.
  const ans = []
  const groups = new Array(word.length)
  // split word into non-empty groups
  const doGroup = (startInd, dep) => {
    if (startInd === word.length) {
      ans.push(groups.slice(0, dep).join(''))
      return
    }
    for (let i = startInd; i < word.length; ++i) {
      const lPart = word.substring(startInd, i+1)
      groups[dep] = lPart
      doGroup(i+1, dep+1)
      groups[dep] = String(lPart.length)
      for (let j = i+1; j < word.length; ++j) {
        const lPart2 = word.substring(i+1, j+1)
        groups[dep+1] = lPart2
        doGroup(j+1, dep+2)
      }
    }
    groups[dep] = String(word.substring(startInd).length)
    doGroup(word.length, dep+1)
  }

  doGroup(0,0)
  return Array.from(new Set(ans))
}

console.log(generateAbbreviations("word"))
console.log(generateAbbreviations("worfasdfd"))
