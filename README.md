## Utils

A collection of light-weight methods and helpers for defensive programming

## Usage

There are 6 main modules available.

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

```typescript
isNull(null) // true

isNull(undefined) // false
isNull(0) // false
isNull(NaN) // false
```

```typescript
isUndefined(undefined) // true

isUndefined(null) // false
isUndefined(0) // false
```

```typescript
isMissing(null) // true
isMissing(undefined) // true

isMissing(0) // false
isMissing(NaN) // false
isMissing("") // false
```

```typescript
isPresent(0) // true
isPresent(NaN) // true
isPresent("") // true

isPresent(null) // false
isPresent(undefined) // false
```

```typescript
isBoolean(true) // true
isBoolean(false) // true

isBoolean(0) // false
```

```typescript
isArray([]) // true
isArray([null, undefined]) // true

isArray({}) // false
```

```typescript
isObject({}) // true

isObject(new Function()) // false
isObject([]) // false
```

```typescript
isString("") // true

isString(new String()) // false
```

```typescript
isNumber(42) // true
isNumber(Math.PI) // true
isNumber(Infinity) // true

isNumber(NaN) // false
```

```typescript
isInteger(42) // true

isInteger(Math.PI) // false
isInteger(Infinity) // false
isInteger(NaN) // false
```

```typescript
isFunction(() => {}) // true
isFunction(ReferenceError) // true

isFunction(new ReferenceError()) // false
```

```typescript
isNonEmptyString("Hello, World!") // true

isNonEmptyString("") // false
```

```typescript
isNonEmptyArray([null]) // true

isNonEmptyArray([]) // false
```

```typescript
isTrue(true) // true

isTrue(1) // false
isTrue(false) // false
```

```typescript
isFalse(false) // true

isFalse(0) // false
isFalse(true) // false
```

```typescript
isPositiveInteger(42) // true

isPositiveInteger(0) // false
isPositiveInteger(-42) // false
```

```typescript
isNonNegativeInteger(42) // true
isNonNegativeInteger(0) // true

isNonNegativeInteger(-42) // false
```

```typescript
hasOneItem([null]) // true

hasOneItem([]) // false
hasOneItem([42, Math.PI]) // false
```

```typescript
hasMultipleItems([42, Infinity]) // true

hasMultipleItems([]) // false
hasMultipleItems(["Hello, World"]) // false
```

```typescript
isConstructable(new Function()) // true
isConstructable(function a() {}) // true
isConstructable(class {}) // true
isConstructable(class ClassName {}) // true

isConstructable(() => {}) // false
```

```typescript
hasOnlyKeys({ a: "b", c: "d" }, ["a", "c"]) // true
hasOnlyKeys({ a: "b" }, ["a"]) // true
hasOnlyKeys({}, []) // true

hasOnlyKeys({ a: "b" }, ["c"]) // false
hasOnlyKeys({ a: "b", c: "d" }, ["a"]) // false
```

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

### Helpers

### Match

### ThrowIf

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
