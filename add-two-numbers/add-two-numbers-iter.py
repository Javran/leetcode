#!/usr/bin/env python3

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

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
        ret = Solution.addTwoNumsAux(l1,l2)
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
    def addTwoNumsAux(l1Inp, l2Inp):
        carry = 0
        l1, l2 = l1Inp, l2Inp
        init = ListNode(None)
        curr = init

        while not (carry == 0 and l1 is None and l2 is None):
            # short-circuiting:
            #   when either l1 or l2 is missing and no carry
            #   we can just use the non-zero one right away
            if carry == 0:
                if l1 is None:
                    curr.next = l2
                    curr = curr.next
                    break
                if l2 is None:
                    curr.next = l1
                    curr = curr.next
                    break
            (l1Val, l1Next) = Solution.get(l1)
            (l2Val, l2Next) = Solution.get(l2)
            carry += l1Val + l2Val
            if carry == 0 and l1Next is None and l2Next is None:
                break
            else:
                (q,r) = divmod(carry, 10)
                curNode = ListNode(r)
                curr.next = curNode
                curr = curr.next
                carry, l1, l2 = q, l1Next, l2Next

        return init.next

def mk(xs):
    init = ListNode(None)
    curr = init
    for x in xs:
        newNode = ListNode(x)
        curr.next = newNode
        curr = curr.next
    return init.next

# a = mk([0,0,0,1])
# b = mk([0,0,1,2,3,4])
# Solution().addTwoNumbers(a,b).show()
