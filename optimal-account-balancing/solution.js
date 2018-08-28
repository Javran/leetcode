const setAlter = (s, k, modify, def) => {
  if (s.has(k)) {
    s.set(k, modify(s.get(k)))
  } else {
    s.set(k, modify(def))
  }
}

const freqSetAlter = (s, k, diff) => {
  if (diff === 0)
    return
  if (s.has(k)) {
    const newVal = s.get(k) + diff
    if (newVal <= 0) {
      s.delete(k)
    } else {
      s.set(k, newVal)
    }
  } else {
    if (diff < 0) {
      return
    } else {
      s.set(k, diff)
    }
  }
}

// return <moves> and input dState is modified
const improve = dState => {
  if (dState.pos.size === 0) {
    // the overall sum should be 0,
    // which means pos.size === 0 can imply neg.size === 0
    return 0
  }
  const posDebts = [...dState.pos.keys()]
  let moves = 0
  for (let i = 0; i < posDebts.length; ++i) {
    const pd = posDebts[i]
    const pCount = dState.pos.get(pd)
    if (dState.neg.has(-pd)) {
      const nCount = dState.neg.get(-pd)
      const count = Math.min(pCount, nCount)
      moves += count
      freqSetAlter(dState.pos, pd, -count)
      freqSetAlter(dState.neg, -pd, -count)
    }
  }
  return moves
}

const settle = debtState => {
  let ans = improve(debtState)
  if (debtState.pos.size === 0) {
    // nothing to settle, we are done
    return ans
  }
  let best = +Infinity
  // peek one value from the set and try to settle that.
  const pd = debtState.pos.keys()[Symbol.iterator]().next().value;
  [...debtState.neg.keys()].forEach(nd => {
    // here we are simply copying previous state
    // a persistent data structure will work better but this seems to be good enough.
    const newDebtState = {
      pos: new Map(debtState.pos),
      neg: new Map(debtState.neg),
    }
    freqSetAlter(newDebtState.pos, pd, -1)
    freqSetAlter(newDebtState.neg, nd, -1)
    const newDebt = pd + nd
    if (newDebt > 0) {
      freqSetAlter(newDebtState.pos, newDebt, 1)
    } else {
      freqSetAlter(newDebtState.neg, newDebt, 1)
    }
    const cur = settle(newDebtState)
    if (cur < best)
      best = cur
  })
  return ans + 1 + best
}

/**
 * @param {number[][]} transactions
 * @return {number}
 */
const minTransfers = transactions => {
  /*
     idea: compute net debt and then search.

     - a positive debt must pair with a negative one to be able to settle,
       so here we are using DebtState { pos: Map<Debt, Freq>, neg: Map<Debt, Freq> }
     - there are obvious cases where one positive debt
       can be settled by a negative debt of same amount,
       these cases are handled by calling "improve" to reduce the search space.
     - in all other cases, we pick a postivie value and settle it with a negative one,
       DFS on which negative value to pick will allow us to take into account all possible ways.
   */
  const debt = new Map()
  for (let i = 0; i < transactions.length; ++i) {
    const [p0, p1, v] = transactions[i]
    setAlter(debt, p0, d => d - v, 0)
    setAlter(debt, p1, d => d + v, 0)
  }
  const debtState = {
    pos: new Map(),
    neg: new Map()
  };
  [...debt.values()].forEach(v => {
    if (v !== 0) {
      freqSetAlter(v > 0 ? debtState.pos : debtState.neg, v, 1)
    }
  })
  return settle(debtState)
}

const {consoleTest, genInt} = require('leetcode-zwischenzug')
const f = consoleTest(minTransfers)

f([[0,1,10],[2,0,5]])(2)
f([[0,1,10], [1,0,1], [1,2,5], [2,0,5]])(1)
f([[7,1,8],[4,9,2],[9,6,-6],[10,8,-9],[4,0,-9],[3,1,5],[3,4,8],[8,5,-6],[1,0,1],[10,0,-7],[0,1,5],[6,1,-2],[0,9,-10],[5,6,2],[1,0,-9],[7,1,-4],[9,0,-5],[0,8,3],[1,6,-10],[10,5,-1],[9,8,6],[2,0,-7],[9,0,1],[7,6,-10],[2,7,5],[1,8,-6],[10,1,-3],[1,3,-5],[9,8,6],[4,0,-4],[6,9,3],[10,6,-1],[2,4,-6],[9,7,8],[9,4,-10],[2,5,3],[0,7,8],[9,6,3],[4,1,-4],[8,6,2],[4,3,1],[9,2,-10],[3,6,5],[10,4,-8],[3,8,5],[2,3,5],[7,6,-4],[4,1,10],[8,1,-8],[6,1,1]])(9)

const gen = () => {
  const xs = []
  for (let i = 0; i < 50; ++i) {
    let p0 = genInt(0, 10)
    let p1
    do {
      p1 = genInt(0, 10)
    } while (p1 === p0)
      xs[i] = [p0, p1, genInt(-10,10)]
  }
  f(xs)()

  console.log(JSON.stringify(xs))
}
