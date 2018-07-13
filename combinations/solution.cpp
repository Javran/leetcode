#include <iostream>
#include <vector>
#include <functional>

using IntVec = std::vector<int>;

class Solution {
public:
    std::vector<std::vector<int>> combine(int n, int k) {
        std::vector<IntVec> out;
        if (k > n)
            return out;

        std::vector<int> cur(k);
        std::function<void(int, int)> gen = [&](int dep, int gt) mutable {
          if (dep == k) {
              out.emplace_back(cur);
              return;
          }
          // not gonna make it if we have insufficient # of candidates
          if (k-dep > n-gt+1)
              return;
          for (int i = gt; i <= n; ++i) {
              cur[dep] = i;
              gen(dep+1, i+1);
          }
        };
        gen(0,1);

        return out;
    }
};
