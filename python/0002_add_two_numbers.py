# https://leetcode.com/problems/add-two-numbers/
# O(max(n, m)) time complexity, where n and m are length of respective linked lists
# O(max(n, m) space complexity
def add_two_numbers(l1, l2):
    dummy = curr = ListNode()
    carry = 0
    while l1 or l2:
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        sum = carry + x + y
        carry = sum // 10
        curr.next = ListNode(sum % 10)
        curr = curr.next
        l1 = l1.next if l1 else l1
        l2 = l2.next if l2 else l2
    if carry > 0:
        curr.next = ListNode(carry)
    return dummy.next


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
