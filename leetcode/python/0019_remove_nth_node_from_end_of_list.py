# https://leetcode.com/problems/remove-nth-node-from-end-of-list/
# O(n) time complexity
# O(1) space complexity
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def remove_nth_from_end(head, n):
    dummy = ListNode()
    dummy.next = head
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast is not None:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
