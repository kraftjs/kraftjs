class Dog {
  constructor(readonly name: string) {}

  sayHello(): string {
    return 'Dog says hello!';
  }
}

class Fish {
  constructor(readonly name: string) {}

  dive(howDeep: number): string {
    return `Diving ${howDeep} feet`;
  }
}

type Pet = Dog | Fish;

function talkToPet(pet: Pet): string | undefined {
  if (pet instanceof Dog) {
    return pet.sayHello();
  } else if (pet instanceof Fish) {
    return 'Fish cannot talk, sorry';
  }
}

const myDog = new Dog('Sparky');
const myFish = new Fish('Squirt');

talkToPet(myDog);
talkToPet(myFish);
// talkToPet({ name: 'John' }); // compile err; wrong parameter type
