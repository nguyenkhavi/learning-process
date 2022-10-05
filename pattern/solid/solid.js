"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.handler = void 0;
var _Dog = /** @class */ (function () {
    function _Dog() {
    }
    _Dog.prototype.fly = function () {
        throw new Error("I cannot fly!");
        return "";
    };
    _Dog.prototype.run = function () {
        return "Running...";
    };
    _Dog.prototype.swim = function () {
        return "The water is cool...";
    };
    return _Dog;
}());
var Dog = /** @class */ (function () {
    function Dog() {
    }
    Dog.prototype.swim = function () {
        return "The water is cool...";
    };
    Dog.prototype.run = function () {
        return "Running...";
    };
    return Dog;
}());
// Open/Closed
/**
 * Should be open for extension, but closed for modification
 */
// Before
var SuperDog = /** @class */ (function (_super) {
    __extends(SuperDog, _super);
    function SuperDog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // run method is override
    SuperDog.prototype.run = function () {
        return "Im super cat, and Im running!";
    };
    return SuperDog;
}(Dog));
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
var Parent = /** @class */ (function () {
    function Parent() {
        this.attr = 0;
    }
    return Parent;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Child;
}(Parent));
var parentObject = new Parent();
var childObject = new Child();
var dog = new Dog();
function fn(arg) {
    console.log({ arg: arg });
}
fn(parentObject);
fn(childObject);
fn(dog);
// Before
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
// Image: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mechamath.com%2Fprecalculus%2Fparts-of-the-ellipse-with-diagrams%2F&psig=AOvVaw3DVpJNTrYr5GnV-V_NtPz9&ust=1664619087426000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDw1r2jvPoCFQAAAAAdAAAAABAH
var Ellipse = /** @class */ (function () {
    function Ellipse() {
    }
    Ellipse.prototype.GetFocusA = function () {
        return this.focusA;
    };
    Ellipse.prototype.GetFocusB = function () {
        return this.focusB;
    };
    Ellipse.prototype.GetMajorAxis = function () {
        return this.majorAxis;
    };
    Ellipse.prototype.SetFoci = function (a, b) {
        this.focusA = a;
        this.focusB = b;
    };
    Ellipse.prototype.SetMajorAxis = function (majorAxios) {
        this.majorAxis = majorAxios;
    };
    return Ellipse;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.SetFoci = function (a, b) {
        this.focusA = a;
        this.focusB = a;
    };
    return Circle;
}(Ellipse));
var handler = function (data) {
    var initialA = new Point(-1, 0);
    var initialB = new Point(1, 0);
    data.SetFoci(initialA, initialB);
    data.SetMajorAxis(3);
    /**
     * Bunch of code
     */
    var hasMoved = data.GetFocusA() !== initialA || data.GetFocusB() !== initialB;
    return hasMoved ? 'moved' : 'notMoved';
};
exports.handler = handler;
var circle = new Circle();
var ellipse = new Ellipse();
(0, exports.handler)(ellipse);
(0, exports.handler)(circle);
// After
