console.log('Hello World');

/* Types in function */

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

interface IProp {
  name: string;
  greet: string;
  time: number;
  language: 'hola' | 'hello' | 'bonjour';
  color: Color.Blue | Color.Green | Color.Red;
  word: unknown;
}

type Mprop = IProp[];

function greeting([{greet, name, time, word}]: Mprop) {
  const ramdon = Math.random() * 100 + 1;
  const comebacks: unknown[] = ['your great', 'you are a dick', 42];
  comebacks.push(word);
  return `${greet} ${name} at ${time} ${comebacks[ramdon]}`;
}

const message = greeting([
  {name: 'name', greet: 'hello', time: 1, language: 'hola', color: Color.Red, word: ["you","are","a",2]},
  {name: 'name', greet: 'hello', time: 2, language: 'bonjour', color: Color.Green, word: 'word'},
]);
