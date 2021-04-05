interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

function savePerson(person: Person): void {
  console.log('Saving ', person);
}

// TypeScript uses a structural type system; although p2 isn't declared
// as type Person, it is still valid as an agrument to savePerson() as
// their types are compatible.
const p2 = {
  firstName: 'John',
  lastName: 'Smith',
  age: 25,
};

savePerson(p2);

/* Which keyword to use: type, interface, or class?
 * If the custom type doesn't need to be used for instantiating objects
 * at runtime, use interface or type. Defining a custom type with the
 * type keyword offers the same features as interface plus the ability
 * to create conditional types. Types cannot be extended once defined.
 * Interfaces can extend other interfaces or redeclare the interface
 * with additional fields.
 */

// Use class for types if relying on instanceof operator
