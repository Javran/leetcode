#include <string>
#include <stack>
#include <cctype>

class Solution {
public:
    void reverseWords(std::string &s) {
        std::stack<std::string> words;
        std::string::iterator i = s.begin();

        while (i != s.end()) {
            // skip leading spaces
            while (i != s.end() && isspace(*i))
                ++i;

            // at this point,
            // we make sure that "i" always lands
            // on a non-space character
            // or "i == s.end()"
            std::string::iterator j = i;
            while (j != s.end() && ! isspace(*j))
                ++j;

            // either j reaches the end && !isspace(j-1)
            // or isspace(j) but !isspace(j-1)
            // it's guaranteed that isspace(j-1)
            // a full word is detected from i to j-1
            // (this might be an empty word in which case
            // we ignore it)
            // it might be the case where
            int len = (j-1)-i+1;
            if (len > 0)
                words.push( s.substr( i-s.begin(), len) );
            i = j;
        }

        // concat string in reverse order
        // by using the stack
        std::string result = "";
        while (! words.empty() ) {
            result += words.top();
            result += " ";
            words.pop();
        }
        
        // as long as there's something added to the result
        // the last charater is not necessary
        // so we remove it.
        if (!result.empty())
            result.erase( result.end() - 1);

        // apply the change to s
        s.assign(result);
    }
};

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,E,X) TEST(TN,T) {                           \
        std::string expect = E;                                  \
        std::string s = X;                                       \
        Solution().reverseWords(s);                              \
        EXPECT_EQ(expect,s);                                     \
    }

    MY_TEST(ReverseWords, Example, "blue is sky the", "the sky is blue")
    MY_TEST(ReverseWords, Spaces, "spaces are there", "   \n\n there   are spaces  \t ")

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
