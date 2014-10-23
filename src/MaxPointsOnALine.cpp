#include <vector>
#include <map>
#include <algorithm>

#ifdef NOT_OJ

struct Point {
    int x;
    int y;
    Point() : x(0), y(0) {}
    Point(int a, int b) : x(a), y(b) {}
};

#endif

class Solution {
public:
    // pairwise "less than" predicate
    static bool pointLess(const Point &a, const Point &b) {
        return (a.x == b.x) ? a.y < b.y : a.x < b.x;
    }

    // this function assumes a,b,c are unique points
    bool sameLine(const Point &a, const Point &b, const Point &c) {
        // if a,b,c are in the same line, then:
        //  a.x - b.x     b.x - c.x
        // ----------- = -----------
        //  a.y - b.y     b.y - c.y
        // turn this into the following formular
        // so we don't need to care about
        // floating point numbers and fractions
        return (a.x - b.x) * (b.y - c.y) == (a.y - b.y) * (b.x - c.x);
    }

    int maxPoints(std::vector<Point> &points) {
        std::map<Point,int,bool (*) (const Point &,const Point &)> uniqPoints(pointLess);
        // count number of unique points
        // so that we can iterate key of this map
        // and have a sequence of unique points
        for (std::vector<Point>::iterator i = points.begin();
             i != points.end();
             ++i) {
            std::map<Point,int>::iterator result = 
                uniqPoints.find(*i);
            if (result == uniqPoints.end())
                uniqPoints[*i]  = 1;
            else
                result->second += 1;
        }
        
        // at least two points in a line or depending on the point list size
        // if there isn't sufficient points
        int currentMax = std::min((int)points.size(),2);

        // in case all the points are overlapping each other,
        // pick them all
        for (std::map<Point,int>::iterator i = uniqPoints.begin();
             i != uniqPoints.end();
             ++i) {
            currentMax = std::max(currentMax, i->second);
        }

        // for i <- [0..l], j <- [i+1..l],
        // an usual way to enumerate a pair of distinct points
        // these two points will form a line
        for (std::map<Point,int>::iterator i = uniqPoints.begin();
             i != uniqPoints.end();
             ++i) {
            std::map<Point,int>::iterator j = i; ++j;
            for (;
                 j != uniqPoints.end();
                 ++j) {
                // be careful that unique points are assiciated
                // with a number indicating how many points are
                // using the same coordinate as this point
                // in a word always make sure "inLinePointCount"
                // can only contain numbers from "something->second"
                int inLinePointCount = i->second + j->second;
                for (std::map<Point,int>::iterator k = uniqPoints.begin();
                     k != uniqPoints.end();
                     ++k) {
                    // enumerate all the other unique points
                    // and test if there are on this line
                    if (k == i || k == j)
                        continue;
                    if (sameLine(i->first,
                                 j->first,
                                 k->first))
                        inLinePointCount += k->second;
                }
                currentMax = std::max(currentMax, inLinePointCount);
            }
        }
        return currentMax;
    }
};

#define COUNT_OF(x) ((sizeof(x)/sizeof(0[x])) / ((size_t)(!(sizeof(x) % sizeof(0[x])))))

#include <gtest/gtest.h>

namespace {

#define MY_TEST(TN,T,E,...) TEST(TN,T) {                        \
        Point ps [] = { __VA_ARGS__ };                          \
        std::vector<Point> vec(ps,ps+COUNT_OF(ps));             \
        EXPECT_EQ(E,Solution().maxPoints(vec));       \
    }

    Point a(1,1);
    Point b(2,2);
    Point c(3,3);
    Point d(10,0);
    Point e(0,10);

    MY_TEST(MaxPointOnALine, Nothing,  0)
    MY_TEST(MaxPointOnALine, One,      1,  a)
    MY_TEST(MaxPointOnALine, Two,      2,  a,b)
    MY_TEST(MaxPointOnALine, Three,    2,  a,b,d)
    // all points are the same
    MY_TEST(MaxPointOnALine, Same,     4,  a,a,a,a)
    // only two unique coordinates
    MY_TEST(MaxPointOnALine, Same2,    5,  a,b,a,b,a)
    // there are more points on e-d line than that of a-b line
    MY_TEST(MaxPointOnALine, Greater1, 4,  a,b,c,d,d,e,e)
    // there are more points on a-b line than that of e-d line
    MY_TEST(MaxPointOnALine, Greater2, 5,  a,b,c,a,b,e,d,d,e)

#undef MY_TEST

}  // namespace

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
