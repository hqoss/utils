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
  return typeof val === 'boolean'
}

const assertArray: AssertionMethod = <T>(val: T[] | any): val is T[] => {
  return Array.isArray(val)
}

const assertObject: AssertionMethod = (val: any): val is object => {
  return assertPresent(val) && typeof val === 'object' && !assertArray(val)
}

const assertString: AssertionMethod = (val: any): val is string => {
  return typeof val === 'string'
}

const assertOption: AssertionMethod = <T>(
  val: Option<T> | any | undefined | null,
): val is Option<T> => {
  return val instanceof _Some || val instanceof _None
}

const assertNonEmptyString: AssertionMethod = (val: any): val is string => {
  return assertString(val) && val.length > 0
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
  assertOption,
  assertNonEmptyString,
}
