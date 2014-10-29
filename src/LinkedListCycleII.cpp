#ifdef NOT_OJ

struct ListNode {
    int val;
    ListNode *next = nullptr;
    ListNode(int x) : val(x){}
};

#endif

class Solution {
public:
    ListNode * forward(ListNode *l) {
        return l == nullptr ? nullptr : l->next;
    }

    ListNode *detectCycle(ListNode *head) {
        // see: https://en.wikipedia.org/wiki/Cycle_detection#Tortoise_and_hare
        ListNode *slow, *fast;
        // slow pointer bumps once at a time,
        // while fast point bumps twice at a time.
        slow = fast = head;
        do {
            fast = forward( forward( fast ));
            if (!fast)
                // so if we can reach the nullptr,
                // there is no cycle
                return nullptr;
            slow = slow->next;
        } while (slow != fast);
        // otherwise there must be a cycle,
        // without two pointers cannot meet.
        ListNode *p1, *p2;
        // cycleLen is initialized as 1 because every node
        // except "slow" itself will be counted in the following for-loop
        int cycleLen = 1;
        // detect the length of the cycle,
        // we make slow pointer still, and move p1 pointer
        for (p1 = slow->next; p1 != slow; p1 = p1->next)
            ++ cycleLen;
        // start from head again
        p1 = p2 = head;
        for (int i=0; i<cycleLen; ++i)
            p2 = p2->next;
        // this time, we make the distance between p1 and p2 a constant.
        // this constant is equal to the length of the cycle
        while (p1 != p2) {
            p1 = p1->next;
            p2 = p2->next;
        }
        // when two pointers meet each other the first time,
        // they must be standing at the node that begins the cycle.
        return p1;
    }
};

#include <map>
#include <vector>

std::map<int, ListNode*> prepareLinkedList(std::vector<int> vec,
                                           int listSize) {
    std::map<int, ListNode*> nodes;
    for (int i=0;i<listSize;++i)
        nodes[i] = new ListNode(i);
    for (auto it = vec.begin();
         it != vec.end() && it+1 != vec.end();
         ++it) {
        nodes[*it]->next = nodes[*(it+1)];
    }
    return nodes;
}

void destroyLinkedList(std::map<int,ListNode*> &nodes) {
    for (auto it = nodes.begin();
         it != nodes.end();
         ++it)
        delete it->second;
}

#define QUOTE(...) __VA_ARGS__

#include <gtest/gtest.h>

namespace {

    // EXP: -1 if we are expecting nullptr being returned.
    //      otherwise it is the value associated with
    //      the node that begins the cycle
    // SIZE: how many nodes are generated
    // INP: a sequence of non-empty integers
    //      describing how nodes are linked.
    //      e.g. 0,1,2 stands for 0->1->2
    //           0,1,2,0 stands for 0->1->2->0
    //           note the second one contains a cycle

#define MY_TEST(TN,T,EXP,SIZE,INP) TEST(TN,T) {         \
        auto nodes = prepareLinkedList({INP},SIZE);     \
        auto result = Solution()                        \
            .detectCycle(nodes.size() > 0               \
                         ? nodes[0]                     \
                         : nullptr);                    \
        if (EXP == -1)                                  \
            ASSERT_EQ(nullptr,result);                  \
        else                                            \
            ASSERT_EQ(EXP,result->val);                 \
        destroyLinkedList(nodes);                       \
    }

    MY_TEST(LinkedListCycleII, Nil,
            -1,0,QUOTE())
    MY_TEST(LinkedListCycleII, NoLoop,
            -1,5,QUOTE(0,1,2,3,4))
    MY_TEST(LinkedListCycleII, AllCycle,
            0,3,QUOTE(0,1,2,0))
    MY_TEST(LinkedListCycleII, Cycle1,
            3,8,QUOTE(0,1,2,3,4,5,6,7,3))

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
