#include <vector>
#include <unordered_set>
#include <string>
#include <set>
#include <algorithm>

#include <iostream>

// TODO: old left-over, seems WIP

class Solution {
public:
    std::vector<std::string> wordBreak(std::string s,
                                       std::unordered_set<std::string> &dict) {
        std::vector<std::string> results;
        std::vector<std::string> breaks;
        dfs(breaks, s.c_str(), dict, results);
        return results;
    }

    void dfs(std::vector<std::string> &currentBreak,
             const char *nextChar,
             const std::unordered_set<std::string> &dict,
             std::vector<std::string> & results) {
        if (*nextChar) {
            // still has work to do here
            for (const auto &it : dict) {
                if (it.compare(0,std::string::npos,nextChar,it.size()) == 0) {
                    currentBreak.push_back(it);
                    dfs(currentBreak,nextChar+it.size(),dict,results);
                    currentBreak.pop_back();
                }
            }
        } else {
            // here is the end of the string, time to append
            // a new string
            std::string current;
            if (currentBreak.size() >= 1) {
                current = currentBreak.front();
                for (auto it = currentBreak.begin()+1;
                     it != currentBreak.end();
                     ++it)
                    current += " " + *it;
            }
            results.push_back( current );
        }
    }
};

#include <iostream>

int main () {
    std::string s =          
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab" ;
        // "catsanddog";
    std::unordered_set<std::string> dict = {
        "a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"};

        //"cat", "cats", "and", "sand", "dog"};
    auto ans = Solution().wordBreak(s,dict);
    for (const auto &it : ans) {
        std::cout<<it <<std::endl;
    }
    return 0;
}
