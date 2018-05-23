#include <stdio.h>
#include <stdlib.h>

struct Pair {
    int x, y;
};

struct Pairs {
    int capacity;
    int count;
    struct Pair *ptr;
};

// report that pair (a,b) (representing (a,b,0-a-b)) is found
typedef void TPairFound(int a, int b, struct Pairs *ps);

int compare_int(const void *ra, const void *rb) {
    return *(const int*)ra - *(const int*)rb;
}

void search(int* nums, int numsSize, int* curList, int selectedCount, TPairFound pairFound, struct Pairs *ps) {
    // already have 2, we just need to find (0-a-b) in the rest of the list
    if (selectedCount == 2) {
        const int targetVal = -(curList[0]+curList[1]);
        int loInd = 0, hiInd = numsSize-1;
        while (loInd <= hiInd) {
            int midInd = (loInd + hiInd)/2;
            if (nums[midInd] == targetVal) {
                pairFound(curList[0], curList[1], ps);
                return;
            }
            if (nums[midInd] > targetVal) {
                hiInd = midInd - 1;
            } else {
                // nums[midInd] < targetVal
                loInd = midInd + 1;
            }
        }
        for (int i = 0; i < numsSize; ++i) {
            if (nums[i] == targetVal) {
                pairFound(curList[0], curList[1], ps);
                return;
            }
        }
        return;
    }

    for (int i = 0; i < numsSize; ++i) {
        curList[selectedCount] = nums[i];
        search(nums+i+1, numsSize-(i+1), curList, selectedCount+1, pairFound, ps);
    }
}

void on_pair_found(int a, int b, struct Pairs *ps) {
    for (int i = 0; i < ps->count; ++i) {
        struct Pair *curPair = (ps->ptr + i);
        if (a == curPair->x && b == curPair->y)
            return;
    }

    if (ps->count + 1 > ps->capacity) {
        ps->capacity = ps->capacity * 2;
        ps->ptr = realloc(ps->ptr, ps->capacity);
    }
    printf("(%d, %d)\n", a, b);
    ps->ptr[ps->count].x = a;
    ps->ptr[ps->count].y = b;
    ++(ps->count);
}

/**
 * Return an array of arrays of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** threeSum(int* nums, int numsSize, int* returnSize) {
    int curList[2];
    struct Pairs ps;
    ps.capacity = 512;
    ps.ptr = malloc(sizeof(struct Pairs) * ps.capacity);
    ps.count = 0;

    // to make sure that we have a sorted list
    qsort(nums, numsSize, sizeof(int), compare_int);
    search(nums, numsSize, curList, 0, on_pair_found, &ps);

    int **retArr = malloc(ps.count * sizeof(int *));
    for (int i = 0; i < ps.count; ++i) {
        retArr[i] = malloc(sizeof(int)*3);
        int x = ps.ptr[i].x, y = ps.ptr[i].y;
        retArr[i][0] = x;
        retArr[i][1] = y;
        retArr[i][2] = -x-y;
    }
    *returnSize = ps.count;
    free(ps.ptr);
    return retArr;
}

int main() {
    int xs[] = {4,-1,0,1,2,-1};
    int x;
    threeSum(xs, sizeof(xs)/sizeof(xs[0]), &x);
    return 0;
}
