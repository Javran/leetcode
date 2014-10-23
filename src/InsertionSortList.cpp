#include <cstdlib>

#ifdef NOT_OJ

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

#endif

class Solution {
public:
    ListNode *insertElement(ListNode *head, ListNode *elem) {
        if (elem->val < head->val) {
            // insert right before the first element
            elem->next = head;
            return elem;
        }

        ListNode *prev = head;
        ListNode *curr = head->next;
        while (curr != NULL && elem->val > curr->val) {
            prev = curr;
            curr = curr->next;
        }

        // either "curr = NULL", in which case "prev" is the last element
        // or "elem->val <= curr->val", in which case
        // we know that "elem->val > prev->val" and "prev" is the last element
        // that keeps this greater-than property.
        // in all of the cases above, we should insert "elem"
        // in between "prev" and "curr"
        prev->next = elem;
        elem->next = curr;
        return head;
    }

    ListNode *insertionSortList(ListNode *head) {
        // trivial cases
        if (head == NULL || head->next == NULL)
            return head;

        // cut out the head of the list,
        // and the head becomes a non-empty sorted linked list
        // we iterate through rest of the list and insert them into the sorted one
        ListNode *curr = head->next;
        head->next = NULL;
        while (curr != NULL) {
            ListNode *next = curr->next;
            // cut the current one out
            curr->next = NULL;
            head = insertElement(head,curr);
            curr = next;
        }
        return head;
    }
};

// --- The following part are mostly copied from SortList.cpp

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
        head = Solution().insertionSortList(head);                    \
        ASSERT_TRUE(isSorted(head,COUNT_OF(a)));             \
        destroyLinkedList(head);                             \
    }

    MY_TEST(InsertionSortList, Random, 1,9,2,8,3,7,4,0,6,5)
    MY_TEST(InsertionSortList, Ord,    1,2,3)
    MY_TEST(InsertionSortList, Single, 1)
    MY_TEST(InsertionSortList, Empty   )
    MY_TEST(InsertionSortList, Rev,    8,7,6,5,4,4,4,3,2,1)

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
