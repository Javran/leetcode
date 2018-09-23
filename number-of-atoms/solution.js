/**
 * @param {string} formula
 * @return {string}
 */
const countOfAtoms = formula => {
  formula = `(${formula})`
  const altParse = (p1, p2) => startInd => {
    const result1 = p1(startInd)
    if (result1 !== null)
      return result1
    else
      return p2(startInd)
  }

  // parse one single atom
  // return either {result: Map<Atom, Count>, nextInd} or null for failure
  const parseAtom = startInd => {
    const re = new RegExp(`^.{${startInd}}([A-Z][a-z]*)(\\d*)`)
    const matchResult = re.exec(formula)
    if (matchResult) {
      const [_ignored, atomName, countRaw] = matchResult
      const nextInd = startInd + atomName.length + countRaw.length
      const count = countRaw === '' ? 1 : Number(countRaw)
      return {
        result: new Map([[atomName, count]]),
        nextInd,
      }
    } else {
      return null
    }
  }

  // parse things in parentheses
  const parsePar = startInd => {
    if (formula[startInd] !== '(')
      return null
    const parseX = altParse(parseAtom, parsePar)
    const ans = new Map()
    let nowInd = startInd + 1
    while (formula[nowInd] !== ')') {
      const ret = parseX(nowInd)
      if (ret === null) {
        throw 'syntax error'
      } else {
        nowInd = ret.nextInd
        for (let [k,v] of ret.result) {
          if (ans.has(k)) {
            ans.set(k, ans.get(k) + v)
          } else {
            ans.set(k, v)
          }
        }
      }
    }
    nowInd += 1
    const re = new RegExp(`^.{${nowInd}}(\\d*)`)
    const [_ignored, rawCount] = re.exec(formula)
    if (rawCount !== '') {
      const count = Number(rawCount)
      for (let k of ans.keys()) {
        ans.set(k, ans.get(k) * count)
      }
      nowInd += rawCount.length
    }
    return {
      result: ans,
      nextInd: nowInd,
    }
  }

  const {result} = parsePar(0)
  const keys = [...result.keys()].sort()
  return keys.map(k => {
    const v = result.get(k)
    return v === 1 ? k : `${k}${v}`
  }).join('')
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(countOfAtoms)

f("H2O")("H2O")
f("(HO)(OH)")("H2O2")
f("Mg(OH)2")("H2MgO2")
f("K4(ON(SO3)2)2")("K4N2O14S4")
f("((H)2)4H2")("H10")
