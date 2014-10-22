#include <cstdlib>
#include <utility>

#ifdef NOT_OJ

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

#endif

class Solution {
public:
    // "p = forward( p )" is almost the same as
    // "p = p->next" except when "p == NULL"
    // it returns "NULL" instead of crash.
    ListNode * forward(ListNode *l) {
        return l == NULL ? NULL : l->next;
    }

    std::pair<ListNode *,ListNode *> cutHalf(ListNode *head) {
        ListNode *mid, *pioneer;
        mid = pioneer = head;
        while (pioneer != NULL) {
            // when it is possible for the pioneer pointer to go forward twice
            pioneer = forward( forward( pioneer ));
            if (pioneer != NULL)
                // the "slower" point (a.k.a. "mid")
                // goes forward once.
                mid = mid->next;
            // therefore "mid" is always a valid pointer
            // and cuts the linked list between "head" and "pioneer"
            // in half
        }
        // store two linked list heads
        ListNode *l = head, *r = mid->next;
        // cut the list in half
        mid->next = NULL;
        return std::make_pair(l,r);
    }

    ListNode *mergeSortedLists(ListNode *l1, ListNode *l2) {
        // trivial cases
        if (l1 == NULL) return l2;
        if (l2 == NULL) return l1;

        // from now on, l1 and l2 are both non-NULL
        ListNode *head, *curr;
        // choose head element
        if (l1->val <= l2->val) {
            head = l1;
            l1 = l1->next;
        } else {
            head = l2;
            l2 = l2->next;
        }
        curr = head;
        // remember here that head has been removed from either l1 or l2
        // and "head->next" (a.k.a. "curr->next") is no longer valid
        curr->next = NULL;
        while ((l1 != NULL) && (l2 != NULL)) {
            // at this point, "curr->next" is always invalid
            // we can set it to "NULL" but this is not necessary
            // as the following statements
            // will assign it a suitable value
            if (l1->val <= l2->val) {
                curr->next=l1;
                l1 = l1->next;
            } else {
                curr->next=l2;
                l2 = l2->next;
            }
            // move forward
            curr = curr->next;
        }
        // at this point, either l1 == NULL or l2 == NULL
        // we connect "curr" with the remaining non-NULL linked-list
        if (l1 == NULL)
            curr->next = l2;
        else
            curr->next = l1;
        return head;
    }

    ListNode *sortList(ListNode *head) {
        // trivial case, size = 0 or size = 1
        if (head == NULL || head->next == NULL)
            return head;
        
        // cut the linked list in half
        std::pair<ListNode *,ListNode *> halfLists = cutHalf(head);

        // sort these two halves recursively
        if (halfLists.first)
            halfLists.first = sortList( halfLists.first );
        if (halfLists.second)
            halfLists.second = sortList( halfLists.second );
        
        // merge sorted linked lists
        return mergeSortedLists(halfLists.first, halfLists.second);
    }
};

// verify that the linked list is indeed sorted,
// as a quick check, we also make sure that
// the linked list has the same number of elements
// as the input data. (nothing is dropped when sorting the list)
bool isSorted(ListNode *head, size_t n) {
    if (head == NULL)
        return true;
    int prevVal = head->val;
    size_t count = 1;
    for (ListNode *it = head->next;
         it != NULL;
         it = it->next) {
        if (prevVal <= it->val) {
            ++count;
            prevVal = it->val;
        } else
            return false;
    }
    return n == count;
}

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
    while (head != NULL) {
        ListNode *prev = head;
        head = head -> next;
        delete prev;
    }
}

#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,...) TEST(TN,T) {                       \
        int a [] = { __VA_ARGS__ };                          \
        ListNode* head = toLinkedList(a,COUNT_OF(a));        \
        head = Solution().sortList(head);                    \
        ASSERT_TRUE(isSorted(head,COUNT_OF(a)));             \
        destroyLinkedList(head);                             \
    }

    MY_TEST(SortList, Random, 1,9,2,8,3,7,4,0,6,5)
    MY_TEST(SortList, Ord,    1,2,3)
    MY_TEST(SortList, Single, 1)
    MY_TEST(SortList, Empty   )
    MY_TEST(SortList, Rev,    8,7,6,5,4,4,4,3,2,1)

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}

// Local variables:
// flycheck-gcc-definitions: ("NOT_OJ")
// End:
