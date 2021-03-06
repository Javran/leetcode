#include <utility>
#include <tuple>

#ifdef NOT_OJ

struct ListNode {
    int val;
    ListNode *next = nullptr;
    ListNode(int x) : val(x){}
};

#endif

class Solution {
public:
    // copied from SortList.cpp
    ListNode * forward(ListNode *l) {
        return l == nullptr ? nullptr : l->next;
    }

    // copied from SortList.cpp
    std::pair<ListNode *,ListNode *> cutHalf(ListNode *head) {
        ListNode *mid, *pioneer;
        mid = pioneer = head;
        while (pioneer != nullptr) {
            pioneer = forward( forward( pioneer ));
            if (pioneer != nullptr)
                mid = mid->next;
        }
        ListNode *l = head, *r = mid->next;
        mid->next = nullptr;
        return std::make_pair(l,r);
    }

    void reorderList(ListNode *head) {
        if (!head)
            return;
        // observe the pattern:
        // reordering 0,1,2,...,n-1,n
        // into 0,n,1,n-1,...
        // we can simply cut this list into half
        ListNode *l,*r;
        std::tie(l,r) = cutHalf(head);
        // reverse the second list,
        r = reverseList(r);
        // and interleave two lists together.
        interleave(l,r);
    }

    // reverse a singly linked list
    ListNode *reverseList(ListNode *head) {
        // to reverse a list,
        // we traverse all the nodes
        // and re-insert them as we see them
        // this can be done in O(1)
        // with O(1) extra space
        ListNode *newHead = nullptr;
        ListNode *curr = head;
        while (curr) {
            // next node to be visited
            ListNode *next = curr->next;
            // insert element into new list
            curr->next = newHead;
            newHead = curr;
            // move to the next node (in the original list)
            curr = next;
        }
        return newHead;
    }

    // interleave two lists
    ListNode* interleave(ListNode *xs, ListNode *ys) {
        if (! xs)
            return ys;
        if (! ys)
            return xs;
        // at this point we can assure that
        // xs != null && ys != null
        ListNode *head = xs;
        ListNode *xNext = nullptr;
        ListNode *yNext = nullptr;

        while (xs && ys) {
            // xNext and yNext are next elements
            // to be visited
            xNext = xs->next;
            yNext = ys->next;
            // the net effect of following operation
            // is that "ys" gots inserted
            // in between "xs" and old "xs->next"
            xs->next = ys;
            ys->next = xNext;
            xs = xNext;
            ys = yNext;
        }
        // two cases:
        // 1. ys != null
        // we re-insert the rest of "ys"
        if (ys)
            ys->next = yNext;
        // 2. ys == null
        // nothing to be done in this case
        return head;
    }
};

#include <cstdlib>

// Linked list creation / deletion for tests
ListNode *toLinkedList(int a[], size_t l) {
    ListNode dummy(0);
    ListNode *prev = &dummy;
    for (unsigned int i=0; i<l; ++i) {
        prev->next = new ListNode(a[i]);
        prev = prev->next;
    }
    return dummy.next;
}

void destroyLinkedList(ListNode *head) {
    while (head != nullptr) {
        ListNode *prev = head;
        head = head -> next;
        delete prev;
    }
}

// Test if two linked lists are equal
bool linkedListEqual(const ListNode *a , const ListNode *b) {
    if (! a && ! b)
        return true;
    if (a && b) {
        return a->val == b->val && linkedListEqual(a->next,b->next);
    }
    return false;
}

#define QUOTE(...) __VA_ARGS__
#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,EXP,INP) TEST(TN,T) {                         \
        int inp [] = { INP };                                      \
        int exp [] = { EXP };                                      \
        ListNode *headInp = toLinkedList(inp,COUNT_OF(inp));       \
        ListNode *headExp = toLinkedList(exp,COUNT_OF(exp));       \
        Solution().reorderList(headInp);                           \
        ASSERT_TRUE( linkedListEqual(headExp, headInp) );          \
        destroyLinkedList(headInp);                                \
        destroyLinkedList(headExp);                                \
    }

    MY_TEST(ReorderList, Example,
            QUOTE(1,4,2,3), QUOTE(1,2,3,4))
    MY_TEST(ReorderList, Longer,
            QUOTE(1,9,2,8,3,7,4,6,5),
            QUOTE(1,2,3,4,5,6,7,8,9))
    MY_TEST(ReorderList, Nil,
            QUOTE(),
            QUOTE())
    MY_TEST(ReorderList, Singleton,
            QUOTE(0),
            QUOTE(0))

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
