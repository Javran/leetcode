/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
const decodeAtIndex = (S, K) => {
  /*
     idea: break S into groups (rep)
     - a string element of rep is just a literal string
     - a number element of rep[i] represents the repetition of rep[0..i-1]
     - accu[i] is a companion of rep[i] representing the rightmost position
       that rep[i] can reach
     - after we have figured out rep and accu, char at K can be recursively
       found by search through `accu`
     - note that we can stop building accu once last element of accu exceeds K
   */
  const rep = []
  const accu = []
  let i = 0
  let grp = []
  for (let i = 0; i < S.length; /* NOOP */) {
    const code = S.codePointAt(i)
    if (50 <= code && code <= 57) {
      // a num
      rep.push(code & 0xF)
      ++i
    } else {
      // a letter
      let j = i
      while (j+1 < S.length) {
        const code1 = S.codePointAt(j+1)
        if (97 <= code1 && code1 <= 122) {
          ++j
        } else {
          break
        }
      }
      rep.push(S.substring(i,j+1))
      i = j+1
    }
  }
  accu[0] = rep[0].length
  for (let i = 1; i < rep.length; ++i) {
    if (typeof rep[i] === 'string') {
      accu[i] = accu[i-1] + rep[i].length
    } else {
      accu[i] = accu[i-1] * rep[i]
    }
    if (accu[i] > K)
      break
  }
  const find = K => {
    let ind
    for (let i = 0; i < accu.length; ++i)
      if (K <= accu[i]) {
        ind = i
        break
      }
    if (ind === 0) {
      return rep[0][K-1]
    }
    if (typeof rep[ind] === 'string') {
      return rep[ind][K-accu[ind-1]-1]
    } else {
      // a num
      const z = K % accu[ind-1]
      return find(z === 0 ? accu[ind-1] : z)
    }
  }
  return find(K)
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(decodeAtIndex)

f("leet2code3",32)()
f("leet2code3",10)('o')
f("ha22",5)('h')
f("a2345678999999999999999",1)('a')

const t = "leetleetcodeleetleetcodeleetleetcode"
for (let i = 0; i < t.length; ++i) {
  f("leet2code3",i+1)(t[i])
}
