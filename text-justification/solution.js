const sum = xs => xs.reduce((x,y) => x+y, 0)

// divide an integer m into n parts evenly.
// left-biased should there be extra.
const intDiv = (m, n) => {
  const r = m % n
  const q = Math.round((m - r) / n)
  const xs = new Array(n).fill(q)
  for (let i = 0; i < r; ++i)
    ++xs[i]
  return xs
}

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = (words, maxWidth) => {
  let curWords = []
  // current minimum length after inserting word w
  const afterNewCurMinLen = w => {
    if (curWords.length === 0) {
      return w.length
    } else {
      return w.length +
        sum(curWords.map(x => x.length)) +
        curWords.length
    }
  }

  // this part takes care of groupping words into rows
  const ansRows = []
  words.map(w => {
    const afterLen = afterNewCurMinLen(w)
    if (afterLen > maxWidth) {
      // have to split
      ansRows.push(curWords)
      curWords = []
    }
    curWords.push(w)
  })
  if (curWords.length > 0) {
    ansRows.push(curWords)
    curWords = []
  }

  const fullJustify = row => {
    const spaces = maxWidth - sum(row.map(x => x.length))
    if (row.length === 1) {
      // special case when we only have one word on that line
      return row[0] + ' '.repeat(spaces)
    }
    // create separators
    const seps = intDiv(spaces, row.length-1).map(x => ' '.repeat(x))
    // interleave words with separators
    const curRow = []
    for (let i = 0; i < row.length-1; ++i) {
      curRow.push(row[i])
      curRow.push(seps[i])
    }
    curRow.push(row[row.length-1])
    return curRow.join('')
  }

  // fully justify all lines except last one
  for (let i = 0; i < ansRows.length - 1; ++i) {
    ansRows[i] = fullJustify(ansRows[i])
  }

  // last line should be left-justified
  {
    let last = ansRows[ansRows.length-1]
    last = last.join(' ')
    ansRows[ansRows.length-1] = last + ' '.repeat(maxWidth - last.length)
  }
  return ansRows
}

console.log(
  fullJustify(
    ["This", "is", "an", "example", "of", "text", "justification."],
    16
  )
)

console.log(
  fullJustify(
    ["What","must","be","acknowledgment","shall","be"],
    16
  )
)

console.log(
  fullJustify(
    [
      "Science","is","what","we","understand","well","enough","to","explain",
      "to","a","computer.","Art","is","everything","else","we","do"
    ],
    20
  )
)
