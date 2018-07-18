/**
 * @param {string} ip
 * @param {number} n
 * @return {string[]}
 */
const ipToCIDR = (ipRaw, n) => {
  let curIpRep = new Int8Array(32)
  {
    // convert to a binary array rep
    let i = 0
    ipRaw.split('.').map(x => {
      for (let base = 1 << 7; base > 0; base >>= 1) {
        if (x >= base) {
          x -= base
          curIpRep[i] = 1
          ++i
        } else {
          curIpRep[i] = 0
          ++i
        }
      }
    })
  }
  const ans = []
  // convert intermediate result and save as final ones
  const record = (ipRep, zCount) => {
    const gs = [
      ipRep.slice(0,8),
      ipRep.slice(8,16),
      ipRep.slice(16,24),
      ipRep.slice(24,32),
    ].map(r => {
      return parseInt(r.join(''), 2)
    })
    ans.push(`${gs.join('.')}/${32-zCount}`)
  }
  while (n > 0) {
    /*
       find out how many IPs can current group contain,
       which is done by count how many ending zeros are there:

       - no 0 at the end: 1
       - XXX10 => 2 (XXX10, XXX11)
       - XXX100 => 4 (XXX100, XXX101, XXX110, XXX111)
       - ..
     */
    let zInd = 31
    while (zInd >= 0 && curIpRep[zInd] === 0)
      --zInd
    // zInd+1: last 0, 31 - zInd bits to use for current grp
    const zCount = 31 - zInd
    const capacity = 2 ** zCount
    if (capacity >= n) {
      // when we have enough capacity, fill as many as we can
      // and continue
      const bits = Math.floor(Math.log2(n))
      const mx = 1 << bits
      n -= mx
      record(curIpRep, bits)
      const tmp = Int8Array.from(curIpRep)
      for (let i = 32-bits; i < 32; ++i)
        tmp[i] = 0
      {
        let c = 1
        let ind = 31-bits
        while (ind >= 0 && c === 1) {
          if (tmp[ind] === 1) {
            tmp[ind] = 0
            c = 1
          } else {
            tmp[ind] = 1
            c = 0
          }
          --ind
        }
      }
      curIpRep = tmp
    } else {
      // if we have insufficient space in current group, we fill the most we can
      // and move on
      n -= capacity
      record(curIpRep, zCount)
      // console.log('before', curIpRep.join(''), zInd)
      const tmp = Int8Array.from(curIpRep)
      // reminder: zInd points to the first 1 (from end)
      {
        let c = 1
        let ind = zInd
        while (ind >= 0 && c === 1) {
          if (tmp[ind] === 1) {
            tmp[ind] = 0
            c = 1
          } else {
            tmp[ind] = 1
            c = 0
          }
          --ind
        }
      }
      for (let i = zInd+1; i < 32; ++i)
        tmp[i] = 0
      // console.log('after ', tmp.join(''))
      curIpRep = tmp
    }
  }
  return ans
}

console.log(ipToCIDR("255.0.0.7", 10+6))
