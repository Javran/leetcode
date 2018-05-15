#!/usr/bin/env python3

# given n+1 numbers ranged from [1..n], there should be at least one duplicated number
#
# try binary search:
# - for a number m (pick from middle point of current range)
#   - count # of elements equal to that, if its > 1, we are done
#   - now at this point, we have excluded number m - either because
#     it does not existing in the list or it appears only once,
#     and either case are eliminated. so we should look for numbers
#     in range [1..m-1] and [m+1..n] - we know there are duplicates
#     and all duplicates are the same, so exactly one range will overflow
#     so we can continue our search from there.

class Solution:
    def findDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        def tryRange(l,r):
            # INVARIANT: l <= r
            mid = (l+r) // 2
            ltM, eqM, gtM = 0, 0, 0
            for num in nums:
                # only search the range of interest
                if num < l or num > r:
                    continue
                if num < mid:
                    ltM += 1
                elif num > mid:
                    gtM += 1
                else:
                    eqM += 1
            if eqM > 1:
                return mid
            ltExpect = (mid-1) - l + 1
            gtExpect = r - (mid+1) + 1
            if ltM > ltExpect and l <= mid-1:
                return tryRange(l,mid-1)
            if gtM > gtExpect and mid+1 <= r:
                return tryRange(mid+1,r)
            assert False, "unreachable"
        return tryRange(1,len(nums)-1)

print(Solution().findDuplicate([2,5,9,6,9,3,8,9,7,1]))
