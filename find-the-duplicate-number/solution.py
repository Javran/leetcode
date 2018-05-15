#!/usr/bin/env python3

# TODO: incorrect.

class Solution:
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        n = len(nums)-1
        nSum = n*(n-1) // 2
        allSum = sum(nums)
        return allSum - nSum
