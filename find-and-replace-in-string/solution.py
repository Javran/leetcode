#!/usr/bin/env python3

# a Plan is just the tuple (index, src, tgt)
# for indicating a "find-and-replace" plan
class Plan:
    def __init__(self, index, src, tgt):
        self.index = index
        self.src = src
        self.tgt = tgt

    def __str__(self):
        return "({}, {}, {})".format(self.index, self.src, self.tgt)

class Solution:
    def findReplaceString(self, S, indexes, sources, targets):
        """
        :type S: str
        :type indexes: List[int]
        :type sources: List[str]
        :type targets: List[str]
        :rtype: str
        """
        def mk(tup):
            i, s, t = tup
            return Plan(i,s,t)

        # construct plans, and sort plans by index,
        # this allows us to process in order
        plans = sorted(map(mk, zip(indexes, sources, targets)), key=lambda x: x.index)
        # delay string concat - there is no need building intermediate strings
        strList = []

        # basically just a loop
        def buildResult(curInd):
            # skipping plans outside of range
            while len(plans) > 0 and plans[0].index < curInd:
                plans.pop(0)
            # all plans are process, appending remaining content
            if len(plans) == 0:
                strList.append(S[curInd:])
                return
            # move pointer forward
            if plans[0].index > curInd:
                strList.append(S[curInd:plans[0].index])
                return buildResult(plans[0].index)
            # plan location.
            elif plans[0].index == curInd:
                plan = plans[0]
                if S[curInd:curInd+len(plan.src)] == plan.src:
                    # source matching
                    strList.append(plan.tgt)
                    plans.pop(0)
                    return buildResult(curInd+len(plan.src))
                else:
                    # source mismatch, aborting this plan
                    plans.pop(0)
                    return buildResult(curInd)
            else:
                assert False, "Unreachable"
        buildResult(0)
        return ''.join(strList)

print(Solution().findReplaceString("abcdk", [0,2], ["a", "cu"], ["eee", "ffff"]))
print(Solution().findReplaceString("abcd", [0,2], ["ab", "ec"], ["eee", "ffff"]))
