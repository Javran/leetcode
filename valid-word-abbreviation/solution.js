const digitsTmp = new Array(256)
'0123456789'.split('').map(ch => { digitsTmp[ch.codePointAt(0)] = true })
const isDigit = x => Boolean(digitsTmp[x.codePointAt(0)])

/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
const validWordAbbreviation = (word, abbrRaw) => {
  // match string
  let startInd = 0
  const tryMatch = abbr => {
    if (typeof abbr === 'number') {
      if (startInd + abbr - 1 >= word.length)
        return false
      startInd += abbr
    } else {
      if (word.substr(startInd, abbr.length) !== abbr)
        return false
      startInd += abbr.length
    }
    return true
  }

  // convert abbr into an array of either strings or numbers.
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
      if (!tryMatch(Number(d)))
        return false
      i = j+1
    } else {
      let j = i
      while (j+1 < abbrRaw.length && !isDigit(abbrRaw[j+1]))
        ++j
      const w = abbrRaw.slice(i,j+1)
      if (!tryMatch(w))
        return false
      i = j+1
    }
  }
  return startInd === word.length
}

console.assert(validWordAbbreviation("word", "word"))
console.assert(validWordAbbreviation("internationalization","i12iz4n"))
console.assert(!validWordAbbreviation("inernationalization","i12iz4n"))
console.assert(!validWordAbbreviation("internationalizatiot","i12iz4n"))
