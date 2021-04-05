type Foot = number;
type Pound = number;

type Patient = {
  name: string;
  height: Foot;
  weight?: Pound;
};

let patient: Patient = {
  name: 'Joe Smith',
  height: 5,
};

/*-----------------------------------------------------------------*/

type ValidatorFn = (c: FormControl) => { [key: string]: any } | null;
class FormControl {
  constructor(initialValue: string, validator: ValidatorFn) {}
}

/*-----------------------------------------------------------------*/

// Note: a constructor is a special function that's executed once
// when the instance of a class is created.

// TypeScript allows you to proivde annotations to the constructor's
// arguments and access level qualifiers (public, private, protected)

// public access level means that the corresponding property can be
// accessed from any code located both inside and outside the class

// the readonly qualifier is similar to the const keyword, but const
// can't be used with class properties.

class Person {
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number,
  ) {}
}
const p1 = new Person('John', 'Smith', 25);

/*-----------------------------------------------------------------*/
