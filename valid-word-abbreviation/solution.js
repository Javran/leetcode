const digits = new Set('0123456789')
const isDigit = x => digits.has(x)

/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
const validWordAbbreviation = (word, abbrRaw) => {
  // convert abbr into an array of either strings or numbers.
  let abbrList = []
  for (let i = 0; i < abbrRaw.length; /* NOOP */) {
    const ch = abbrRaw[i]
    if (isDigit(ch)) {
      let j = i
      while (j+1 < abbrRaw.length && isDigit(abbrRaw[j+1]))
             ++j
      // a "takeWhile"
      const d = abbrRaw.slice(i,j+1)
      // invalid abbr because the digit starts with 0
      if (d[0] === '0')
        return false
      abbrList.push(Number(d))
      i = j+1
    } else {
      let j = i
      while (j+1 < abbrRaw.length && !isDigit(abbrRaw[j+1]))
             ++j
      const w = abbrRaw.slice(i,j+1)
      abbrList.push(w)
      i = j+1
    }
  }

  // match string
  let startInd = 0
  for (let i = 0; i < abbrList.length; ++i) {
    const abbr = abbrList[i]
    if (typeof abbr === 'number') {
      if (startInd + abbr - 1 >= word.length)
        return false
      startInd += abbr
    } else {
      if (word.substr(startInd, abbr.length) !== abbr)
        return false
      startInd += abbr.length
    }
  }
  return startInd === word.length
}

console.assert(validWordAbbreviation("word", "word"))
console.assert(validWordAbbreviation("internationalization","i12iz4n"))
console.assert(!validWordAbbreviation("inernationalization","i12iz4n"))
console.assert(!validWordAbbreviation("internationalizatiot","i12iz4n"))
