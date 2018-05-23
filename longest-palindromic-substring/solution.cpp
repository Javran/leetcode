#include <string>
#include <iostream>
#include <cstdio>
#include <cassert>

class Solution {
public:
    std::string longestPalindrome(std::string s) {
        int slen = s.length();
        if (slen == 0)
            return s;

        // at least one.
        int beginInd = 0, endInd = 0, maxLen = 1;
        // try odds first.
        for (int i = 0; i < slen; ++i) {
            int j;
            // try different lengths
            for (j = 1; i-j >= 0 && i+j < slen; ++j) {
                if (s[i-j] != s[i+j])
                    break;
            }
            // either j just outside of range or we have a mismatch
            --j;

            if (i-j >= 0 && i+j < slen && j*2+1 > maxLen) {
                beginInd = i-j;
                endInd = i+j;
                maxLen = j*2 + 1;
            }
        }

        // try evens
        for (int i = 0; i < slen; ++i) {
            int j;
            // now i stands for using s[i] | s[i+1] as middle point.
            for (j = 1; i-j+1 >= 0 && i+j < slen; ++j) {
                if (s[i-j+1] != s[i+j])
                    break;
            }
            --j;
            if (i-j+1 >= 0 && i+j < slen && j*2 > maxLen) {
                beginInd = i-j+1;
                endInd = i+j;
                maxLen = j*2;
            }
        }
        
        return s.substr(beginInd, maxLen);
    }
};

int main() {
    Solution s = Solution();
    std::cout << s.longestPalindrome("fasdffdsafcabacgg");
    return 0;
}
