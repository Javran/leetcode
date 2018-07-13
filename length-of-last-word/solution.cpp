#include <string>

class Solution {
public:
    int lengthOfLastWord(std::string s) {
        auto i = s.size()-1;
        while (i >= 0 && s[i] == ' ')
            --i;
        if (i < 0)
            return 0;
        // i: position to last non-empty char past 1
        int j = i;
        while (j >= 0 && s[j] != ' ')
            --j;
        // j: position past 1 of last word
        return i-j;
    }
};
