/* public, protected, private modifiers
 *
 * public: Class members marked as public can be accessed from the internal
 * class methods as well as from external scripts. This is the default
 * access, so if you place the keyword public in front of a property or
 * method the accessibility of these class members won’t change.
 *
 * protected: Class members marked as protected can be accessed either from
 * the internal class code or from class descendants. Instances of the class
 * cannot access the protected members.
 *
 * private: The private class members are visible only within the class.
 */

// Implicit vs Explicit declaration of class properties.
// The following classes produce the same instances.
class Person1 {
  public firstName = '';
  public lastName = '';
  private age = 0;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}

class Person2 {
  constructor(
    public firstName: string,
    public lastName: string,
    private age: number,
  ) {}
}

const pers1 = new Person1('John', 'Smith', 43);
const pers2 = new Person2('John', 'Smith', 43);

/* ------------------------------------------------------------------------- */

// Static: declare a property static when it has to be shared by each instance
// of a class. Such a property will be created not on any particular instance,
// but on the class itself. Access a static variable by prepending the class
// name, not 'this' (e.g. Gangsta.totalBullets instead of this.totalBullets).
class Gangsta {
  static totalBulletes = 100;

  shoot() {
    Gangsta.totalBulletes--;
    console.log(`Bullets left: ${Gangsta.totalBulletes}`);
  }
}

const g1 = new Gangsta();
g1.shoot(); // outputs 99

const g2 = new Gangsta();
g2.shoot(); // outputs 98

// Both instances of the Gangsta class share the same totalBullets variable

// WARNING: static class variables are not shared with subclasses, the
// subclasses receive their own instance of the static variable to share.

/* ------------------------------------------------------------------------- */

// Singleton: A design pattern that restricts instantiation of a class to only
// one object. This is done by making the constructor a private member and
// invoking the new keyword once from within the class on a static method.
class AppState {
  counter = 0;
  private static instanceRef: AppState;

  private constructor() {}

  static getInstance(): AppState {
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState();
    }

    return AppState.instanceRef;
  }
}

const appState1 = AppState.getInstance();
const appState2 = AppState.getInstance();

appState1.counter++;
appState1.counter++;
appState2.counter++;
appState2.counter++;

console.log(appState1.counter); // prints 4
console.log(appState2.counter); // prints 4

/* ------------------------------------------------------------------------- */

// Abstract classes: The abstract keyword prevents a class from being
// instantiated. Descendent classes must also implement all abstract
// methods within the abstract class.
abstract class Person {
  constructor(public name: string) {}

  changeAddress(newAddress: string) {
    console.log(`Changing address to ${newAddress}`);
  }

  giveDayOff() {
    console.log(`Giving a day off to ${this.name}`);
  }

  promote(percent: number) {
    this.giveDayOff();
    this.increasePay(percent);
  }

  abstract increasePay(percent: number): void;
}

class Employee extends Person {
  increasePay(percent: number) {
    console.log(`Increasing the salary of ${this.name} by ${percent}%`);
  }
}

class Contractor extends Person {
  increasePay(percent: number) {
    console.log(`Increasing the hourly rate of ${this.name} by ${percent}%`);
  }
}

// A more specific type is assignable to a more general one.
const workers: Person[] = [];

workers[0] = new Employee('John');
workers[1] = new Contractor('Mary');

workers.forEach((worker) => worker.promote(5));

/* ------------------------------------------------------------------------- */

// Method overloading
interface Product {
  id: number;
  description: string;
}

class ProductService {
  getProducts(description: string): Product[];
  getProducts(id: number): Product;
  getProducts(product: number | string): Product[] | Product {
    if (typeof product === 'number') {
      console.log(`Getting the product info for id ${product}`);
      return { id: product, description: 'great product' };
    } else if (typeof product === 'string') {
      console.log(`Getting product with description ${product}`);
      return [
        { id: 123, description: 'blue jeans' },
        { id: 789, description: 'blue jeans' },
      ];
    } else {
      return {
        id: -1,
        description:
          'Error: getProducts() accept only number or string as args',
      };
    }
  }
}

const prodService = new ProductService();
console.log(prodService.getProducts(123));
console.log(prodService.getProducts('blue jeans'));
