#include <iostream>
#include <string>

class Solution {
public:
    inline short encode(char c) {
        // do a simply encoding to:
        // - unify lower && upper cases
        // - keeping digits unique as well
        // - identify chars that we are not interested in (0xFF)
        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            return c & 31;
        }
        if (c >= '0' && c <= '9') {
            return 32 | (c & 15);
        }
        return 0xFF;
    }

    bool isPalindrome(std::string s) {
        int i = 0;
        int j = s.length()-1;
        short ei, ej;
        do {
            while (i < j && (ei = encode(s[i])) == 0xFF)
                ++i;
            while (i < j && (ej = encode(s[j])) == 0xFF)
                --j;
            if (i < j && ei != ej)
                return false;
            ++i, --j;
        } while (i < j);
        return true;
    }
};
