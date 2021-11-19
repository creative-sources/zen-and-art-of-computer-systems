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
