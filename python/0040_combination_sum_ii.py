# https://leetcode.com/problems/combination-sum-ii/
# O(n * 2^n) time complexity
# 0(2^n) space complexity
# Not certain on space complexity because of rule against duplicates
# But maybe it grows at a factor of 2^n
def combination_sum_ii(candidates, target):
    def backtrack(remainder, combination=None, start=0):
        if combination is None:
            combination = []
        if remainder == 0:
            output.append(combination[:])
        elif remainder > 0:
            for i in range(start, len(candidates)):
                if candidates[i] > remainder:
                    break
                elif i > start and candidates[i] == candidates[i - 1]:
                    continue
                combination.append(candidates[i])
                backtrack(remainder - candidates[i], combination, i + 1)
                combination.pop()

    output = []
    if candidates:
        candidates.sort()
        backtrack(target)
    return output
