# https://leetcode.com/problems/container-with-most-water/
# O(n) time complexity
# O(1) space complexity
def find_max_area(heights):
    left, right, max_area = 0, len(heights) - 1, 0
    while left < right:
        area = min(heights[left], heights[right]) * (right - left)
        max_area = max(max_area, area)
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    return max_area
