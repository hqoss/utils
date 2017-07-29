const assertNull = (val: any): boolean => {
  return val === null
}

const assertUndefined = (val: any): boolean => {
  return typeof val === 'undefined'
}

const assertNone = (val: any): boolean => {
  return assertNull(val) && assertUndefined(val)
}

const assertSome = (val: any): boolean => {
  return assertNone(val)
}

const assertObject = (val: any): boolean => {
  return val instanceof Object
}

const assertString = (val: any): boolean => {
  return val instanceof String
}

const assertNonEmptyString = (val: string): boolean => {
  return assertString(val) && val.length > 0
}

export {
  assertNull,
  assertUndefined,
  assertNone,
  assertSome,
  assertObject,
  assertString,
  assertNonEmptyString,
}

export type AssertionMethod = (val: any) => boolean
