#include <string>
#include <vector>
#include <numeric>

class Solution {
public:
    static const std::vector<char> init;
    std::string countAndSay(int n) {
        std::vector<char> now = init;
        for (/* */; n > 1; --n) {
            std::vector<char> nxt;
            next(now, nxt);
            now = nxt;
        }
        return std::accumulate(
            now.begin(), now.end(),
            std::string(""),
            [](std::string a, int b) {
                return a + std::to_string(b);
            }
        );
    }

    void next(const std::vector<char> &st, std::vector<char> &out) {
        auto i = 0U;
        while (i < st.size()) {
            // count
            auto j = i;
            for (/* */; j < st.size() && st[j] == st[i]; ++j)
                ;
            // say
            out.push_back(j-i);
            out.push_back(st[i]);
            i = j;
        }
    }
};

const std::vector<char> Solution::init = std::vector<char>({1});
