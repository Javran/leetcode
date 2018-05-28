/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isIsomorphic = (s, t) => {
  if (s.length !== t.length)
    return false

  // construct a translation from S to T
  const trST = new Map()
  for (let i = 0; i < s.length; ++i) {
    const sCh = s[i]
    const tCh = t[i]
    if (trST.has(sCh)) {
      // verify an existing translation
      if (trST.get(sCh) !== tCh)
        return false
    } else {
      trST.set(sCh, tCh)
    }
  }

  // construct reverse map
  const trTS = new Map()
  trST.forEach((v, k) => trTS.set(v,k))

  return trTS.size === trST.size
  // at this point we should be confident because
  // the size of our backward Map does not shrink
  // (as a shrink in size indicates that we have mapped
  // two different chars to the same one in the original Map)

  // it doesn't hurt to do the verification
  // but it is unnecessary

  /*
  // translate back to verify
  const ts = t.split('')
  for (let i = 0; i < ts.length; ++i) {
    if (trTS.has(ts[i])) {
      ts[i] = trTS.get(ts[i])
    } else {
      return false
    }
  }

  return s === ts.join('')
  */
}

console.log(isIsomorphic('ab', 'aa'))
