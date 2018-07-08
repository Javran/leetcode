const leasts = "Zero One Two Three Four Five Six Seven Eight Nine".split(' ')
const tens = "Ten Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(' ')
const weirdos =
  "Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(' ')

const thousand = 1000
const million = thousand*thousand
const billion = thousand*million

/**
 * @param {number} num
 * @return {string}
 */
const numberToWords = num => {
  if (num === 0)
    // the only way that 0 could show up
    return "Zero"

  const wordGroup = num => {
    if (num === 0)
      return []
    const ans = []
    // INVARIANT: 0 <= num < 1000
    const d100 = Math.floor(num / 100)
    if (d100) {
      ans.push(leasts[d100], "Hundred")
    }
    const d10 = Math.floor((num - 100*d100) / 10)
    const d1 = num % 10
    if (d10) {
      if (d10 !== 1) {
        ans.push(tens[d10-1])
      } else {
        ans.push(weirdos[d1])
        return ans
      }
    }
    if (d1 !== 0)
      ans.push(leasts[d1])
    return ans
  }

  let ans = []
  // I have no guilty having these repetitions
  // natural languages are weird and don't even try to abstract when
  // there are only 4 groups to be considered.
  if (num >= billion) {
    const grp = wordGroup(Math.floor(num / billion))
    ans = ans.concat(grp)
    ans.push("Billion")
    num %= billion
  }
  if (num >= million) {
    const grp = wordGroup(Math.floor(num / million))
    ans = ans.concat(grp)
    ans.push("Million")
    num %= million
  }
  if (num >= thousand) {
    const grp = wordGroup(Math.floor(num / thousand))
    ans = ans.concat(grp)
    ans.push("Thousand")
    num %= thousand
  }
  ans = ans.concat(wordGroup(num))
  return ans.join(' ')
}

console.assert(
  numberToWords(1234567891) ===
    "One Billion Two Hundred Thirty Four Million " +
    "Five Hundred Sixty Seven Thousand " +
    "Eight Hundred Ninety One"
)

console.assert(
  numberToWords(123) === "One Hundred Twenty Three"
)

console.assert(
  numberToWords(12345) === "Twelve Thousand Three Hundred Forty Five"
)

console.assert(
  numberToWords(1234567) ===
    "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
)

console.assert(
  numberToWords(1000000000) ===
    "One Billion"
)
