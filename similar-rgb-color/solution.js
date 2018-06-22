// figure out closest value to v
// in [0x00, 0x11, 0x22, ..., 0xFF]
const closestVal = v => {
  // most significant 4 bits
  const ms = v & 0xF0
  let c1 = ms | (ms >> 4)
  let c2
  if (v === c1)
    return v
  else if (v < c1) {
    c2 = c1
    c1 = Math.max(c1 - 0x11, 0)
    // c1 < v < c2
  } else {
    // cond: c1 < v
    c2 = Math.min(c1 + 0x11, 0xFF)
    // c1 < v < c2
  }
  return v-c1 <= c2-v ? c1 : c2
}

const ds = '0123456789abcdef'
const toHex = v => {
  const lo = v & 0xF
  const hi = (v & 0xF0) >> 4
  return ds[hi] + ds[lo]
}

/**
 * @param {string} color
 * @return {string}
 */
const similarRGB = color => {
  // color is of a specific format that we can take advantage of
  const rawRGB = parseInt(color.substr(1), 16)
  const r = (rawRGB & 0xFF0000) >> 16
  const g = (rawRGB & 0xFF00) >> 8
  const b = rawRGB & 0xFF
  // note that because of the formula of similarity,
  // every value's closest value can be compute separated
  // to get us the final answer
  const s = [r,g,b].map(v => toHex(closestVal(v))).join('')
  return '#' + s
}

console.log(similarRGB("#09f166"))
