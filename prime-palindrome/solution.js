const isPrime = n => {
  if (n < 2)
    return false
  if (n === 2)
    return true
  const q = Math.floor(Math.sqrt(n))
  for (let i = 2; i <= q; ++i) {
    if (n % i === 0)
      return false
  }
  return true
}

const isPalindrome = n => {
  const s = String(n)
  for (let i = 0, j = s.length-1; i <= j; ++i, --j) {
    if (s.codePointAt(i) !== s.codePointAt(j))
      return false
  }
  return true
}

/**
 * @param {number} N
 * @return {number}
 */
const primePalindrome = N => {
  // magic to shift N to an odd number, which allows following i += 2
  for (; !(N & 1) || N < 3 ; ++N) {
    if (isPrime(N) && isPalindrome(N))
      return N
  }

  for (let i = N; true; i += 2) {
    // turns out by skipping all numbers who has even # of digits
    // we are good enough.
    if (i >= 1000 && i < 9999)
      i = 9999
    if (i >= 100000 && i < 999999)
      i = 999999
    // actually this part takes forever to run if we don't skip
    if (i >= 10000000 && i < 99999999)
      i = 99999999
    if (isPrime(i) && isPalindrome(i))
      return i
  }
}

console.assert(primePalindrome(6) === 7)
console.assert(primePalindrome(8) === 11)
console.assert(primePalindrome(1) === 2)
console.assert(primePalindrome(13) === 101)
console.assert(primePalindrome(2) === 2)
console.assert(primePalindrome(9989900) === 100030001)
