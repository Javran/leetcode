function Interval(start, end) {
  this.start = start
  this.end = end
}

/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
const insert = (intervals, newInterval) => {
  let i = 0
  while (i < intervals.length && intervals[i].end < newInterval.start) {
    ++i
  }
  let ans = intervals.slice(0,i)
  const cur = newInterval
  while (i < intervals.length && !(cur.end < intervals[i].start)) {
    const inv = intervals[i]
    // try to merge.
    if (cur.start > inv.start)
      cur.start = inv.start
    if (cur.end < inv.end)
      cur.end = inv.end
    ++i
  }
  ans.push(cur)
  ans = ans.concat(intervals.slice(i))
  return ans
}
