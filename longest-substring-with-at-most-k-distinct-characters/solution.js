/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const lengthOfLongestSubstringKDistinct = (sRaw, k) => {
  if (k <= 0 || sRaw.length === 0)
    return 0
  let ans = 1
  // first scan to convert this into run length
  const rlCode = []
  const rlCount = []
  let cur = null
  for (let i = 0; i < sRaw.length; ++i) {
    const code = sRaw.codePointAt(i)
    if (cur === null) {
      cur = {code, count: 1}
    } else if (cur.code === code) {
      ++cur.count
    } else {
      rlCode.push(cur.code)
      rlCount.push(cur.count)
      cur = {code, count: 1}
    }
  }
  if (cur !== null) {
    rlCode.push(cur.code)
    rlCount.push(cur.count)
    cur = null
  }

  // rlCode.length > 0 since sRaw.length > 0
  let startInd = 0, endInd = 0, win = new Map()
  win.set(rlCode[0], rlCount[0])
  while (startInd < rlCode.length) {
    // expand endInd
    while (endInd+1 < rlCode.length) {
      const nextCode = rlCode[endInd+1]
      if (win.has(nextCode) || win.size < k) {
        const nextCount = rlCount[endInd+1]
        if (win.has(nextCode)) {
          win.set(nextCode, win.get(nextCode) + nextCount)
        } else {
          win.set(nextCode, nextCount)
        }
        ++endInd
      } else {
        break
      }
    }
    const curLen = [...win.values()].reduce((x,y) => x+y, 0)
    if (curLen > ans)
      ans = curLen
    // move startInd forward
    const sCode = rlCode[startInd]
    const sCount = rlCount[startInd]
    const oldCount = win.get(sCode)
    if (oldCount === sCount) {
      win.delete(sCode)
    } else {
      win.set(sCode, oldCount-sCount)
    }
    ++startInd
  }
  return ans
}

const {cTestFunc, genInt} = require('leetcode-zwischenzug')
const f = cTestFunc(lengthOfLongestSubstringKDistinct)

f("eceba", 2)(3)
f("aa", 1)(2)
f("ccacfdefceabecfcbaabdbfeeeddee", 2)(7)
f("aeecdbaaffcbfbefcfdbdcbcebcafbd", 4)(10)

const genTest = () => {
  const codeA = 'a'.codePointAt(0)
  const xs = []
  for (let i = 0; i < 1000; ++i) {
    xs.push(String.fromCodePoint(codeA + genInt(0, 5)))
  }
  console.log(xs.join(''))
}

// genTest()

const xs = "fadbddfaaafdccacbeceddeefcfbfdeaaabfcdcdbcfcaaebaedbfeaafecccfaedfffeefeffdbdfadadecafdafdefffccecdebaacbaaebaaaffafbfdcaebadeefdbbcdffcccfbaacddbdbffcefdeeeedcafffeffeaecaeaddbedebfddafdadafccfcddadecaeeeacdbafbbfaeaefbfdccecfceecccfdccddeaacaaacccbcbbfdecdbbcecabcafeaaedadbffceadffbeadacdfbdbedaaaabefdcbaabcffcdccbfdfdcfceaedffdeaaadedbecdedebeccacebbbdbadfcfcaeffbcbbfebefbfcaadabbbeaedfbfbeccdfddecbffcdbecfaadccfaaadcadadfcbfeffddbbaadfebafffdddfaecaaeabbddadbafbaceeaccadcffeeafcefdfcbfbacaeacbeedcfeeffcdbebedadddfbbdedeafeebffefdfcebebacafbcabeeefebcdfeeadcfbecefafbdaeabbcbdbbdcfeecaebeccbdaacfadaeddcbeddacaffbcbeebcddbceebdbaaceacbefcdcfebbcbccfeeddeeddeadabcdfeacddbeecefbedeadbcacafeecfbabaedadccbdbbdfefeceeaaeecfefeaefdcbdccfecfaeabdcdacbaddbceadeceedffaaeceddedeafbfdbdacccaacbdccecebecabcbddeabeeeaceafeeaaddbbabafcfaacbbeababdbbaecadfcfdcdaeabafeeabdfafcefefecddbaebfcfcdfcdacbbefffdbdeadcacaedfebcbdfdfdacbdbecdeaaccafdffadcbbcdfdeaefffeabdefebaeeeebdfcbeedadeffaedcebecedbafbdea"
f(xs, 1)(4)
f(xs, 2)(9)
f(xs, 3)(13)
f(xs, 4)(20)
f(xs, 5)(36)
f(xs, 6)(1000)
