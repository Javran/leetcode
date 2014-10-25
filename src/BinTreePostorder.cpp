#include <vector>
#include <stack>
#include <utility>

// The exercise isn't clear about what does it mean
// by "do it iteratively".
// I guess it is intended to let us do it without recursive calls.
// The simplest way of doing this is to maintain the stack manually
// to mimic the recursive version.
// Without some bookkeeping technique like mutating pointers
// to encode some structural information,
// I don't think a stateless iterative traversal algorithm is possible.

#ifdef NOT_OJ

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

#endif

class Solution {
public:
    std::vector<int> postorderTraversal(TreeNode *root) {
        // "out" vector holds all outputs
        std::vector<int> out;
        // One stack is sufficient.
        // We will use the stack as a "task list".

        // here is how we are going to achieve it:
        // let stack elements being pairs,
        // whose first parts are nodes we are focusing on
        // and second parts are boolean flags.

        // setting this boolean flag to true
        // means we are going to print the value of this node out,
        // and setting this boolean flag to false
        // means it is the first time we examine this node,
        // we push some tasks to the stack and make sure
        // these tasks are executed in an expected order.
        std::stack< std::pair<TreeNode *,bool> > stk;

        // begin with the top element
        pushNewTask(stk, root);

        // every time we look at the top of the stack
        // if the stack is empty, we are done.
        // otherwise we pop the top element
        // and examine its second part.
        while (! stk.empty() ) {
            auto top = stk.top();
            stk.pop();

            if (top.second) {
                // print it out
                out.push_back( top.first->val );
            } else {
                // this is the first time we have seen
                // this node,
                // we need to do things in this order:
                // 1. do things recursively on its left node
                // 2. do things recursively on its right node
                // 3. print out the value of this node
                // we need to push these tasks in reverse order
                // so that these tasks will be popped in the correct order

                // (task 3) next time we see this element,
                // we will print it out
                top.second = true;
                stk.push(top);
                // (task 2) traverse its right tree
                pushNewTask(stk,top.first->right);
                // (task 1) traverse its left tree
                pushNewTask(stk,top.first->left);
            }
        }

        return out;
    }

    // push a new task of visiting one node to the stack
    // the node can be empty, in which case this function
    // does nothing.
    static void pushNewTask(std::stack<
                              std::pair<TreeNode * ,bool> > & stk,
                            TreeNode * node) {
        if (node)
            stk.push( std::make_pair(node,false) );
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
        auto result = Solution().postorderTraversal(t);                 \
        ASSERT_EQ(result.size(), expect.size());                        \
        ASSERT_TRUE(std::equal(expect.begin(),                          \
                               expect.end(),                            \
                               result.begin() ));                       \
        destructTree(t);                                                \
    }

    MY_TEST(BinTreePostorder,Example,
            QUOTE(3,2,1),
            QUOTE(1,-1,2,3))
    MY_TEST(BinTreePostorder,Full,
            QUOTE(4,5,2,6,3,1),
            QUOTE(1,2,4,-1,-1,5,-1,-1,3,6))
    MY_TEST(BinTreePostorder,Random,
            QUOTE(3,2,8,9,7,6,5,4,1),
            QUOTE(1,2,-1,3,-1,-1,4,5,7,8,-1,-1,9,-1,-1,6))

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
