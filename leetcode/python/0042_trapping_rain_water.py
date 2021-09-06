# https://leetcode.com/problems/trapping-rain-water/
# O(n) time complexity
# O(1) space complexity
def trapping_rain_water(heights):
    max_left = max_right = area = 0
    left_bound, right_bound = 0, len(heights) - 1

    while left_bound < right_bound:
        if heights[left_bound] < heights[right_bound]:
            if heights[left_bound] > max_left:
                max_left = heights[left_bound]
            else:
                area += max_left - heights[left_bound]
            left_bound += 1
        else:
            if heights[right_bound] > max_right:
                max_right = heights[right_bound]
            else:
                area += max_right - heights[right_bound]
            right_bound -= 1

    return area
