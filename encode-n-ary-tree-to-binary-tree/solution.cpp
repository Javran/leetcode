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

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#include <vector>
#include <algorithm>

// https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree

class Codec {
    TreeNode* encAux(
        Node* root,
        decltype(Node::children.begin()) sBegin,
        decltype(sBegin) sEnd
    ) {
        if (root == nullptr)
            return nullptr;
        TreeNode * newNode = new TreeNode(root->val);
        newNode->left = root->children.size() > 0 ?
            encAux(
                root->children.front(),
                root->children.begin()+1,
                root->children.end()
            ) : nullptr;
        newNode->right = sBegin < sEnd ?
            encAux(*sBegin, sBegin+1, sEnd) : nullptr;
        return newNode;
    }

    decltype(Node::children) decodeAux(TreeNode* root) {
        decltype(Node::children) sibs;
        if (root == nullptr)
            return sibs;
        decltype(Node::children) cs = decodeAux(root->left);
        std::reverse(cs.begin(), cs.end());
        Node *newNode = new Node(root->val, cs);
        sibs = decodeAux(root->right);
        sibs.push_back(newNode);
        return sibs;
    }

public:
    // Encodes an n-ary tree to a binary tree.
    TreeNode* encode(Node* root) {
        decltype(root->children) dummy;
        return encAux(root, dummy.begin(), dummy.end());
    }

    // Decodes your binary tree to an n-ary tree.
    Node* decode(TreeNode* root) {
        auto ret = decodeAux(root);
        if (ret.size() > 0) {
            return ret.front();
        } else {
            return nullptr;
        }
    }
};
