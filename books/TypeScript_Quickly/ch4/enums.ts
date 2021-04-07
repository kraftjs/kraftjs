// Enumerations allow you to create limited sets of named constants that have
// something in common. Such constants can be numbers or strings.

enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

let dayOff = Weekdays.Tuesday;
console.log(Weekdays[3]); // prints Wednesday

/* ------------------------------------------------------------------------- */

enum Direction {
  FtoC,
  CtoF,
}

function convertTemperature(temp: number, fromTo: Direction): number {
  return Direction.FtoC === fromTo
    ? ((temp - 32) * 5.0) / 9.0
    : (temp * 9.0) / 5.0 + 32;
}

console.log(`70F is ${convertTemperature(70, Direction.FtoC)}C`);
console.log(`21C is ${convertTemperature(21, Direction.CtoF)}F`);
// Enum prevents erroneous values. Prevent is too strong of a verb. If a number
// other than 0 or 1 was provided to the convertTemperature() function, then it
// would erroneously try to convert from Celsius to Fahrenheit. Enums just make
// it more difficult to make the mistake.
// console.log(`35C is ${convertTemperature(35, 'ABCD')}F`);

/* ------------------------------------------------------------------------- */

// Enums declared with const do not generate JavaScript when compiled.
// Using const with enum results in more concise JavaScript, but keep in mind
// that because there is no JavaScript code to represent your enum, you may run
// into some limitations. For example, you won’t be able to retrieve a numeric
// enum member’s name with its value.

const enum Directions {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const theNextMove = Directions.Down;
