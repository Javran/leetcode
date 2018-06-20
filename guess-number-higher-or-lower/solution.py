class Solution(object):
    def guessNumber(self, n):
        """
        :type n: int
        :rtype: int
        """
        # just do a binary search.
        (l, r) = (1, n)
        while True:
            mid = (l + r) // 2
            result = guess(mid)
            if result == 0:
                return mid
            elif result == -1:
                # the number is lower than mid
                r = mid-1
            elif result == 1:
                l = mid+1
