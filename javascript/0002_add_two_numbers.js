// https://leetcode.com/problems/add-two-numbers/
// O(max(n, m)) time complexity
// O(max(n, m)) space complexity, where
// n and m are lengths of the first linkedList and second linkedList
function addTwoNumbers(l1, l2) {
  const dummyHead = new ListNode();
  let carry = 0,
    listNode1 = l1,
    listNode2 = l2,
    currentNode = dummyHead;

  while (listNode1 !== null || listNode2 != null) {
    const num1 = listNode1 !== null ? listNode1.val : 0;
    const num2 = listNode2 !== null ? listNode2.val : 0;
    const sum = num1 + num2 + carry;

    carry = Math.floor(sum / 10);
    currentNode.next = new ListNode(sum % 10);
    currentNode = currentNode.next;

    if (listNode1 !== null) listNode1 = listNode1.next;
    if (listNode2 !== null) listNode2 = listNode2.next;
  }

  if (carry !== 0) {
    currentNode.next = new ListNode(carry);
  }

  return dummyHead.next;
}
