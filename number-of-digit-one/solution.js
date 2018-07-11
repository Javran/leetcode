/**
 * @param {number} n
 * @return {number}
 */
const countDigitOne = n => {
  if (n <= 0)
    return 0
  /*
     idea: think about how many 1s are there for each digit.
   */
  const nStr = String(n)
  let ans = 0
  /*
     taking example: "10213"
     - prefix goes as 0, 1, 10, 102, ...
     - and base matches the # of numbers in that iteration
   */
  for (
    let i = 0,
        prefix = 0,
        base = 10 ** (nStr.length - 1),
        d;
    //
    i < nStr.length;
    //
    ++i,
    base /= 10,
    prefix = prefix*10+d
  ) {
    d = nStr.codePointAt(i) & 15
    if (d === 0) {
      // we haven't reached '1' for numbers starting with current prefix
      ans += prefix*base
    } else if (d === 1) {
      // don't use parseInt, as it won't work on empty string
      const rhs = Number(nStr.substring(i+1))
      ans += prefix*base + rhs+1
    } else {
      // we have went past 1 with cur prefix, count those it.
      // d >= 2
      ans += (1+prefix)*base
    }
  }

  return ans
}

const testAssert = (i, o = null) => {
  if (o) {
    console.assert(countDigitOne(i) === o)
  } else {
    console.log(countDigitOne(i))
  }
}

testAssert(2345, 1775)
testAssert(10213, 4360)
testAssert(111111, 66672)
testAssert(113410200, 106924743)
