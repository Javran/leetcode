from collections import deque
INF = 2147483647

class Solution(object):
    def wallsAndGates(self, rooms):
        """
        :type rooms: List[List[int]]
        :rtype: void Do not return anything, modify rooms in-place instead.
        """
        queue = deque()
        rows = len(rooms)
        # to problem test case setter: fuck you.
        if rows == 0:
            return
        cols = len(rooms[0])
        if cols == 0:
            return
        for rInd, curRow in enumerate(rooms):
            for cInd, cell in enumerate(curRow):
                if cell == 0:
                    queue.append((rInd, cInd))
        def getCell(coord):
            row, col = coord
            if row < 0 or row >= rows or col < 0 or col >= cols:
                return None
            else:
                return rooms[row][col]

        # standard search
        while len(queue) > 0:
            rInd, cInd = queue.popleft()
            cellVal = rooms[rInd][cInd]
            nextVal = cellVal + 1
            def testCoordAndQueue(coord1):
                rInd1, cInd1 = coord1
                val1 = getCell(coord1)
                if val1 is not None and val1 != -1 and val1 > nextVal:
                    rooms[rInd1][cInd1] = nextVal
                    queue.append(coord1)
            for cd in [(rInd, cInd-1), (rInd, cInd+1), (rInd-1, cInd), (rInd+1, cInd)]:
                testCoordAndQueue(cd)


rooms = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF],
]

Solution().wallsAndGates(rooms)
print(rooms)
