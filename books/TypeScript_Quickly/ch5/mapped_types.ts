// MAPPED TYPES

/** READONLY mapped type: (code below from lib.es5.d.ts)
 *
 * type Readonly<T> = {
 *   readonly [P in keyof T]: T[P];
 * };
 *
 * The mapped type Readonly makes all properties in the given type readonly. */

interface Person {
  name: string;
  age: number;
}

function doStuff(person: Readonly<Person>) {
  // person.age = 10; // cant assign to age because it is a readonly property
}

/* ------------------------------------------------------------------------- */

/** PARTIAL mapped type: (code below from lib.es5.d.ts)
 *
 * type Partial<T> = {
 *   [P in keyof T]?: T[P];
 * };
 *
 * The mapped type Partial makes all properties in the given type optional. */

// const worker1: Person = { name: 'John' }; // Property age is missing
const worker2: Partial<Person> = { name: 'John' }; // Ok

/* ------------------------------------------------------------------------- */

/** REQUIRED mapped type (code below from lib.es5.d.ts)
 *
 * type Required<T> = {
 *   [P in keyof T]-?: T[P];
 * };
 *
 * The mapped type Required makes all properties required. */

interface PersonPropOptional {
  name?: string;
  age?: number;
}

// allowed because age is optional
const worker1: PersonPropOptional = { name: 'John' };

// compile error. Required mapped type makes all properties non-optional
// const worker2: Required<PersonPropOptional> = { name: 'John' };

/* ------------------------------------------------------------------------- */

/** PICK mapped type (code below from lib.es5.d.ts)
 *
 * type Pick<T, K extends keyof T> = {
 *   [P in K]: T[P];
 * };
 *
 * The mapped type Pick allows you to declare a new type by picking a subset
 * of properties of the given type. */

interface ManyOptionsPerson {
  name: string;
  age: number;
  address: string;
}

type PersonNameAddress<T, K> = Pick<ManyOptionsPerson, 'name' | 'address'>;

/* ------------------------------------------------------------------------- */

// keyof type query

const persons: Person[] = [
  { name: 'John', age: 32 },
  { name: 'Mary', age: 39 },
];

function filterBy<T, P extends keyof T>(property: P, value: T[P], array: T[]) {
  return array.filter((item) => item[property] === value);
}

console.log(filterBy('name', 'John', persons));

// won't work because 'lastName' isn't a property of Person, P doesn't extend T
// console.log(filterBy('lastName', 'John', persons));

// won't work because 'twenty' isn't a valid type of 'age', not valid T[P]
// console.log(filterBy('age', 'twenty', persons));

/* ------------------------------------------------------------------------- */

// Overruling readonly properties with keyof

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

// Minus sign in front of readonly qualifier removes it from all properties of
// the given type.
type Modifiable<T> = {
  -readonly [P in keyof T]: T[P];
};
