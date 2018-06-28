const timeRE = /^(\d\d):(\d\d)$/
const parseTime = raw => {
  const [_ignored, hhRaw, mmRaw] = timeRE.exec(raw)
  return {
    hh: parseInt(hhRaw, 10),
    mm: parseInt(mmRaw, 10),
  }
}

const mkHHMM = (hh, mm) => ({hh, mm, total: hh*60+mm})

const nextClosestTime = S => {
  const {hh, mm} = parseTime(S)
  const inpHHMM = mkHHMM(hh,mm)
  const inpSet = new Set()
  // recording all possible digits
  inpSet.add(Math.floor(hh/10))
  inpSet.add(hh % 10)
  inpSet.add(Math.floor(mm/10))
  inpSet.add(mm % 10)
  // all possible values that one digit can have
  const oneDigits = [...inpSet.values()]
  // only one value, only one possibility
  if (oneDigits.length === 1) {
    return S
  }

  // search space is relatively small, let's try them all.
  // we have a non-empty search space, so null will never be returned
  let ans = null
  {
    const curSearch = new Array(4)
    const build = dep => {
      if (dep === 4) {
        const [hHi, hLo, mHi, mLo] = curSearch
        const hh = hHi*10 + hLo
        const mm = mHi*10 + mLo
        if (
          0 <= hh && hh <= 23 &&
          0 <= mm && mm <= 59
        ) {
          const ret = mkHHMM(hh,mm)
          if (ret.total <= inpHHMM.total)
            ret.total += 24*60
          if (ans === null || ans.total > ret.total)
            ans = ret
        }
        return
      }
      oneDigits.forEach(d => {
        curSearch[dep] = d
        build(dep+1)
      })
    }
    build(0)
  }
  const pprAnsHH = ans.hh >= 10 ? String(ans.hh) : `0${ans.hh}`
  const pprAnsMM = ans.mm >= 10 ? String(ans.mm) : `0${ans.mm}`
  return `${pprAnsHH}:${pprAnsMM}`
}

console.log(nextClosestTime("11:01"))
console.log(nextClosestTime("23:59"))
