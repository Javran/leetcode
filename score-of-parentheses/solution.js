/**
 * @param {string} S
 * @return {number}
 */
const scoreOfParentheses = S => {
  // idea: parser. since well-formness is guaranteed,
  // it makes parsing easy
  const consume = startInd => {
    if (startInd >= S.length)
      return {val: 0, nextInd: S.length}
    // assert well-formness. S[startInd] === '('
    if (S[startInd+1] === ')')
      // case "()"
      return {val: 1, nextInd: startInd + 2}
    let sum = 0
    let i = startInd+1
    while (i < S.length && S[i] !== ')') {
	  const result = consume(i)
      sum += result.val
      i = result.nextInd
    }
    return {val: sum*2, nextInd: i+1}
  }

  let i = 0
  let sum = 0
  while (i < S.length) {
    const result = consume(i)
    sum += result.val
    i = result.nextInd
  }
  return sum
}

console.assert(scoreOfParentheses("()(())") === 3)
console.assert(scoreOfParentheses("(())") === 2)
console.assert(scoreOfParentheses("(()(()))") === 6)
console.log(scoreOfParentheses("(()(()))()()(()()())"))
