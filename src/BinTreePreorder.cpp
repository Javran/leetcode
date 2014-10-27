#include <vector>
#include <stack>
#include <utility>

#ifdef NOT_OJ

struct TreeNode {
    int val;
    TreeNode *left = nullptr;
    TreeNode *right = nullptr;
    TreeNode(int x) : val(x) {}
};

#endif

class Solution {
public:
    std::vector<int> preorderTraversal(TreeNode *root) {
        std::vector<int> out;
        // one stack is sufficient
        // for preorder binary tree traversal
        std::stack<TreeNode *> stk;
        // start from the root
        // we want to make sure that
        // the stack will contain no null pointers
        maybePush(stk,root);
        while (! stk.empty() ) {
            auto top = stk.top();
            stk.pop();
            // "output" it
            out.push_back(top->val);
            // push tasks onto the stack
            // note here we push them in backward order
            // but the tasks will be popped in the intended
            // order due to the natural of stacks
            maybePush(stk,top->right);
            maybePush(stk,top->left);
        }
        return out;
    }

    // null pointer-safe stack push
    void maybePush(std::stack<TreeNode *> & stk, TreeNode * root) {
        if (root)
            stk.push(root);
    }
};

#include <algorithm>
#include <list>
#include <iostream>
#include <string>

// for testcase preparation
// get next element from the list,
// if element isn't sufficient,
// "-1" will be returned.
int getNext(std::list<int> & ls) {
    if (ls.empty())
        return -1;
    int x = ls.front();
    ls.pop_front();
    return x;
}

// for testcase preparation
// turn this tree into a string representation
// which is ready to be printed out
std::string strOfTree(TreeNode *root) {
    if (root)
        return "("
            + std::to_string(root->val)
            + " "
            + strOfTree(root->left)
            + " "
            + strOfTree(root->right)
            + ")";
    else
        return "_";
}

// for testcase preparation
// deserialize a binary tree from its preorder traversal
// sequence. it is assumed that all elements are non-negative
// and "-1" stands for null nodes
TreeNode *buildTree(std::list<int> & ls) {
    int x = getNext(ls);
    if (x == -1)
        return nullptr;
    TreeNode *root = new TreeNode(x);
    root->left = buildTree(ls);
    root->right = buildTree(ls);
    return root;
}

// for testcase tearing down
// release a binary tree generated
// at testcase preparation stage
void destructTree(TreeNode *root) {
    if (root) {
        destructTree(root->left);
        destructTree(root->right);
        delete root;
    }
}

#include <gtest/gtest.h>

namespace {

#define QUOTE(...) __VA_ARGS__

#define MY_TEST(TN,T,EXPECT,TREE) TEST(TN,T) {                          \
        std::list<int> treeList {TREE} ;                                \
        std::vector<int> expect {EXPECT} ;                              \
        TreeNode *t = buildTree( treeList );                            \
        auto result = Solution().preorderTraversal(t);                  \
        ASSERT_EQ(result.size(), expect.size());                        \
        ASSERT_TRUE(std::equal(expect.begin(),                          \
                               expect.end(),                            \
                               result.begin() ));                       \
        destructTree(t);                                                \
    }

    MY_TEST(BinTreePreorder,Example,
            QUOTE(1,2,3),
            QUOTE(1,-1,2,3))
    MY_TEST(BinTreePreorder,Full,
            QUOTE(1,2,4,5,3,6),
            QUOTE(1,2,4,-1,-1,5,-1,-1,3,6))
    MY_TEST(BinTreePreorder,Random,
            QUOTE(1,2,3,4,5,7,8,9,6),
            QUOTE(1,2,-1,3,-1,-1,4,5,7,8,-1,-1,9,-1,-1,6))

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
