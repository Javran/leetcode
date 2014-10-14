#include <string>
#include <vector>
#include <stack>
#include <cstdlib>

class Solution {
public:
    int topPop(std::stack<int> &stk) {
        int x = stk.top();
        stk.pop();
        return x;
    }

    int evalRPN(std::vector<std::string> &tokens) {
        std::stack<int> stk;

        for (std::vector<std::string>::iterator it = tokens.begin();
             it != tokens.end();
             ++ it) {
            int rand1, rand2;
            // to evaluate a RPN expression
            // one just need to maintain a stack and treat
            // tokens as operations:
            // any of "+" "-" "*" "/" means
            // to pop out two operands "rand2", "rand1" in order
            // and push the value of "rand1 + rand2", "rand1 - rand2" ... back.
#define RPN_PERFORM(X) {                        \
            rand2 = topPop(stk);                \
            rand1 = topPop(stk);                \
            stk.push( rand1 X rand2);           \
            }

            if        (*it == "+") {
                RPN_PERFORM(+);
            } else if (*it == "-") {
                RPN_PERFORM(-);
            } else if (*it == "*") {
                RPN_PERFORM(*);
            } else if (*it == "/") {
                RPN_PERFORM(/);
            } else {
                // a string of integer means to push this integer onto the stack.
                stk.push( atoi( it->c_str() ) );
            }
#undef RPN_PERFORM

        }

        // to get the result, one just need to look at the top of the stack
        // when the corresponding arithmetic of this RPN expression has all
        // parenthese balanced, the stack should contain exactly one element
        // which is the value of the whole expression
        return stk.top();
    }
};

#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,E,...) TEST(TN,T) {                                \
        const char *s[] = { __VA_ARGS__ };                              \
        std::vector<std::string> v(s,s+COUNT_OF(s));                    \
        EXPECT_EQ(E,Solution().evalRPN(v));                             \
    }

    MY_TEST(EvalRPN, Simple, 1,
            "1")
    MY_TEST(EvalRPN, Example1, 9,
            "2", "1", "+", "3", "*")
    MY_TEST(EvalRPN, Example2, 6,
            "4", "13", "5", "/", "+")
 
#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
