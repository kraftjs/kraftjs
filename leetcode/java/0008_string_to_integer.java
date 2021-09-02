// https://leetcode.com/problems/string-to-integer-atoi/
// O(n) time complexity
// O(1) space complexity
class Solution_0008 {
  public int myAtoi(String s) {
    if (s == null || s.length() == 0) return 0;
    int index = 0, sign = 1, result = 0;
    
    while (index < s.length() && s.charAt(index) == ' ') {
      index++;
    }
    
    if (index < s.length() && (s.charAt(index) == '-' || s.charAt(index) == '+')) {
      sign = s.charAt(index) == '-' ? -1 : 1;
      index++;
    }
    
    while (index < s.length() && Character.isDigit(s.charAt(index))) {
      int digit = s.charAt(index++) - '0';
      if (result > (Integer.MAX_VALUE - digit) / 10) {
        return sign == -1 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
      }
      result = result * 10 + digit;
    }
    
    return result * sign;
  }
}
