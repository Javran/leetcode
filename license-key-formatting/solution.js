/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
const licenseKeyFormatting = (xsRaw, K) => {
  // 0 or whatever less-than-K for the first group
  const xs = xsRaw.toUpperCase().split('').filter(x => x !== '-')
  const leftmostSz = xs.length % K
  const groups = []
  let ind = 0
  if (leftmostSz > 0) {
    groups.push(xs.slice(0, leftmostSz).join(''))
    ind = leftmostSz
  }
  for (/* NOOP */; ind < xs.length; ind += k) {
    groups.push(xs.slice(ind, ind+k).join(''))
  }

  return groups.join('-')
}
