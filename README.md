[![CircleCI](https://circleci.com/gh/litchi-io/utils.svg?style=svg)](https://circleci.com/gh/litchi-io/utils)
[![codecov](https://codecov.io/gh/litchi-io/utils/branch/master/graph/badge.svg)](https://codecov.io/gh/litchi-io/utils)
[![npm version](https://img.shields.io/npm/v/@usefultools/utils.svg)](https://www.npmjs.com/package/@usefultools/utils)
[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/litchi-io/utils/blob/master/SECURITY.md)

# JavaScript / TypeScript Utilities

A collection of light-weight methods and helpers for defensive programming

## Prereqs & Install

* Node >=9.10.0
* npm >=6.1.0

Please note that the **TypeScript target is ES6**.

```sh
npm install @usefultools/utils
```

## Usage

There are 6 main modules available:

* [Async](https://github.com/litchi-io/mod-utils#async)
* [Conditionals](https://github.com/litchi-io/mod-utils#conditionals)
* [Env](https://github.com/litchi-io/mod-utils#env)
* [Helpers](https://github.com/litchi-io/mod-utils#helpers)
* [Match](https://github.com/litchi-io/mod-utils#match)
* [ThrowIf](https://github.com/litchi-io/mod-utils#throwif)

## Async

Available methods:

* `withTimeout`
* `makeRecoverable`

### Examples

#### `withTimeout`

The below will resolve source after 750ms.

```typescript
function findUserById(id: number) {
  const source = () => http.get(`/api/users/${id}`)
  return withTimeout(source, 750)
}

```

#### `makeRecoverable`

The below will retry 5 times.

```typescript
function getUsers() {
  const source = () => http.get("/api/users")
  return makeRecoverable(source, 5)
}

```

The below will retry 3 times, each time with a delay of 250ms.

```typescript
function getUsers() {
  const source = () => http.get("/api/users")
  return makeRecoverable(source, 3, 250)
}

```

The below will retry thrice if the error caught is a `SyntaxError`.

```typescript
function initService() {
  const source = () => service.init()
  return makeRecoverable(source, 3, 0, SyntaxError)
}

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/Async/main.spec.ts).**

---

## Conditionals

Available methods:

* `isNull`
* `isUndefined`
* `isMissing`
* `isPresent`
* `isBoolean`
* `isArray`
* `isObject`
* `isString`
* `isNumber`
* `isInteger`
* `isFunction`
* `isNonEmptyString`
* `isNonEmptyArray`
* `isTrue`
* `isFalse`
* `isPositiveInteger`
* `isNonNegativeInteger`
* `hasOneItem`
* `hasMultipleItems`
* `isConstructable`
* `hasOnlyKeys`
* `isEqual`

### Examples

#### `isNull`

Find out whether value is null

```typescript
isNull(null) // true

isNull(undefined) // false
isNull(0) // false
isNull(NaN) // false

```

#### `isUndefined`

Find out whether type of value is undefined

```typescript
isUndefined(undefined) // true

isUndefined(null) // false
isUndefined(0) // false

```

#### `isMissing`

Find out whether value is null or undefined, therefore "missing"

```typescript
isMissing(null) // true
isMissing(undefined) // true

isMissing(0) // false
isMissing(NaN) // false
isMissing("") // false

```

#### `isPresent`

Find out whether value is not null and not undefined, therefore "present"

```typescript
isPresent(0) // true
isPresent(NaN) // true
isPresent("") // true

isPresent(null) // false
isPresent(undefined) // false

```

#### `isBoolean`

Find out whether value is of type Boolean

```typescript
isBoolean(true) // true
isBoolean(false) // true

isBoolean(0) // false

```

#### `isArray`

Find out whether value is of type Array

```typescript
isArray([]) // true
isArray([null, undefined]) // true

isArray({}) // false

```

#### `isObject`

Find out whether value is of type Object

```typescript
isObject({}) // true

isObject(new Function()) // false
isObject([]) // false

```

#### `isString`

Find out whether value is of type String

```typescript
isString("") // true

isString(new String()) // false

```

#### `isNumber`

Find out whether value is of type Number

```typescript
isNumber(42) // true
isNumber(Math.PI) // true
isNumber(Infinity) // true

isNumber(NaN) // false

```

#### `isInteger`

Find out whether value is of type Number and is an Integer

```typescript
isInteger(42) // true

isInteger(Math.PI) // false
isInteger(Infinity) // false
isInteger(NaN) // false

```

#### `isFunction`

Find out whether value is of type Function

```typescript
isFunction(() => {}) // true
isFunction(ReferenceError) // true

isFunction(new ReferenceError()) // false

```

#### `isNonEmptyString`

Find out whether value is of type String, and has at least 1 character

```typescript
isNonEmptyString("Hello, World!") // true

isNonEmptyString("") // false

```

#### `isNonEmptyArray`

Find out whether value is of type Array and has at least one element

```typescript
isNonEmptyArray([null]) // true

isNonEmptyArray([]) // false

```

#### `isTrue`

Find out whether value is of type Boolean and is true

```typescript
isTrue(true) // true

isTrue(1) // false
isTrue(false) // false

```

#### `isFalse`

Find out whether value is of type Boolean and is false

```typescript
isFalse(false) // true

isFalse(0) // false
isFalse(true) // false

```

#### `isPositiveInteger`

Find out whether value is an Integer and greater than 0

```typescript
isPositiveInteger(42) // true

isPositiveInteger(0) // false
isPositiveInteger(-42) // false

```

#### `isNonNegativeInteger`

Find out whether value is an Integer and greater or equal to 0

```typescript
isNonNegativeInteger(42) // true
isNonNegativeInteger(0) // true

isNonNegativeInteger(-42) // false

```

#### `hasOneItem`

Find out whether value is an Array and its length is 1

```typescript
hasOneItem([null]) // true

hasOneItem([]) // false
hasOneItem([42, Math.PI]) // false

```

#### `hasMultipleItems`

Find out whether value is an Array and its length is more than 1

```typescript
hasMultipleItems([42, Infinity]) // true

hasMultipleItems([]) // false
hasMultipleItems(["Hello, World"]) // false

```

#### `isConstructable`

Find out whether value is Constructable

```typescript
isConstructable(new Function()) // true
isConstructable(function a() {}) // true
isConstructable(class {}) // true
isConstructable(class ClassName {}) // true

isConstructable(() => {}) // false

```

#### `hasOnlyKeys`

Find out whether value has only the keys provided

```typescript
hasOnlyKeys({ a: "b", c: "d" }, ["a", "c"]) // true
hasOnlyKeys({ a: "b" }, ["a"]) // true
hasOnlyKeys({}, []) // true

hasOnlyKeys({ a: "b" }, ["c"]) // false
hasOnlyKeys({ a: "b", c: "d" }, ["a"]) // false

```

#### `isEqual`

Find out whether value 1 and value 2 are equal (shallow)

```typescript
isEqual("Hello, World!", "Hello, World!") // true
isEqual(null, null) // true
isEqual(false, false) // true
isEqual(Math.PI, Math.PI) // true
isEqual(Infinity, Infinity) // true

isEqual([], []) // false
isEqual({}, {}) // false
isEqual(false, true) // false

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/Conditionals/main.spec.ts).**

---

## Env

Available methods:

* `getAsBool`
* `getAsInt`
* `getAsStr`

NOTE: These methods are namespaced under `env`. The usage is therefore

```typescript
import { env } from "@usefultools/utils"

env.getAsBool(...)
env.getAsInt(...)
env.getAsStr(...)

```

### Examples

Assuming your `process.env` has loaded the following `.env`.

```
IS_PROD=true
ASYNC_MAX_TIMEOUT=2500
API_KEY=0351f02f-0be2-49d1-bfed-5c45275d4fd2

```

#### `env.getAsBool`

To retrieve the Boolean value of `"IS_PROD"` from `process.env`, you can use the following method.

```typescript
env.getAsBool("IS_PROD") // true

```

If the raw value cannot be found, or the parsed value is not a Boolean, **this function will throw** a `ReferenceError` or a `TypeError` respectively.

#### `env.getAsInt`

To retrieve the Integer value of `"ASYNC_MAX_TIMEOUT"` from `process.env`, you can use the following method.

```typescript
env.getAsInt("ASYNC_MAX_TIMEOUT") // 2500

```

If the raw value cannot be found, or the parsed value is not an Integer, **this function will throw** a `ReferenceError` or a `TypeError` respectively.

#### `env.getAsStr`

To retrieve the String value of `"API_KEY"` from `process.env`, you can use the following method.

```typescript
env.getAsStr("API_KEY") // "0351f02f-0be2-49d1-bfed-5c45275d4fd2"

```

If the raw value cannot be found, **this function will throw** a `ReferenceError`.

In all of the above, you can also use your own env object like so:

```typescript
// const env = { "IS_DEV": "false" }

env.getAsBool("IS_DEV", env) // false

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/Env/main.spec.ts).**

---

## Helpers

Available methods:

* `noop`
* `identity`
* `getRandomIntInclusive`
* `generateId`
* `isValidId`
* `generateUUID`
* `isValidUUID`
* `fill`

### Examples

#### `noop`

Sometimes you might want to provide a default callback parameter to some of your functions to prevent the application from crashing (on the off-chance someone or something accidentally calls them without any parameters). You can use the `noop` helper as shown below.

```typescript
function doSomething(cb = noop) {
  let res: string

  try {
    await http.get("/api/healthcheck")
    res = "All works!"
  } catch (_err) {
    res = "There was an error!"
  }

  cb(res)
}

```

#### `identity`

Let's assume that `doSomething` prints its result (`String`) into the console, but applies `onSuccess` for a Ok result, and `onError` for a Err result. You might want to uppercase the success result, but leave the error message in its original form. You can use the identity helper as shown below.

```typescript
function onSuccess(res: string) {
   return res.toUpperCase()
}

doSomething(onSuccess, identity)

```

#### `getRandomIntInclusive`

To get a random integer within a specified range, you can use the following:

```typescript
getRandomIntInclusive(10, 99) // Yields integers between 10 and 99

```

#### `generateId`

To get a random id (underlying is the `shortid` library) use:

```typescript
generateId() // "HJ5fy5p3G"
generateId() // "Byij0Ka3z"

```

#### `isValidId`

To confirm whether a value is a valid id (underlying is the `shortid` library) use:

```typescript
isValidId("HJ5fy5p3G") // true
isValidId("foo") // false

```

#### `generateUUID`

To get a random UUID v4 (underlying is the `uuid` library) use:

```typescript
generateUUID() // "b98c5086-1dcc-4822-9fa4-8f343f18e8de"
generateUUID() // "7118f7d9-70b1-4cb2-97da-3fe272bed7e8"

```

#### `isValidId`

To confirm whether a value is a valid UUID v4 (underlying is the `uuid` library) use:

```typescript
isValidUUID("1ad006bf-00c0-49de-bcf0-7c5eb2f83241") // true
isValidUUID("foo") // false

```

#### `fill`

To fill an array, use:

```typescript
fill(4) // [0, 1, 2, 3]

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/Helpers/main.spec.ts).**

---

## Match

Available methods:

* `match`

Other exports:

* `_def`

### Examples

#### `match`

A basic pattern match:

```typescript
const getMessage = (year: number): string => match(year)({
  [1984]: "The year is 1984.",
  [_def]: "Unfortunately, we cannot tell what year it is."
})

getMessage(1984) // "The year is 1984."
getMessage(1994) // "Unfortunately, we cannot tell what year it is."
getMessage(2024) // "Unfortunately, we cannot tell what year it is."

```

Advanced pattern matching, including assertions:

```typescript
function isFutureYear(year) {
  return isPositiveInteger(year)
  && year > new Date().getFullYear()
}

function isCurrentYear(year) {
  return isPositiveInteger(year)
  && year === new Date().getFullYear()
}

const getMessage = (year: number): string => match(year)(
  [1984, "The year is 1984."],
  [isCurrentYear, x => `The year ${x} is up-to-date.`],
  [isFutureYear, x => `The year ${x} is in the future...`],
  [_def, "Unfortunately, we cannot tell what year it is."],
)

getMessage(1984) // "The year is 1984."
getMessage(2018) // "The year 2018 is up-to-date."
getMessage(2024) // "The year 2024 is in the future..."
getMessage(1333) // "Unfortunately, we cannot tell what year it is."

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/Match/main.spec.ts).**

---

## ThrowIf

A collection of simple throwable assertions, all of which throw if the assertion fails.

Available methods:

* `throwIfMissing`
* `throwIfPresent`
* `throwIfNotBoolean`
* `throwIfNotArray`
* `throwIfNotObject`
* `throwIfNotString`
* `throwIfNotNumber`
* `throwIfNotInteger`
* `throwIfNotFunction`
* `throwIfFalse`
* `throwIfEmptyString`
* `throwIfEmptyArray`
* `throwIfNotPositiveInteger`
* `throwIfNegativeInteger`
* `throwIfNotConstructable`

### Examples

```typescript
throwIfNotObject({}); // void
throwIfNotObject([]); // throws Error
throwIfNotObject(null); // throws Error
throwIfNotObject(undefined); // throws Error

```

You can also provide your own error messages, and errors.

```typescript
throwIfMissing(someValue, '`someValue` missing!'); // throws Error('`someValue` missing!')
throwIfMissing(someValue, '`someValue` missing!', ReferenceError); // throws ReferenceError('`someValue` missing!')

```

**Full test Docs [here](https://github.com/litchi-io/mod-utils/blob/master/src/ThrowIf/main.spec.ts).**

---

## Development

1) Install dependencies:

```sh
npm install
```

2) Compile:

```sh
make compile
```

3) Test:

```sh
make test # watch mode
make test-ci # CI mode / single run
```

4) Format the codebase:

```sh
make format
```

## Contributing

If you have comments, complaints, or ideas for improvements, feel free to open an issue or a pull request! See [Contributing guide](./CONTRIBUTING.md) for details about project setup, testing, etc.

If you make or are considering making an app using WatermelonDB, please let us know!

## Author and license

This library was created by [@LITCHI.IO](https://github.com/litchi-io). Main author and maintainer is [Slavo Vojacek](https://github.com/slavovojacek).

Contributors: [Slavo Vojacek](https://github.com/slavovojacek)

`@usefultools/utils` is available under the ISC license. See the [LICENSE file](./LICENSE.txt) for more info.
