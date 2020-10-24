# https://leetcode.com/problems/add-two-numbers/
# O(max(n, m)) time complexity, where n and m are length of respective linked lists
# O(1) space complexity
def add_two_numbers(l1, l2):
    num1 = num2 = i = j = 0
    while l1 is not None:
        num1 += l1.val * 10**i
        i += 1
        l1 = l1.next
    while l2 is not None:
        num2 += l2.val * 10**j
        j += 1
        l2 = l2.next
    sum = num1 + num2
    dummy = curr = ListNode()
    while sum > 0:
        curr.next = ListNode()
        curr = curr.next
        curr.val = sum % 10
        sum //= 10
    return dummy.next


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
