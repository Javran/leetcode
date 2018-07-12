struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        if (!head)
            return nullptr;
        auto lastVal = head->val;
        // last moves forward and lprev is one ->next away to allow cutting.
        auto last = head->next, lprev = head;
        auto cur = head->next;
        for (/* */; cur; cur = cur->next) {
            if (cur->val != lastVal) {
                last->val = cur->val;
                lastVal = cur->val;
                lprev = last;
                last = last->next;
            }
        }
        lprev->next = nullptr;
        return head;
    }
};
