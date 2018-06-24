/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = (xs, ys) => {
  const ansRev = []
  let carry = false
  for (
    let i = xs.length-1, j = ys.length-1;
    i >= 0 || j >= 0;
    --i, --j
  ) {
    let res = 0
    // 3-way add
    if (xs[i] === '1')
      ++res
    if (ys[j] === '1')
      ++res
    if (carry)
      ++res
    carry = res >= 2
    ansRev.push(res & 1)
  }
  if (carry)
    ansRev.push(1)
  // truncate 0s if needed
  while (ansRev.length >= 1 && ansRev[ansRev.length-1] !== 1)
    ansRev.pop()
  if (ansRev.length === 0)
    return "0"
  return ansRev.reverse().map(String).join('')
}

console.log(addBinary("00", "00000000"))
