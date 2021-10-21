# @seflage/lazy_instance

## Install

`npm install @selfage/lazy_instance`

## Overview

Written in TypeScript and compiled to ES6 with inline source map & source. See [@selfage/tsconfig](https://www.npmjs.com/package/@selfage/tsconfig) for full compiler options. Provides several variations to assure a target function can only be called once.

Note that if you are using TypeScript, make sure its version is > 4.0.0 to support variadic tuple type.

## Function variation

```TypeScript
import { toOnce, toOnceOrError } from "@selfage/once";

function foo(x: number, y: string) {
  return `${y}:${x}`;
}

function bar(x: number, y: string) {
  return "bar";
}

// All subsequent calls after the first call return the same value as the first call.
let fooOnce = toOnce(foo);
console.log(fooOnce(12, "now")); // now:12
console.log(fooOnce(21, "past")); // now:12
fooOnce("future"); // Expected 2 arguments, but got 1.
fooOnce(true, "future"); // Argument of type 'boolean' is not assignable to parameter of type 'number'.

// The second call will result in an error
let fooOnceOrError = toOnceOrError(foo);
console.log(fooOnceOrError(12, "now")); // now:12
fooOnceOrError(12, "now"); // throws an error

// All subsequent calls after the first call will use the alternative function.
let fooOnceOrBar = toOnce(foo, bar);
console.log(fooOnceOrBar(12, "now")); // now:12
console.log(fooOnceOrBar(21, "past")); // bar
```

## Class variation

```TypeScript
import { OnceCaller, OnceOrErrorCaller } from "@selfage/once/caller";

function foo(x: number, y: string) {
  return `${y}:${x}`;
}

// All subsequent calls after the first call return the same value as the first call.
function bar(x: number, y: string) {
  return "bar";
}

let fooOnceCaller = new OnceCaller(foo);
console.log(fooOnceCaller.call(12, "now")); // now:12
console.log(fooOnceCaller.call(21, "past")); // now:12
fooOnceCaller.call("function"); // Expected 2 arguments, but got 1.
fooOnceCaller.reset();
console.log(fooOnceCaller.call(33, "future")); // future:33

// The second call will result in an error
let fooOnceOrErrorCaller = new OnceOrErrorCaller(foo);
console.log(fooOnceOrErrorCaller.call(12, "now")); // now:12
fooOnceOrErrorCaller.call(21, "past"); // throws an error
fooOnceOrErrorCaller.reset();

// All subsequent calls after the first call will use the alternative function.
let fooOnceOrBarCaller = new OnceCaller(foo, bar);
console.log(fooOnceOrBarCaller.call(12, "now")); // now:12
console.log(fooOnceOrBarCaller.call(21, "past")); // bar
fooOnceOrBarCaller.reset();
```
