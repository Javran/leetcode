/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
const merge = segs => {
  if (!Array.isArray(segs) || segs.length <= 1)
    return segs

  // as segments are one-off, we can actually do without copying
  // const cp = v => new Interval(v.start, v.end)
  const ans = []
  // sort by staring pos
  segs.sort((x,y) => x.start - y.start)
  // keeping a tmpSeg to be put into ans
  let tmpSeg = segs[0]
  segs.forEach(seg => {
    if (seg.start <= tmpSeg.end) {
      // next seg is connected,
      // try extending the end
      if (tmpSeg.end < seg.end)
        tmpSeg.end = seg.end
    } else {
      // should break at this position
      ans.push(tmpSeg)
      tmpSeg = seg
    }
  })
  ans.push(tmpSeg)
  return ans
}

const tr = xs => xs.map(x => ({start: x[0], end: x[1]}))
console.log(
  merge(tr([[1,3],[2,6],[8,10],[15,18]]))
)
console.log(
  merge(tr([[1,3],[2,6],[8,10],[10,18]]))
)
