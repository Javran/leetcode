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

    // see LinkedListCycleII.cpp for explanation
    bool hasCycle(ListNode *head) {
        ListNode *slow, *fast;
        slow = fast = head;
        do {
            fast = forward( forward( fast ));
            if (!fast)
                return false;
            slow = slow->next;
        } while (slow != fast);
        return true;
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

    // EXP: expected boolean value
    // SIZE: how many nodes are generated
    // INP: a sequence of non-empty integers
    //      describing how nodes are linked.
    //      e.g. 0,1,2 stands for 0->1->2
    //           0,1,2,0 stands for 0->1->2->0
    //           note the second one contains a cycle

#define MY_TEST(TN,T,EXP,SIZE,INP) TEST(TN,T) {         \
        auto nodes = prepareLinkedList({INP},SIZE);     \
        auto result = Solution()                        \
            .hasCycle(nodes.size() > 0                  \
                      ? nodes[0]                        \
                      : nullptr);                       \
        ASSERT_EQ(EXP,result);                          \
        destroyLinkedList(nodes);                       \
    }

    MY_TEST(LinkedListCycle, Nil,
            false,0,QUOTE())
    MY_TEST(LinkedListCycle, NoLoop,
            false,5,QUOTE(0,1,2,3,4))
    MY_TEST(LinkedListCycle, AllCycle,
            true,3,QUOTE(0,1,2,0))
    MY_TEST(LinkedListCycle, Cycle1,
            true,8,QUOTE(0,1,2,3,4,5,6,7,3))

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
