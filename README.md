# JavaScript / TypeScript Utilities

A collection of light-weight methods and helpers for defensive programming

## Usage

There are 6 main modules available:

* Async
* Conditionals
* Env
* Helpers
* Match
* ThrowIf

### Async

#### Retrying Promises

The below will retry 5 times.

```typescript
function getUsers() {
  const source = () => http.get("/api/users")
  return makeRecoverable(source, 5)
}
```

The below will retry thrice if the error caught is a `TimeoutError`.

```typescript
function initService() {
  const source = () => service.init()
  return makeRecoverable(source, 3, TimeoutError)
}
```

### Conditionals

Find out whether value is null

```typescript
isNull(null) // true

isNull(undefined) // false
isNull(0) // false
isNull(NaN) // false
```

Find out whether type of value is undefined

```typescript
isUndefined(undefined) // true

isUndefined(null) // false
isUndefined(0) // false
```

Find out whether value is null or undefined, therefore "missing"

```typescript
isMissing(null) // true
isMissing(undefined) // true

isMissing(0) // false
isMissing(NaN) // false
isMissing("") // false
```

Find out whether value is not null and not undefined, therefore "present"

```typescript
isPresent(0) // true
isPresent(NaN) // true
isPresent("") // true

isPresent(null) // false
isPresent(undefined) // false
```

Find out whether value is of type Boolean

```typescript
isBoolean(true) // true
isBoolean(false) // true

isBoolean(0) // false
```

Find out whether value is of type Array

```typescript
isArray([]) // true
isArray([null, undefined]) // true

isArray({}) // false
```

Find out whether value is of type Object

```typescript
isObject({}) // true

isObject(new Function()) // false
isObject([]) // false
```

Find out whether value is of type String

```typescript
isString("") // true

isString(new String()) // false
```

Find out whether value is of type Number

```typescript
isNumber(42) // true
isNumber(Math.PI) // true
isNumber(Infinity) // true

isNumber(NaN) // false
```

Find out whether value is of type Number and is an Integer

```typescript
isInteger(42) // true

isInteger(Math.PI) // false
isInteger(Infinity) // false
isInteger(NaN) // false
```

Find out whether value is of type Function

```typescript
isFunction(() => {}) // true
isFunction(ReferenceError) // true

isFunction(new ReferenceError()) // false
```

Find out whether value is of type String, and has at least 1 character

```typescript
isNonEmptyString("Hello, World!") // true

isNonEmptyString("") // false
```

Find out whether value is of type Array and has at least one element

```typescript
isNonEmptyArray([null]) // true

isNonEmptyArray([]) // false
```

Find out whether value is of type Boolean and is true

```typescript
isTrue(true) // true

isTrue(1) // false
isTrue(false) // false
```

Find out whether value is of type Boolean and is false

```typescript
isFalse(false) // true

isFalse(0) // false
isFalse(true) // false
```

Find out whether value is an Integer and greater than 0

```typescript
isPositiveInteger(42) // true

isPositiveInteger(0) // false
isPositiveInteger(-42) // false
```

Find out whether value is an Integer and greater or equal to 0

```typescript
isNonNegativeInteger(42) // true
isNonNegativeInteger(0) // true

isNonNegativeInteger(-42) // false
```

Find out whether value is an Array and its length is 1

```typescript
hasOneItem([null]) // true

hasOneItem([]) // false
hasOneItem([42, Math.PI]) // false
```

Find out whether value is an Array and its length is more than 1

```typescript
hasMultipleItems([42, Infinity]) // true

hasMultipleItems([]) // false
hasMultipleItems(["Hello, World"]) // false
```

Find out whether value is Constructable

```typescript
isConstructable(new Function()) // true
isConstructable(function a() {}) // true
isConstructable(class {}) // true
isConstructable(class ClassName {}) // true

isConstructable(() => {}) // false
```

Find out whether value has only the keys provided

```typescript
hasOnlyKeys({ a: "b", c: "d" }, ["a", "c"]) // true
hasOnlyKeys({ a: "b" }, ["a"]) // true
hasOnlyKeys({}, []) // true

hasOnlyKeys({ a: "b" }, ["c"]) // false
hasOnlyKeys({ a: "b", c: "d" }, ["a"]) // false
```

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

### Env

Assuming your process.env has the following:

```
IS_PROD=true
ASYNC_MAX_TIMEOUT=2500
API_KEY=0351f02f-0be2-49d1-bfed-5c45275d4fd2
```

#### Booleans

To retrieve the Boolean value of `"IS_PROD"` from `process.env`, you can use the following method.

```typescript
getAsBool("IS_PROD") // true
```

If the raw value cannot be found, or the parsed value is not a Boolean, **this function will throw** a `ReferenceError` or a `TypeError` respectively.

#### Integers

To retrieve the Integer value of `"ASYNC_MAX_TIMEOUT"` from `process.env`, you can use the following method.

```typescript
getAsInt("ASYNC_MAX_TIMEOUT") // 2500
```

If the raw value cannot be found, or the parsed value is not an Integer, **this function will throw** a `ReferenceError` or a `TypeError` respectively.

#### Strings

To retrieve the String value of `"API_KEY"` from `process.env`, you can use the following method.

```typescript
getAsStr("API_KEY") // "0351f02f-0be2-49d1-bfed-5c45275d4fd2"
```

If the raw value cannot be found, **this function will throw** a `ReferenceError`.

In all of the above, you can also use your own env object like so:

```typescript
// env = { "API_KEY": "true" }
getAsBool("API_KEY", env)
```

### Helpers

TBC

### Match

TBC

### ThrowIf

TBC

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
