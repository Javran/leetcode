#include <vector>

// Definition for a Node.
class Node {
public:
    int val = 0;
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
    std::vector<std::vector<int>> levelOrder(Node* root) {
        std::vector<std::vector<int>> out;
        if (root == nullptr)
            return out;
        std::function<void(size_t, Node*)> go = [&](size_t dep, Node* cur) mutable {
          if (out.size() == dep) {
              out.emplace_back();
          }
          out[dep].emplace_back(cur->val);
          for (auto c : cur->children) {
              go(dep+1, c);
          }
        };
        go(0, root);
        return out;
    }
};
