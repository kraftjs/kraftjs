# https://leetcode.com/problems/permutations-ii/
# O(n * n!) time complexity
# 0(n * n!) space complexity
def get_unique_permutations(nums):
    def backtrack(nums, path=[]):
        if not nums:
            output.append(path)
            return
        for i in range(len(nums)):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            backtrack(nums[:i] + nums[i+1:], path + [nums[i]])

    nums.sort()
    output = []
    backtrack(nums)
    return output
