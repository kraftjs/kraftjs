// https://leetcode.com/problems/roman-to-integer/
// O(n) time complexity
// O(n) space complexity, where
// n is the length of the roman numeral string.
function romanToInt(s) {
  const ROMAN_VALUES = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const romanCharacterArray = [...s];
  const int = romanCharacterArray.reduceRight(
    (accumulator, numeral, i, arr) => {
      if (
        i < arr.length - 1 &&
        ROMAN_VALUES[arr[i]] < ROMAN_VALUES[arr[i + 1]]
      ) {
        return accumulator - ROMAN_VALUES[numeral];
      } else {
        return accumulator + ROMAN_VALUES[numeral];
      }
    },
    0,
  );
  return int;
}
