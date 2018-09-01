/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
const findItinerary = tickets => {
  // Map<Loc, {nexts: Array[Loc]>
  const graph = new Map()
  const getRecord = loc => {
    let record
    if (graph.has(loc)) {
      return graph.get(loc)
    } else {
      record = []
      graph.set(loc, record)
      return record
    }
  }
  tickets.forEach(([tFrom, tTo]) => {
    getRecord(tFrom).push(tTo)
  })
  graph.forEach((record, k) => {
    record.sort((a,b) => a === b ? 0 : a < b ? 1 : -1)
  })
  let ans = []
  const go = curLoc => {
    if (graph.has(curLoc)) {
      const locRecord = graph.get(curLoc)
      while (locRecord.length > 0) {
        const nextLoc = locRecord.pop()
        go(nextLoc)
      }
    }
    ans.push(curLoc)
  }
  go("JFK")
  return ans.reverse()
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(findItinerary)
f([["JFK","ATL"],["ORD","PHL"],["JFK","ORD"],["PHX","LAX"],["LAX","JFK"],["PHL","ATL"],["ATL","PHX"]])(
  ["JFK","ATL","PHX","LAX","JFK","ORD","PHL","ATL"]
)

f([["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]])(
  ["JFK", "MUC", "LHR", "SFO", "SJC"]
)
f([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])(
  ["JFK","ATL","JFK","SFO","ATL","SFO"]
)

f([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]])(["JFK","NRT","JFK","KUL"])
