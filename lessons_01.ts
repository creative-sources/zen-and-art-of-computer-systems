/* Notes from Mike North's Typescript Course */

class Fruit {
  static createBanana(): Fruit {
    return {name: 'Banana', color: 'Yellow', mass: 100};
  }
}

// the namespace
namespace Fruit {
  export function createOrange(): Fruit {
    return {name: 'Orange', color: 'Orange', mass: 200};
  }
} // namespace

interface Fruit {
  name: string;
  color: string;
  mass: number;
}

export {Fruit};

/* Ternary Oparator on Typescript */

/* Map Types  */

type Dict<T> = {[key: string]: T}; // <- index signature

const fruitCatalog: Dict<Fruit> = {};

fruitCatalog.apple;

type MyRecord = {[FruitKey in 'apple' | 'banana']: Fruit};

function printFruitCatalog(fruitCatalog: MyRecord) {
  console.log(fruitCatalog.apple);
  console.log(fruitCatalog.banana);
}

// copilot suggestion
function getFruit(fruitKey: 'apple' | 'banana') {
  return fruitCatalog[fruitKey];
}

type MeRecord<KeyType extends string, ValueType> = {[key in KeyType]: ValueType};