// Interface Segregation
/**
 * Clients should not be forced to depend upon interfaces that they do not use
 */
// Before
interface IAnimal {
  fly: () => string;
  run: () => string;
  swim: () => string;
}
class _Dog implements IAnimal {
  fly() {
    throw new Error("I cannot fly!");
    return "";
  }
  run() {
    return "Running...";
  }
  swim() {
    return "The water is cool...";
  }
}
// After
interface IFlyable {
  fly(): string;
}
interface IRunable {
  run(): string;
}
interface ISwimmable {
  swim(): string;
}

class Dog implements IRunable, ISwimmable {
  swim(): string {
    return "The water is cool...";
  }
  run(): string {
    return "Running...";
  }
}

// Single Responsibility
/**
 * There should never be more than one reason for a class to change
 */
// Before
interface SoftwareEngineer {
  communicateWithClient(): void;
  coding(): void;
  manageTask(): void;
}
// After
interface BusinessAnalyst {
  communicateWithClient(): void;
}
interface Programer {
  coding(): void;
}
interface ProjectManager {
  manageTask(): void;
}

// Open/Closed
/**
 * Should be open for extension, but closed for modification
 */
// Before
class SuperDog extends Dog {
  // run method is override
  run(): string {
    return "Im super cat, and Im running!";
  }
}
// After

// Dependency Inversion
/**
 * Depend upon abstractions, [not] concretions
 */
// Before
// After

// Liskov substitution
/**
 * Subclasses should be substitutable for their base classes
 */
class Parent {
  attr: number = 0
}
class Child extends Parent {}


const parentObject = new Parent()
const childObject = new Child()
const dog = new Dog()

function fn(arg: Parent) {
  console.log({arg});
  
}
fn(parentObject)
fn(childObject)
fn(dog)













// Before
class Point {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  x: number;
  y: number;
}

// Image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mechamath.com%2Fprecalculus%2Fparts-of-the-ellipse-with-diagrams%2F&psig=AOvVaw3DVpJNTrYr5GnV-V_NtPz9&ust=1664619087426000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDw1r2jvPoCFQAAAAAdAAAAABAH
class Ellipse {
  focusA: Point;
  focusB: Point;
  majorAxis: number;
  GetFocusA() {
    return this.focusA;
  }
  GetFocusB() {
    return this.focusB;
  }
  GetMajorAxis() {
    return this.majorAxis;
  }
  SetFoci(a: Point, b: Point) {
    this.focusA = a;
    this.focusB = b;
  }
  SetMajorAxis(majorAxios: number) {
    this.majorAxis = majorAxios;
  }
}
class Circle extends Ellipse {
  SetFoci(a: Point, b: Point) {
    this.focusA = a 
    this.focusB = a
  }
}









export const handler = (data: Ellipse) => {
  const initialA = new Point(-1, 0);
  const initialB  = new Point(1, 0);
  data.SetFoci(initialA, initialB);
  data.SetMajorAxis(3);
  
  /**
   * Bunch of code
   */




  const hasMoved = data.GetFocusA() !== initialA || data.GetFocusB() !== initialB


  return hasMoved ? 'moved' : 'notMoved'
}

const circle = new Circle();
const ellipse = new Ellipse();

handler(ellipse);
handler(circle);

// After
