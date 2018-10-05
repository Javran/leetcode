/**
 * @param {Interval[]} intervals
 * @return {boolean}
 */
const canAttendMeetings = ivs => {
  /*
     idea: sort by start time, move time forward and see
     if there are conflictions.
     because for an Interval, we have start < end,
     the "end time" will always be pushed forward, allowing conflictions
     to be discovered.
   */
  ivs.sort((u,v) => u.start - v.start)
  let endTime = -Infinity
  for (let i = 0; i < ivs.length; ++i) {
    const {start, end} = ivs[i]
    if (start >= endTime) {
      endTime = end
    } else {
      return false
    }
  }
  return true
}
