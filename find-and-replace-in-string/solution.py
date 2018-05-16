#!/usr/bin/env python3

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

        plans = sorted(map(mk, zip(indexes, sources, targets)), key=lambda x: x.index)
        strList = []

        def buildResult(curInd):
            # skipping plans outside of range
            while len(plans) > 0 and plans[0].index < curInd:
                plans.pop(0)
            if len(plans) == 0:
                strList.append(S[curInd:])
                return
            if plans[0].index > curInd:
                strList.append(S[curInd:plans[0].index])
                return buildResult(plans[0].index)
            elif plans[0].index == curInd:
                plan = plans[0]
                if S[curInd:curInd+len(plan.src)] == plan.src:
                    strList.append(plan.tgt)
                    plans.pop(0)
                    return buildResult(curInd+len(plan.src))
                else:
                    plans.pop(0)
                    return buildResult(curInd)
            else:
                print('here3')
                return
        buildResult(0)
        return ''.join(strList)

print(Solution().findReplaceString("abcdk", [0,2], ["a", "cu"], ["eee", "ffff"]))
print(Solution().findReplaceString("abcd", [0,2], ["ab", "ec"], ["eee", "ffff"]))
