# https://leetcode.com/problems/combination-sum/
# O(n^T)) time complexity
# O(T) space complexity
# T is the target value
# n is the number of distinct values in nums
def combination_sum(nums, target):
    def backtrack(remainder, start=0, combination=None):
        if remainder == 0 and combination:
            output.append(combination[:])
            return
        elif remainder > 0:
            if not combination:
                combination = []
            for i in range(start, len(nums)):
                combination.append(nums[i])
                backtrack(remainder - nums[i], i, combination)
                combination.pop()
    output = []
    backtrack(target)
    return output
