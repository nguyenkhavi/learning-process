import { Dimensions, NativeScrollEvent, Platform } from "react-native";

/**
 * * Function purity
 */

// ? Compare function and procedure
// ? Function naming semantics
// todo: Function name must describe the semantic relationship between the input and output

function calculatePrice(origin: number, discounted: number) {
  return Math.max(0, origin - discounted);
}

// ? Side-effect

let originValue = 10;
let discountedValue = 20;
let finalValue: number = 0;

// ! Hidden-Dynamic input: originValue, discountedValue
function calcPrice() {
  finalValue = Math.max(0, originValue - discountedValue);
}
// ! Hidden-Dynamic output: finalValue
console.log({ finalValue });

/**
 * ! Using the REFERENCE to mutate a value is absolutely a Side Effect.
 */
function removeLastElement<T>(arr: T[]){
    // `.pop()` is a in-place mutation method
    arr.pop()
    return arr
}

// * Avoid side-effect by `function calls`. Because
/**
 * todo: Common side-effects:
 *  I/O task
 *  Data storage
 *  ! API calls
 *  DOM
 *  Timestamps
 *  Random number
 *  CPU Heat...
 */
// * So no such thing "so side-effects". Avoid them where possible, make them more obvious.

// ? Pure function & Constants
// * pure
function add(a: number, b: number) {
  return a + b;
}
// ! impure
// `let` keyword make the function have a side-effect
let z = 1; // todo: const z = 1 have NO side-effect
function addAnother(a: number, b: number) {
  return a + b + z;
}
// * Real example
const { width: deviceWidth } = Dimensions.get("window");
const ip14ProMaxWidth = 430;
const ip14ProWidth = 393;
function hasDynamicIsland() {
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    [ip14ProMaxWidth, ip14ProWidth].includes(deviceWidth)
  );
}
/**
 * todo: These `const` keyword make sure the the value of these variables will never change
 * todo: That don't create any hidden-dynamic output => `hasDynamicIsland` have no side-effect
 */

// ? Reducing Surface Area (View `Closure` for more detail)
function addZ(z: number) {
  return function (a: number, b: number) {
    return add(a, b) + z;
  };
}
addZ(3)(4, 5); // 12

// ================ Benefits of purity ===============

// ? Same input => same output
// ? Level of confidence:
/**
 * * Highly confident
 * * Focus on `calls` not `definition`
 */
// ================ Handle Impurity ===============

// ? Extracting Impurity
// * Naming function name clearly.
// * Split `impure function` into `pure functions` and `procedures` that execute single side-effect.
// `isCloseToBottom` is a pure function
const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 8;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
// ` ` is a procedures, execute single side-effect
const _handleScroll = ({ nativeEvent }:{nativeEvent: NativeScrollEvent}) => {
  if (isCloseToBottom(nativeEvent)) {
    if (hasNextPage && typeof fetchNextPage === "function") {
      fetchNextPage();
    }
  }
};

// ? Containing Impurity
// Wrapping a function around it, return all of state that was modified back to the origin state.
// ! Side-effect

// * Wrapped 


/**
 * ! Do all of these things. You stuck at side-effect, at least make it obvious
 */

