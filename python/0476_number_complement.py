# https://leetcode.com/problems/number-complement/
# O(1) time complexity because the problem is limited to 32-bit integers
# O(1) space complexity
def find_complement(num):
    power_of_two = 1
    while power_of_two <= num:
        power_of_two *= 2
    return num ^ (power_of_two - 1)
