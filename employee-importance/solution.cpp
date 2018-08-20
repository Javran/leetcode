#include <vector>

// Employee info
class Employee {
public:
    int id;
    int importance;
    std::vector<int> subordinates;
};

#include <vector>
#include <unordered_map>
#include <utility>
#include <functional>

class Solution {
public:
    int getImportance(std::vector<Employee*> employees, int id) {
        /*
          idea: simply build a table from id to employee info,
          and do as told.
         */
        using ETable = std::unordered_map<int, Employee*>;
        ETable tbl;
        int ans = 0;
        for (auto e : employees) {
            tbl[e->id] = e;
        }
        std::function<void(int)> collect =
            [&](int eId) mutable {
                auto e = tbl[eId];
                ans += e->importance;
                for (auto i : e->subordinates)
                    collect(i);
            };
        collect(id);
        return ans;
    }
};
