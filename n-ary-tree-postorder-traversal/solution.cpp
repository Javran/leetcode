#include <vector>

// Definition for a Node.
class Node {
public:
    int val;
    std::vector<Node*> children;

    Node() {}

    Node(int _val, std::vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};

#include <vector>
#include <functional>

class Solution {
public:
    std::vector<int> postorder(Node* root) {
        /*
          idea: standard approach.
         */
        std::vector<int> out;
        std::function<void(Node*)> go = [&](Node *cur) mutable {
            if (cur != nullptr) {
                for (auto c : cur->children)
                    go(c);
                out.push_back(cur->val);
            }
        };
        go(root);
        return out;
    }
};
