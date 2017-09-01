import { Option, _Some, _None } from '@threestup/monads'

type AssertionMethod = (val: any) => boolean

const assertNull: AssertionMethod = <T>(val: T | null): val is null => {
  return val === null
}

const assertUndefined: AssertionMethod = <T>(
  val: T | undefined,
): val is undefined => {
  return typeof val === 'undefined'
}

const assertMissing: AssertionMethod = <T>(
  val: T | undefined | null,
): val is undefined | null => {
  return assertNull(val) || assertUndefined(val)
}

const assertPresent: AssertionMethod = <T>(
  val: T | undefined | null,
): val is T => {
  return !assertMissing(val)
}

const assertBoolean: AssertionMethod = (val: any): val is boolean => {
  return assertPresent(val) && typeof val === 'boolean'
}

const assertArray: AssertionMethod = <T>(val: T[] | any): val is T[] => {
  return assertPresent(val) && Array.isArray(val)
}

const assertObject: AssertionMethod = (val: any): val is object => {
  return assertPresent(val) && typeof val === 'object' && !assertArray(val)
}

const assertString: AssertionMethod = (val: any): val is string => {
  return assertPresent(val) && typeof val === 'string'
}

const assertFunction: AssertionMethod = (val: any): val is Function => {
  return assertPresent(val) && typeof val === 'function'
}

const assertOption: AssertionMethod = <T>(
  val: Option<T> | any | undefined | null,
): val is Option<T> => {
  return (assertPresent(val) && val instanceof _Some) || val instanceof _None
}

const assertNonEmptyString: AssertionMethod = (val: any): val is string => {
  return assertString(val) && val.length > 0
}

const assertNonEmptyArray: AssertionMethod = <T>(
  val: T[] | any,
): val is T[] => {
  return assertArray(val) && val.length > 0
}

const assertTrue: AssertionMethod = (val: any): val is boolean => {
  return assertBoolean(val) && val === true
}

const assertFalse: AssertionMethod = (val: any): val is boolean => {
  return assertBoolean(val) && val === false
}

export {
  AssertionMethod,
  assertNull,
  assertUndefined,
  assertMissing,
  assertPresent,
  assertBoolean,
  assertArray,
  assertObject,
  assertString,
  assertFunction,
  assertOption,
  assertNonEmptyString,
  assertNonEmptyArray,
  assertTrue,
  assertFalse,
}
