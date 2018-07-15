// pre-process every 2^x in range

// normalize so that we don't need to deal with freq count
const norm = s => s.split('').sort().join('')
const nums = new Set()
for (let i = 0; i <= 29; ++i) {
  const s = norm(String(2 ** i))
  nums.add(s)
}

/**
 * @param {number} N
 * @return {boolean}
 */
const reorderedPowerOf2 = N => nums.has(norm(String(N)))

console.assert(reorderedPowerOf2(1))
console.assert(!reorderedPowerOf2(10))
console.assert(reorderedPowerOf2(16))
console.assert(!reorderedPowerOf2(24))
console.assert(reorderedPowerOf2(46))
console.assert(!reorderedPowerOf2(0))
