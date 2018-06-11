const vowels = new Set("aeiouAEIOU")
const isVowels = x => vowels.has(x)

/**
 * @param {string} s
 * @return {string}
 */
const reverseVowels = s => {
  const xs = s.split('')
  let i = 0, j = xs.length - 1
  while (i < j) {
    while (i < j && !isVowels(xs[i]))
      ++i
    while (i < j && !isVowels(xs[j]))
      --j
    if (i >= j)
      break
    const tmp = xs[i]
    xs[i] = xs[j]
    xs[j] = tmp
    ++i, --j
  }
  return xs.join('')
}

console.log(reverseVowels("hello"))
console.log(reverseVowels("leetcode"))
console.log(reverseVowels("bcdf"))
console.log(reverseVowels("bcdfa"))
