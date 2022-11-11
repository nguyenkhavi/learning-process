const { of } = require("rxjs");

// ? When working with NOTHING like an observable: Primitive, Object
const ofExample = of(1, 2, 3);
// ofExample.subscribe(val => console.log({val}))

// ? When working with kind of like an observable: Array, Promises, Object with subscribe methods
const fromExample = of([1, 2, 3]);
// fromExample.subscribe(val => console.log({val}))

fromExample.subscribe({
    next: (value) => {
        console.log({ emitted: value });
    },
    error: (error) => {
        console.log({ error });
    },
    complete: () => {
        console.log({ completed: true });
    }
});
