/**
 * @param {Interval[]} intervals
 * @return {boolean}
 */
const canAttendMeetings = ivs => {
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
