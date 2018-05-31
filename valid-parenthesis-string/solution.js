/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = xs => {
  // the "unbalance" is the number of unbalanced left-parentheses.
  // we just need to maintain a non-deterministic state because
  // of existence of the wildcard '*'
  let unbalanceSet = new Set([0])
  for (let i = 0; i < xs.length; ++i) {
    const ch = xs[i]
    const nextSet = new Set()
    unbalanceSet.forEach(unbalance => {
      if (ch === '(' || ch === '*') {
        nextSet.add(unbalance+1)
      }
      if ((ch === ')' || ch === '*') && unbalance >= 1) {
        nextSet.add(unbalance-1)
      }
      if (ch === '*')
        nextSet.add(unbalance)
    })
    unbalanceSet = nextSet
  }

  return unbalanceSet.has(0)
}

const test = (inp, exp) =>
  console.assert(checkValidString(inp) === exp)

test('()', true)
test('())', false)
test('(()', false)
test('((*)', true)
