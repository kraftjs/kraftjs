// TypeScript generics allow you to write functions that can work with a
// variety of types. Declare a function that works with a generic type and
// the concrete type can be specified later by the caller of the function.

// A generic is a piece of code that can handle values of multiple types, which
// are specified when the code is used during a function invocation or class
// instantiation.

// Arrays can be initialized as number[] or Array<number>. The latter is a
// generic array declaration and it's parameter is <number>.

class Person {
  name: string;
}

class Employee extends Person {
  department: number;
}

class Animal {
  name: string;
  breed: string;
}

const workers: Array<Person> = [];
workers[0] = new Person();
workers[1] = new Employee(); // Employee is a Person
// The variable of type person expects an object that has a name property, and
// the Animal object has one. The types are compatible.
workers[2] = new Animal();
// Object literals also work if the structure is compatible with the
// parameter type.
workers[3] = { name: 'Mary' };

/*This fails because Person is not compatible with Animal. It doesn't have a
breed property. They do not have the same structure. This makes sense: if
the following was allowed, worker.breed wouldn't exist.*/
// const worker: Animal = new Person();

/* ------------------------------------------------------------------------- */

// When all elements of the array have the same type, you can use the syntax
// used to declare values1—it’s easier to read and write.
const values1: string[] = ['Mary', 'Joe'];
const values2: Array<string> = ['Mary', 'Joe'];

// But if an array can store elements of different types, you can use generics
// to restrict the types allowed in the array
const values3: Array<string | number> = ['Joe', 123, 567];

/* ------------------------------------------------------------------------- */

// Generic types in action. Notice the class must specify the type of the
// generic in its declaration. You could avoid this if you added a default
// parameter to the generic
// (i.e. interface Comparator<T = any> { ... }

interface Comparator<T> {
  compareTo(value: T): number;
}

class Rectangle implements Comparator<Rectangle> {
  constructor(private width: number, private height: number) {}

  compareTo(value: Rectangle): number {
    return this.width * this.height - value.width * value.height;
  }
}

const rect1: Rectangle = new Rectangle(2, 5);
const rect2: Rectangle = new Rectangle(2, 3);

rect1.compareTo(rect2) > 0
  ? console.log('rect1 is bigger')
  : rect1.compareTo(rect2) == 0
  ? console.log('rectangles are equal')
  : console.log('rect1 is smaller');

class Programmer implements Comparator<Programmer> {
  constructor(public name: string, private salary: number) {}

  compareTo(value: Programmer): number {
    return this.salary - value.salary;
  }
}

const prog1: Programmer = new Programmer('John', 20000);
const prog2: Programmer = new Programmer('Alex', 30000);

prog1.compareTo(prog2) > 0
  ? console.log(`${prog1.name} is richer`)
  : prog1.compareTo(prog2) == 0
  ? console.log(`${prog1.name} and ${prog2.name} earn the same amounts.`)
  : console.log(`${prog1.name} is poorer.`);

/* ------------------------------------------------------------------------- */

// Generic function
function printMe<T>(content: T): T {
  console.log(content);
  return content;
}

const printMeArrow = <T>(content: T): T => {
  console.log(content);
  return content;
};

const a = printMe('hello');
const b = printMeArrow('world');

class User {
  constructor(public username: string) {}
}

const c = printMe(new User('Joe'));
const d = printMeArrow(new User('Jim'));

/* ------------------------------------------------------------------------- */

// Convoluted example of generics with both a generic class and function

class Pair<K, V> {
  constructor(public key: K, public value: V) {}
}

function compare<K, V>(pair1: Pair<K, V>, pair2: Pair<K, V>): boolean {
  return pair1.key === pair2.key && pair1.value === pair2.value;
}

let p1: Pair<number, string> = new Pair(1, 'Apple');
let p2 = new Pair(1, 'Orange'); // Type inference
console.log(compare<number, string>(p1, p2)); // explicit type

let p3 = new Pair('first', 'Apple');
let p4 = new Pair('first', 'Apple');
console.log(compare(p3, p4));

/* ------------------------------------------------------------------------- */

// Another generic example

interface User {
  name: string;
  role: UserRole;
}

enum UserRole {
  Administrator = 'admin',
  Manager = 'manager',
}

function loadUser<T>(): T {
  return JSON.parse('{ "name": "john", "role": "admin" }');
}

const user = loadUser<User>();
switch (user.role) {
  case UserRole.Administrator:
    console.log('Show control panel');
    break;
  case UserRole.Manager:
    console.log('Hide control panel');
    break;
}

/* ------------------------------------------------------------------------- */

// Higher-Order function
// If a function can receive a function as an argument or return another
// function, we call it a higher-order function

const outerFunc = (someValue: number) => (multiplier: number) =>
  someValue * multiplier;
// innerFunc is a closure that knows someValue = 10
const innerFunc = outerFunc(10);
// invoke closure
let result = innerFunc(5);
console.log(result); // prints 50

/* ------------------------------------------------------------------------- */

// Generic higher-order function
type numFunc<T> = (arg: T) => (x: number) => number;

const noArgFunc: numFunc<void> = () => (c: number) => c + 5;

const numArgFunc: numFunc<number> = (someValue: number) => (
  multiplier: number,
) => someValue * multiplier;

const stringArgFunc: numFunc<string> = (someText: string) => (
  padding: number,
) => someText.length + padding;
