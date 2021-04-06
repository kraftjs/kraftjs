// if you need a custom type that includes a constructor, use a class;
// otherwise use an interface

interface MotorVehicle {
  startEngine(): boolean;

  stopEngine(): boolean;

  brake(): boolean;

  accelerate(speed: number): void;

  honk(howLong: number): void;
}

interface Flyable extends MotorVehicle {
  fly(howHigh: number): void;

  land(): void;
}

interface Swimmable {
  swim(howFar: number): void;
}

class Car implements MotorVehicle {
  startEngine(): boolean {
    return true;
  }

  stopEngine(): boolean {
    return true;
  }

  brake(): boolean {
    return true;
  }

  accelerate(speed: number) {
    console.log(`Driving faster`);
  }

  honk(howLong: number) {
    console.log(`Beep beep yeah!`);
  }
}

class SecretServiceCar implements Flyable, Swimmable {
  startEngine(): boolean {
    return true;
  }

  stopEngine(): boolean {
    return true;
  }

  brake(): boolean {
    return true;
  }

  accelerate(speed: number) {
    console.log(`Driving faster`);
  }

  honk(howLong: number) {
    console.log(`Beep beep yeah!`);
  }

  fly(howHigh: number) {
    console.log(`Flying ${howHigh} feet high`);
  }

  land() {
    console.log(`Landing. Fasten your belts.`);
  }

  swim(howFar: number) {
    console.log(`Swimming ${howFar} feet`);
  }
}

const car = new Car();
car.startEngine();

/* ------------------------------------------------------------------------- */

// Program to interfaces!

interface Product {
  id: number;
  description: string;
}

interface IProductService {
  getProducts(): Product[];

  getProductById(id: number): Product;
}

class ProductServices implements IProductService {
  getProducts(): Product[] {
    return [];
  }

  getProductById(id: number): Product {
    return { id: 123, description: 'Good product' };
  }
}

class MockProductServices implements IProductService {
  getProducts(): Product[] {
    return [];
  }

  getProductById(id: number): Product {
    return { id: 123, description: 'Good product' };
  }
}

function getProductService(isProduction: boolean): IProductService {
  if (isProduction) {
    return new ProductServices();
  } else {
    return new MockProductServices();
  }
}

const isProd = true; // process.env.PRODUCTION
const productService: IProductService = getProductService(isProd);
const products = productService.getProducts();
