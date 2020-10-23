# https://leetcode.com/problems/merge-two-sorted-lists/
# O(n + m) time complexity, where n and m are lengths of the two linked lists
# O(1) space complexity
def merge_two_lists(l1, l2):
    dummy = prev = ListNode()
    while l1 and l2:
        if l1.val <= l2.val:
            prev.next = l1
            l1 = l1.next
        else:
            prev.next = l2
            l2 = l2.next
        prev = prev.next
    prev.next = l1 if l1 is not None else l2
    return dummy.next


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
