#!/usr/bin/env python3

class DisjointSetNode:
    @staticmethod
    def merge(u1, u2):
        root1, root2 = u1.findRoot(), u2.findRoot()
        if root1 != root2:
            if root1.size >= root2.size:
                rBig, rSmall = root1, root2
            else:
                rBig, rSmall = root2, root1
            rSmall.parent = rBig
            rBig.size += rSmall.size
            rSmall.size = None
            return rBig
        else:
            return root1

    def __init__(self):
        self.size = 1
        self.parent = self

    def findRoot(self):
        if self.parent == self:
            return self
        retval = self.parent.findRoot()
        self.parent = retval
        return retval

class Solution:
    @staticmethod
    def computeRightDownCoords(height,width,coord):
        i,j = coord
        isValid = lambda pair: pair[0] >= 0 and pair[0] < height and pair[1] >= 0 and pair[1] < width
        return filter(isValid, [(i+1,j), (i,j+1)])

    def largestIsland(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        # initialize union set
        dSet = {}
        height, width = len(grid), len(grid[0])
        for i in range(height):
            for j in range(width):
                coord = i,j
                if grid[i][j]:
                    dSet[coord] = DisjointSetNode()

        # reconstruct edges
        for coord, v in dSet.items():
            ns = Solution.computeRightDownCoords(height,width,coord)
            for coord1 in ns:
                i1, j1 = coord1
                if grid[i1][j1]:
                    DisjointSetNode.merge(dSet[coord], dSet[coord1])

Solution().largestIsland([
    [1,0,1,1],
    [0,1,0,1],
    [0,0,0,1],
])
