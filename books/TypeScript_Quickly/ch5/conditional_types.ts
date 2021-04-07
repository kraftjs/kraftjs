// A conditional type will always be declared in the following form:
//      T extends U ? X : Y
// If T is assignable to U, use type X, otherwise use type Y.

class Product {
  id: number;
}

const getProducts = function <T>(
  id?: T,
): T extends number ? Product : Product[] {
  if (typeof id === 'number') {
    return { id: 123 } as any;
  } else {
    return [{ id: 123 }, { id: 567 }] as any;
  }
};

const result1 = getProducts(123);
const result2 = getProducts();

/* ------------------------------------------------------------------------- */

/** EXCLUDE conditional type (code below from lib.es5.d.ts)
 *
 * type Exclude<T, U> =  T extends U ? never : T;
 *
 * Excludes types that are assignable to U. If T is not assignable to U, keep
 * it; otherwise, change the type to never. */

class Student {
  id: number;
  name: string;
  age: number;
}

// the following type will contain all the properties of T except those that
// belong to the given type K
type RemoveProps<T, K> = Exclude<keyof T, K>;

// The following type removes name and age properties, leaving only id.
type RemainingProps = RemoveProps<Student, 'name' | 'age'>;

// The following is translated to Pick RemainingProps ('id') from Student
type StudentBlindAudition = Pick<Student, RemainingProps>;

/* ------------------------------------------------------------------------- */

// INFER keyword

// Goal: isolate getA() method from SyncService and wrap it into a Promise.

// 'T extends (..args: infer A) => infer R' means if member of T is a
// method with arguments of type A that returns a type R, then wrap its return
// type in a promise, otherwise leave the member of T as is.
// Or more clearly...

// If a concrete type for T is a function, wrap its return type: Promise<R>.
// Otherwise, just preserve its type T.
type ReturnPromise<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : T;

// The Promisify<T> mapped type will iterate through the properties of T and
// apply to them the conditional ReturnPromise type.
type Promisify<T> = {
  [P in keyof T]: ReturnPromise<T[P]>;
};

interface SyncService {
  baseUrl: string;

  getA(): string;
}

class AsyncService implements Promisify<SyncService> {
  baseUrl: string;

  getA(): Promise<string> {
    return Promise.resolve('');
  }
}

let service = new AsyncService();
let result = service.getA();
