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

def mkIsValid(h,w):
    def isValid(pair):
        x,y = pair
        return x >= 0 and x < h and y >= 0 and y < w
    return isValid

class Solution:
    @staticmethod
    def computeRightDownCoords(height,width,coord):
        i,j = coord
        return filter(mkIsValid(height,width), [(i+1,j), (i,j+1)])

    def computeAllDirCoords(height, width, coord):
        i,j = coord
        return filter(mkIsValid(height,width), [(i-1,j),(i+1,j),(i,j-1),(i,j+1)])

    def largestIsland(self, grid):
        """
        :type grid: List[List[int]]
        :rtype: int
        """
        # initialize union set
        dSet = {}
        emptyCells = set()
        height, width = len(grid), len(grid[0])
        for i in range(height):
            for j in range(width):
                coord = i,j
                if grid[i][j]:
                    dSet[coord] = DisjointSetNode()
                else:
                    emptyCells.add(coord)

        # reconstruct edges
        for coord, v in dSet.items():
            ns = Solution.computeRightDownCoords(height,width,coord)
            for coord1 in ns:
                i1, j1 = coord1
                if grid[i1][j1]:
                    DisjointSetNode.merge(dSet[coord], dSet[coord1])

        if len(emptyCells) == 0:
            # all cells are set, nothing to do really
            #   just pick one root and return its size
            #   because all cells should be connected so there's only one root
            return dSet[(0,0)].findRoot().size

        maxSize = 0
        for coord in emptyCells:
            ns = Solution.computeAllDirCoords(height,width,coord)
            def get(coord1):
                if coord1 in dSet:
                    return dSet[coord1].findRoot()
                else:
                    return None
            rootSet = set(filter(lambda x: x, map(get, ns)))
            sz = 1
            for s in rootSet:
                sz += s.findRoot().size
            maxSize = max(maxSize, sz)
        return maxSize

print(Solution().largestIsland([
    [1,0,1,1],
    [0,1,0,1],
    [0,0,0,1],
]))
