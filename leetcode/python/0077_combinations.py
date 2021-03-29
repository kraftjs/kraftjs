# https://leetcode.com/problems/combinations/
# O(n! / ((n-k)! * k!) * k) time complexity
# O(n! / ((n-k)! * k!)) space complexity, where
# n is length of number set and k is size of combination
def combine(n, k):
    def backtrack(combination=None, start=0):
        if len(combination) == k:
            output.append(combination[:])
        else:
            if not combination:
                combination = []
            for i in range(start, n + 1):
                combination.append(i)
                backtrack(combination, i + 1)
                combination.pop()

    output = []
    backtrack()
    return output
