const prevPalindrome = ({core, overlap}) => {
  if (core === 0)
    return null
  if (core === 1) {
    if (overlap) {
      return {core: 0, overlap: true}
    } else {
      return {core: 9, overlap: true}
    }
  }

  const coreLen = String(core).length
  if (coreLen !== String(core-1).length) {
    if (overlap) {
      return {core: core-1, overlap: false}
    } else {
      const newCore = Number('9'.repeat(coreLen))
      return {core: newCore, overlap: true}
    }
  } else {
    return {core: core-1, overlap}
  }
}

const nextPalindrome = ({core, overlap}) => {
  const coreLen = String(core).length
  if (coreLen !== String(core+1).length) {
    let newCore
    if (overlap) {
      newCore = Number('9'.repeat(coreLen-1))+1
    } else {
      newCore = core+1
    }
    return {core: newCore, overlap: !overlap}
  } else {
    return {core: core+1, overlap}
  }
}

const mkPalindromeStr = ({core, overlap}) => {
  let right
  if (overlap) {
    right = String(core).split('').slice(0,-1).reverse()
  } else {
    right = String(core).split('').reverse()
  }
  return [core, ...right].join('')
}

/**
 * @param {string} n
 * @return {string}
 */
const nearestPalindromic = nRaw => {
  // freaking boring.
  /*
     idea:
     - get candidates around that number, which needs prevPalindrome and nextPalindrome
     - pick one with min diff (tie breaker: smaller one), careful as the number
       can be as long as 18 digits
   */
  let n
  {
    // removing leading 0s from input
    let i = 0
    // as the problem guarantees that nRaw is positive,
    // we'll eventually hit a non-zero value
    while (nRaw[i] === '0')
      ++i
    n = nRaw.substring(i)
  }
  // find "palindrome core"
  let pState = {
    core: parseInt(n.substr(0, (n.length+1) >> 1), 10),
    overlap: Boolean(n.length & 1),
  }

  const numStrLt = (x,y) => {
    if (x.length !== y.length)
      return x.length < y.length
    return x < y
  }

  // skip to prev palindrome until it's strictly less
  let numRep
  do {
    pState = prevPalindrome(pState)
    numRep = mkPalindromeStr(pState)
  } while (!numStrLt(numRep, n))

  const cs = [numRep]
  do {
    pState = nextPalindrome(pState)
    numRep = mkPalindromeStr(pState)
    if (numRep !== n)
      cs.push(numRep)
  } while (!numStrLt(n, numRep))

  // least significant to most significant digit
  const toDigits = xStr => {
    const xs = new Int8Array(xStr.length)
    for (let i = 0; i < xStr.length; ++i)
      xs[i] = xStr.codePointAt(xStr.length-i-1) & 15
    return xs
  }
  const nDigits = toDigits(n)
  const getDiff = (xs, ys) => {
    if (xs === ys)
      return "0"
    let carry = 0
    const zs = new Array(xs.length)
    for (let i = 0; i < xs.length; ++i) {
      let x = xs[i] - carry
      const y = (i in ys) ? ys[i] : 0
      if (x < y) {
        x += 10
        carry = 1
      } else {
        carry = 0
      }
      zs[i] = x - y
    }
    let j = zs.length-1
    while (j > 0 && zs[j] === 0)
      --j
    zs.length = j+1
    return zs.reverse().join('')
  }
  let minDiff = null, ans = null
  // all candidates
  cs.forEach((numRep, ind) => {
    const xs = toDigits(numRep)
    const diff = numStrLt(n, numRep) ?
      getDiff(xs, nDigits) :
      getDiff(nDigits, xs)
    if (minDiff === null || numStrLt(diff, minDiff)) {
      minDiff = diff
      ans = numRep
    }
  })
  return ans
}

console.assert(nearestPalindromic("000123") === "121")
console.assert(nearestPalindromic("81232") === "81218")
console.assert(nearestPalindromic("9923") === "9889")
console.assert(nearestPalindromic("91") === "88")
console.assert(nearestPalindromic("1001") === "999")
console.assert(nearestPalindromic("10001") === "9999")
console.assert(nearestPalindromic("999999") === "1000001")
console.assert(nearestPalindromic("99999") === "100001")
console.assert(nearestPalindromic("1551") === "1441")
console.assert(nearestPalindromic("1") === "0")
console.assert(nearestPalindromic("9".repeat(18)) === "1000000000000000001")
