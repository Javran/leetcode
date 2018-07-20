const strToBin = raw => {
  const xs = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; ++i)
    xs[i] = raw.codePointAt(i) - 97
  return xs
}
/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
const findRotateSteps = (ringRaw, keyRaw) => {
  const ring = strToBin(ringRaw)
  const key = strToBin(keyRaw)
  // locs[<letter int>] = Array of indices that contains <letter int>
  const locs = new Array(26)
  for (let i = 0; i < ring.length; ++i) {
    const r = ring[i]
    if (r in locs) {
      locs[r].push(i)
    } else {
      locs[r] = [i]
    }
  }
  const f = new Array(ring.length)
  for (let i = 0; i < ring.length; ++i)
    f[i] = new Array(key.length + 1).fill(null)

  // figure out the shortest step to take from ringState l to ringState r
  const getStep = (l,r) => {
    const d1 = Math.abs(l-r)
    const d2 = ring.length - d1
    return d1 <= d2 ? d1 : d2
  }
  // f[<ring state>][i]: min steps after entered key [0..i-1] or null
  // 0 <= ring state < ring.length indicates the index pointing at 12:00 direction
  for (let i = 0; i < ring.length; ++i) {
    f[i][0] = getStep(i,0)
  }
  for (let i = 1; i <= key.length; ++i) {
    const kCode = key[i-1]
    // it makes sense to only stop when ringState matches our next target
    // so instead of trying to compute all f[?][?], we just compute those
    // that will guarantee us the path to the answer
    const ls = (kCode in locs) ? locs[kCode] : []
    for (let j = 0; j < ls.length; ++j) {
      const ringStateEnd = ls[j]
      let min = +Infinity
      for (let k = 0; k < ring.length; ++k) {
        if (f[k][i-1] !== null) {
          const steps = getStep(k, ringStateEnd) + 1
          if (min > f[k][i-1] + steps)
            min = f[k][i-1] + steps
        }
      }
      f[ringStateEnd][i] = min
    }
  }
  let min = +Infinity
  for (let i = 0; i < ring.length; ++i)
    if (f[i][key.length] !== null && min > f[i][key.length])
      min = f[i][key.length]
  return min
}

// console.log(findRotateSteps("godding", "gd"))
console.log(findRotateSteps("godadisnfg","gasfsdfassdafsdfadsafsdfasdfd"))
