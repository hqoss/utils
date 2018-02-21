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

### Env

### Helpers

### Match

### ThrowIf

## Development

To Install:
`npm install`

To Compile:
`make compile`

To Test:
`make test`

To Prettify:
`make prettify`
