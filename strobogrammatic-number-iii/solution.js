const digits = []
digits[0] = 0
digits[1] = 1
digits[6] = 9
digits[8] = 8
digits[9] = 6

const pDigits = [0,1,6,8,9]
const centerDigits = [0,1,8]

const plus1 = nStr => {
  const xs = new Int8Array(nStr.length+1)
  for (let i = 0; i < nStr.length; ++i)
    xs[nStr.length-i-1] = nStr.codePointAt(i) & 15
  let c = 1, i = 0
  while (c > 0) {
    ++xs[i]
    if (xs[i] > 9) {
      xs[i] -= 10
      c = 1
    } else {
      c = 0
    }
    ++i
  }
  if (xs[nStr.length] === 1) {
    return xs.reverse().join('')
  } else {
    return xs.slice(0,nStr.length).reverse().join('')
  }
}

/*
   special count up from `[dFst]0000...` to `99999...`
   with total string of length dLen

   dLen: number >= 1
   dFst: 0~9 (number)

   note that countUp1(0, dLen) would not be a final answer to '000...' ~ '999...',
   (unless dLen === 1)
   as a valid solution never begin with 0.
 */
const countUp1 = (dFst, dLen) => {
  // as digits[9] is assigned a value, we are guaranteed that ind !== -1
  const ind = pDigits.findIndex(x => x >= dFst)
  const fstDigitCount = pDigits.length - ind
  if (dLen === 1) {
    return pDigits.slice(ind).filter(x => centerDigits.includes(x)).length
  }
  if (dLen === 2)
    return fstDigitCount
  const halfLen = dLen >> 1
  if (dLen & 1) {
    // odd digits
    return fstDigitCount * (pDigits.length ** (halfLen-1)) * centerDigits.length
  } else {
    // even digits
    return fstDigitCount * (pDigits.length ** (halfLen-1))
  }
}

/*
   count strobogrammatic number from `numStr` to `999...`

   e.g.:

   - "1234" ~ "9999"
   - "0012" ~ "9999"

 */
const countUp = numStr => {
  const dLen = numStr.length
  if (dLen === 1)
    return countUp1(numStr.codePointAt(0) & 15, dLen)
  if (dLen === 2) {
    const hi = numStr.codePointAt(0) & 15
    const lo = numStr.codePointAt(1) & 15
    return pDigits.filter(x => `${x}${digits[x]}` >= numStr).length
  }
  let ans = 0
  // dLen >= 3
  const dFst = numStr.codePointAt(0) & 15
  // two cases:
  // (1) when the strobogrammatic number is greater in the most significant digit
  if (dFst !== 9) {
    ans += countUp1(dFst+1, dLen)
  }
  // (2) when the strobogrammatic number is equal in the most significant digit
  if (pDigits.includes(dFst)) {
    // first digit is fine
    if (digits[dFst] >= (numStr.codePointAt(dLen-1) & 15)) {
      ans += countUp(numStr.substr(1, dLen-2))
    } else if (!(/^9+$/.exec(numStr.substr(1, dLen-2)))) {
      /*
         e.g. 123456 ~ 999999
           as 123451 < 123456, we need to try 123461 >= 123456 instead
       */
      const next = plus1(numStr.substr(1,dLen-2))
      ans += countUp(next)
    }
  }
  return ans
}

const dropZeros = nStr => {
  let i = 0
  while (i < nStr.length && nStr[i] === '0')
    ++i
  return i === nStr.length ? '0' : nStr.substr(i)
}

/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
const strobogrammaticInRange = (low, high) => {
  // it seems like both low and high are non-negative.
  // so we'll be using this as an assumption.
  low = dropZeros(low), high = dropZeros(high)
  if (
    low.length > high.length ||
    (low.length === high.length && low > high)
  )
    // in case that low > high
    return 0
  // now that low <= high (numerically)
  if (low.length === high.length) {
    if (/^9+$/.exec(high)) {
      return countUp(low)
    } else {
      return countUp(low) - countUp(plus1(high))
    }
  } else {
    let ans = 0
    for (let i = low.length + 1; i < high.length; ++i)
      // 10 ~ 99, 100 ~ 999, 1000 ~ 9999 ... if it's in range.
      ans += countUp1(1,i)
    ans += countUp(low)
    if (/^9+$/.exec(high)) {
      // high = 99999 ...
      ans += countUp1(1, high.length)
    } else {
      ans += countUp1(1, high.length) - countUp(plus1(high))
    }
    return ans
  }
}

console.assert(countUp1(9,1) === 0)
console.assert(countUp1(5,1) === 1)
console.assert(countUp1(5,2) === 3)
console.assert(countUp1(8,6) === 50)
console.assert(countUp1(1,3) === 12)
console.assert(countUp1(3,12) === 9375)
console.assert(countUp1(1,11) === 7500)
console.assert(countUp1(0,1) === 3)
console.assert(countUp("11112") === 55)
console.assert(countUp("100") === 12)
console.assert(countUp("96") === 1)
console.assert(countUp("98") === 0)
console.assert(countUp("45") === 3)
console.assert(countUp("89") === 1)
console.assert(strobogrammaticInRange("68", "682341") === 137)
console.assert(strobogrammaticInRange(
  "1430",
  "1992324243249999"
) === 388728)
console.assert(strobogrammaticInRange("100", "999") === 12)
console.assert(strobogrammaticInRange("200000", "999999") === 75)
console.assert(strobogrammaticInRange("123456", "682341") === 32)
console.assert(strobogrammaticInRange("123456", "999999") === 90)
console.assert(strobogrammaticInRange("101", "999") === 12)
console.assert(strobogrammaticInRange("50", "100") === 3)
console.assert(strobogrammaticInRange("1001", "9999") === 20)
console.assert(strobogrammaticInRange("10000", "99999") === 60)
console.assert(strobogrammaticInRange("10000", "11111") === 5)
console.assert(strobogrammaticInRange("11112", "19999") === 10)
