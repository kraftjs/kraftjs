# https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/
# O(log(n)) time complexity
# O(1) space complexity
def number_of_steps(num):
    count = 0
    while num > 0:
        num = num / 2 if num % 2 == 0 else num - 1
        count += 1
    return count
