/* Types in function */

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

interface IProp<T> {
  name: string | T;
  getName: () => void;
  greet: string;
  time: number;
  language: 'hola' | 'hello' | 'bonjour';
  color: Color.Blue | Color.Green | Color.Red;
  word: unknown;
}

type Mprop = Partial<IProp<boolean>>[];

function getName<T>(name: T): T {
  return name;
}

getName<number>(42);

function greeting([{greet, name, time, word}]: Mprop) {
  const ramdon = Math.random() * 100 + 1;
  const comebacks: unknown[] = ['your great', 'you are a dick', 42];
  comebacks.push(word);
  return `${greet} ${name} at ${time} ${comebacks[ramdon]}`;
}

type result = ReturnType<typeof getName>;

const message = greeting([
  {
    name: 'name',
    greet: 'hello',
    time: 1,
    language: 'hola',
    color: Color.Red,
    word: ['you', 'are', 'a', 2],
  },
  {name: 'name', greet: 'hello', time: 2, language: 'bonjour', color: Color.Green, word: 'word'},
]);
