import { Option, _Some, _None } from '@threestup/monads'

type AssertionMethod = (val: any) => boolean

const assertNull: AssertionMethod = <T>(val: T | null): val is null => {
  return val === null
}

const assertUndefined: AssertionMethod = <T>(val: T | undefined): val is undefined => {
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

const assertObject: AssertionMethod = (val: any): val is object => {
  return val instanceof Object // || typeof val === 'object' ??
}

const assertString: AssertionMethod = (val: any): val is string => {
  return val instanceof String
}

const assertOption: AssertionMethod = <T>(
  val: Option<T> | undefined | null,
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
  assertObject,
  assertString,
  assertOption,
  assertNonEmptyString,
}
