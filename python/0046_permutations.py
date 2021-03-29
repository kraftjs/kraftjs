# https://leetcode.com/problems/permutations/
# O(n! * n) time complexity
# 0(n! * n) space complexity
def get_permutations(nums):
    def backtrack(start=0):
        if start == len(nums) - 1:
            output.append(nums[:])
        else:
            for i in range(start, len(nums)):
                nums[start], nums[i] = nums[i], nums[start]
                backtrack(start + 1)
                nums[start], nums[i] = nums[i], nums[start]
    output = []
    backtrack()
    return output
