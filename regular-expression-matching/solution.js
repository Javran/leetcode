const buildFSA = pattern => {
  // for creating new states
  let fresh = 0
  const mkState = () => {
    const ret = fresh
    ++fresh
    return ret
  }

  const startState = mkState()
  // transitions.get(state).get(<echar>) = <state>
  // <echar>: can be a single character, '.' or 'EPS' (echar for extended char)
  const transitions = new Map()

  const mkTr = (fromState, echar, toState) => {
    if (!transitions.has(fromState)) {
      transitions.set(fromState, new Map())
    }
    const subMap = transitions.get(fromState)
    subMap.set(echar, toState)
  }

  const pats = pattern.split('')
  let prevState = startState
  for (let i = 0; i < pats.length; ++i) {
    const ch = pats[i]
    let isStar = false
    if (i+1 < pats.length && pats[i+1] === '*') {
      isStar = true
      ++i
    }
    const newState = mkState()
    if (isStar) {
      mkTr(prevState, 'EPS', newState)
      mkTr(newState, ch, newState)
    } else {
      mkTr(prevState, ch, newState)
    }
    prevState = newState
  }
  const acceptingState = mkState()
  mkTr(prevState, 'EPS', acceptingState)

  return {
    startState,
    transitions,
    acceptingState,
  }
}

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (s, pattern) => {
  
}


console.log(buildFSA('a*bc.*d'))
