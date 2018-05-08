#!/usr/bin/env python3

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# "Add Two Numbers", recursive version
#   for some reason it seems this non-tail recursive version
#   works fast and the code itself is simple, so let's keep it this way.

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
    def show(self):
        print(self.val)
        if self.next:
            self.next.show()

class Solution:
    zero = ListNode(0)

    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        ret = Solution.addTwoNumsAux(l1,l2,0)
        if ret is None:
            # this situation only happens
            #   when result of adding them togther is zero, which requires
            #   a non-empty rep.
            return Solution.zero
        else:
            return ret

    @staticmethod
    def get(v):
        if v is None:
            return (0, None)
        else:
            return (v.val, v.next)

    @staticmethod
    def addTwoNumsAux(l1, l2, carry):
        # short-circuiting:
        #   when either l1 or l2 is missing and no carry
        #   we can just use the non-zero one right away
        if carry == 0:
            if l1 is None:
                return l2
            if l2 is None:
                return l1

        (l1Val, l1Next) = Solution.get(l1)
        (l2Val, l2Next) = Solution.get(l2)
        carry += l1Val + l2Val
        if carry == 0 and l1Next is None and l2Next is None:
            return None
        else:
            (q,r) = divmod(carry, 10)
            curNode = ListNode(r)
            curNode.next = Solution.addTwoNumsAux(l1Next, l2Next, q)
            return curNode

def mk(xs):
    init = ListNode(None)
    curr = init
    for x in xs:
        newNode = ListNode(x)
        curr.next = newNode
        curr = curr.next
    return init.next

#a = mk([0,0,0,1])
#b = mk([0,0,1,2,3,4])
#Solution().addTwoNumbers(a,b).show()
