// https://leetcode.com/problems/palindrome-number/
// O(log(n)) time complexity
// O(1) space complexity
function isPalindrome(num) {
  if (num < 0 || (num % 10 === 0 && num !== 0)) {
    return false;
  }

  let balancedNumber = 0;
  while (num > balancedNumber) {
    balancedNumber = balancedNumber * 10 + (num % 10);
    num = Math.floor(num / 10);
  }

  return num === balancedNumber || num === Math.floor(balancedNumber / 10);
}
