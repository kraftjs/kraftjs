// If you declare a variable of type unknown, the compiler will force
// you to narrow its type down before accessing its properties.

type Persona = {
  discriminator: 'persona';
  address: string;
};

let person1: any;
person1 = JSON.parse('{ "adress": "25 Broadway" }');
console.log(person1.address); // undefined: adress in JSON is mispelled

let person2: unknown;
person1 = JSON.parse('{ "adress": "25 Broadway" }');
// console.log(person2.address); // compile err; haven't narrowed unknow type

// The double-bang operator (!!) ensures the operand is truthy
const isPersona = (object: any): object is Persona =>
  !!object && object.discriminator === 'persona';
