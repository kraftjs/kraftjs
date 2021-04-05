interface A {
  a: number;
}
interface B {
  b: string;
}

function foo(x: A | B) {
  if ('a' in x) {
    return x.a;
  }
  return x.b;
}
