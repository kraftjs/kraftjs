# https://leetcode.com/problems/3sum-closest/
# O(n^2) time complexity
# O(1) space complexity
def three_sum_closest(nums, target):
    nums.sort()
    diff = float('inf')
    for i in range(len(nums)):
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < target:
                left += 1
            elif total > target:
                right -= 1
            else:
                return target
            diff = target - total if abs(target - total) < abs(diff) else diff
    return target - diff