#include <string>
#include <vector>
#include <iostream>

class Solution {
public:
    std::string longestCommonPrefix(std::vector<std::string>& strs) {
        if (strs.size() == 0)
            return "";
        if (strs.size() == 1)
            return strs.front();
        auto ans = strs.front().length();
        // let it2 be 1 further way from it1, making it a zip
        auto it1 = strs.begin(), it2 = strs.begin();
        for (++it2; it2 < strs.end() && ans > 0; ++it1, ++it2) {
            if (ans > it2->length()) {
                ans = it2->length();
            }
            for (auto i = 0U; i < ans; ++i) {
                if ((*it2)[i] != (*it1)[i]) {
                    ans = i;
                    break;
                }
            }
        }
        return strs.front().substr(0, ans);
    }
};
