# https://leetcode.com/problems/reverse-linked-list/
# O(n) time complexity
# O(1) space complexity
def reverse_list(head):
    curr = head
    prev = None
    while curr:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev
