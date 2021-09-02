// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// O(n) time complexity
// O(min(m, n)) space complexity, where m is the size of the charSet.
import java.util.*;

class Solution_0003 {
  public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int maxLength = 0;

    for (int leftIdx = 0, rightIdx = 0; rightIdx < s.length(); rightIdx++) {
      char rightChar = s.charAt(rightIdx);
      if (map.containsKey(rightChar)) {
        leftIdx = Math.max(map.get(rightChar) + 1, leftIdx);
      }
      map.put(rightChar, rightIdx);
      maxLength = Math.max(rightIdx - leftIdx + 1, maxLength);
    }

    return maxLength;
  }
}