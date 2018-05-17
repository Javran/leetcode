#!/usr/bin/env python3

class Solution:
    def uniquePathsWithObstacles(self, grid):
        """
        :type obstacleGrid: List[List[int]]
        :rtype: int
        """
        w, h = len(grid[0]), len(grid)
        ansRows = [[0 for _ in range(w)] for _x in range(2)]
        if grid[0][0] == 0:
            ansRows[0][0] = 1
        for rowInd, row in enumerate(grid):
            ansRowInd = rowInd % 2
            # alternating between 0 and 1
            prevAnsRowInd = 1 - ansRowInd
            ansRow = ansRows[ansRowInd]
            prevAnsRow = ansRows[prevAnsRowInd]
            for colInd, cell in enumerate(row):
                if rowInd == 0 and colInd == 0:
                    continue
                if cell == 1:
                    ansRow[colInd] = 0
                else:
                    ans = 0
                    if colInd > 0:
                        ans += ansRow[colInd-1]
                    if rowInd > 0:
                        ans += prevAnsRow[colInd]
                    ansRow[colInd] = ans
        return ansRows[(h-1) % 2][-1]

print(
    Solution().uniquePathsWithObstacles([
        [1],
    ])
)
