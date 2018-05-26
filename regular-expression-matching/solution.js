const buildFSA = pattern => {
  // for creating new states
  let fresh = 0
  const mkState = () => {
    const ret = fresh
    ++fresh
    return ret
  }

  const startState = mkState()
  // transitions.get(state).get(<echar>) = Set of <state>
  // <echar>: can be a single character, '.' or 'EPS' (echar for extended char)
  const transitions = new Map()

  const mkTr = (fromState, echar, toState) => {
    if (!transitions.has(fromState)) {
      transitions.set(fromState, new Map())
    }
    const subMap = transitions.get(fromState)
    if (subMap.has(echar)) {
      subMap.get(echar).add(toState)
    } else {
      subMap.set(echar, new Set([toState]))
    }
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

  // direct lookup
  const lookup = (state, echar) => {
    if (transitions.has(state)) {
      const subMap = transitions.get(state)
      if (subMap.has(echar))
        return subMap.get(echar)
      else
        return null
    } else {
      return null
    }
  }

  // find epsilon closure
  const eClosure = stateSetInp => {
    const stateSet = new Set(stateSetInp)
    const newStates = new Set()
    stateSet.forEach(state => {
      const nexts = lookup(state, 'EPS')
      if (nexts !== null)
        nexts.forEach(next =>
          !stateSet.has(next) && newStates.add(next)
        )
    })
    if (newStates.size === 0) {
      return stateSet
    } else {
      newStates.forEach(state => stateSet.add(state))
      return eClosure(stateSet)
    }
  }

  const nextStates = (stateSetInp, char) => {
    const stateSet = eClosure(stateSetInp)
    const endStateSet = new Set()
    stateSet.forEach(state => {
      const s1 = lookup(state, '.')
      if (s1)
        s1.forEach(st =>
          endStateSet.add(st)
        )
      const s2 = lookup(state, char)
      if (s2)
        s2.forEach(st =>
          endStateSet.add(st)
        )
    })
    return eClosure(endStateSet)
  }

  return {
    mkStartStates: () => eClosure(new Set([startState])),
    nextStates,
    acceptingState,
  }
}

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (str, pattern) => {
  const fsa = buildFSA(pattern)
  let curStates = fsa.mkStartStates()
  for (let i = 0; i < str.length; ++i) {
    curStates = fsa.nextStates(curStates, str[i])
  }
  return curStates.has(fsa.acceptingState)
}

console.log(isMatch("aa", "a") === false)
console.log(isMatch("aa", "a*") === true)
console.log(isMatch("ab", ".*") === true)
console.log(isMatch("aab", "c*a*b") === true)
console.log(isMatch("mississipi", "mis*is*p*.") === false)
console.log(isMatch("mississipi", "mis*is*.p*.") === true)
console.log(isMatch("aaa", "a*a") === true)
console.log(isMatch("", ".*") === true)
