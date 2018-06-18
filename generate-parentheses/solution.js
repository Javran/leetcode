/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = n => {
  // solution: non-deterministic computation.
  const initStates = [{
    todo: n,
    unbalance: 0,
    s: "",
  }]

  const expand = (state, nextStates) => {
    const {todo, unbalance, s} = state
    // if possible we can lower the unbalance.
    if (unbalance > 0) {
      nextStates.push({
        todo,
        unbalance: unbalance - 1,
        s: s+")",
      })
    }
    // or start a new pair
    if (todo > 0) {
      nextStates.push({
        todo: todo - 1,
        unbalance: unbalance + 1,
        s: s+"(",
      })
    }
  }
  let curStates = initStates
  let nextStates
  for (let i = 1; i <= n*2; ++i) {
    nextStates = []
    curStates.map(s => expand(s, nextStates))
    curStates = nextStates
  }
  return curStates.map(x => x.s)
}

console.log(generateParenthesis(6))
