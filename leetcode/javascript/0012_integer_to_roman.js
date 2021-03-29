// https://leetcode.com/problems/integer-to-roman/
// O(log(n) + k) time complexity
// O(k) space complexity, where
// n is the input number and k is the length of converted roman numeral
function intToRoman(num) {
  const MAP_INT_TO_ROMAN = new Map([
    [1000, ['_', '_', 'M']],
    [100, ['M', 'D', 'C']],
    [10, ['C', 'L', 'X']],
    [1, ['X', 'V', 'I']],
  ]);

  const romanConverterHelper = (arr, num, factorOfTen, romanNumerals) => {
    while (num >= factorOfTen) {
      if (num >= 9 * factorOfTen) {
        arr.push(romanNumerals[2] + romanNumerals[0]);
        num -= 9 * factorOfTen;
      } else if (num >= 5 * factorOfTen) {
        arr.push(romanNumerals[1]);
        num -= 5 * factorOfTen;
      } else if (num >= 4 * factorOfTen) {
        arr.push(romanNumerals[2] + romanNumerals[1]);
        num -= 4 * factorOfTen;
      } else {
        arr.push(romanNumerals[2]);
        num -= factorOfTen;
      }
    }
    return num;
  };
  let convertedToRoman = [];
  for (const [factorOfTen, romanNumerals] of MAP_INT_TO_ROMAN.entries()) {
    num = romanConverterHelper(
      convertedToRoman,
      num,
      factorOfTen,
      romanNumerals,
    );
  }
  return convertedToRoman.join('');
}
