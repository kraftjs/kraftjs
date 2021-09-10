# https://leetcode.com/problems/k-closest-points-to-origin/
# O(n * log(k)) time complexity
# O(k) space complexity
import heapq


def k_closest(points, k):
    heap = []

    for (x, y) in points:
        dist = (x * x + y * y)
        if len(heap) < k:
            heapq.heappush(heap, (-dist, x, y))
        else:
            heapq.heappushpop(heap, (-dist, x, y))

    return [(x, y) for (_, x, y) in heap]
