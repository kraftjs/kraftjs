// Discriminated unions include type members that have a common
// property--the discriminant

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Rectangle | Circle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'rectangle':
      return shape.height * shape.width;
    case 'circle':
      return Math.PI * shape.radius ** 2;
  }
}

const myRectangle: Rectangle = { kind: 'rectangle', width: 10, height: 20 };
console.log(`Rectangle's area is ${area(myRectangle)}`);

const myCircle: Circle = { kind: 'circle', radius: 10 };
console.log(`Circle's area is ${area(myCircle)}`);
