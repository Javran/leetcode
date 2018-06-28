/**
 * @param {string} s
 * @return {string}
 */
const decodeString = s => {
  const isDigit = ind => {
    const code = s.codePointAt(ind)
    return 48 <= code && code <= 57
  }

  // return: {result: String, nextInd}
  const procString = beginInd => {
    if (isDigit(beginInd)) {
      // parse int, and recursively parse next part
      let endInd = beginInd
      while (endInd + 1 < s.length && isDigit(endInd+1))
        ++endInd
      // now that: num is between [startInd ... endInd], "[" at endInd+1
      // begin processing at endInd+2
      const num = parseInt(s.substring(beginInd, endInd+1), 10)
      let ans = ''
      let i
      // aggressive consumption
      for (i = endInd+2; i < s.length && s[i] !== ']'; /* NOOP */) {
        const procResult = procString(i)
        ans += procResult.result
        i = procResult.nextInd
      }
      return {
        result: ans.repeat(num),
        // skipping "]"
        nextInd: i+1,
      }
    } else {
      let endInd = beginInd
      while (endInd + 1 < s.length && !isDigit(endInd+1) && s[endInd+1] !== ']')
        ++endInd
      return {
        result: s.substring(beginInd, endInd+1),
        nextInd: endInd+1,
      }
    }
  }
  let ans = ''
  for (let i = 0; i < s.length; /* NOOP */) {
    const result = procString(i)
    ans += result.result
    i = result.nextInd
  }
  return ans
}

console.log(decodeString("3[a]2[bc]"))
console.log(decodeString("3[a2[c]]"))
console.log(decodeString("2[abc]3[cd]ef"))
console.log(decodeString("3[a]2[b4[F]c]"))
