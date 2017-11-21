import * as Conditional from "../Conditionals"
import { Conditional as ConditionalFn, Constructable } from "../types"

/**
 * Throw if a value is not of type Boolean
 * @param  {Function} condition – Condition with `(val: any) => Boolean` signature
 * @param  {String} expectedType – expected type, in case of Error
 * @throws {TypeError, Error}
 * @returns {Function} – `(val: any, errMessage?: String, err?: Function) => void | throw` signature
 */
const makeThrowable = (condition: ConditionalFn, expectedType: string = "") => (
  val: any,
  errMessage: string = "",
  err: Constructable<Error> = Error,
) => {
  if (!Conditional.isNonEmptyString(expectedType)) {
    throw new TypeError('"expectedType" has to be a non-empty string')
  }

  const valid = condition(val)
  const errorMessage = Conditional.isNonEmptyString(errMessage)
    ? errMessage
    : `Error – expected "${expectedType}", instead got "${val}: ${typeof val}"`

  if (Conditional.isTrue(valid)) {
    void 0
  } else {
    throw new err(errorMessage)
  }
}

/**
 * Throw if a value is missing (it's null or undefined)
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfMissing = makeThrowable(Conditional.isPresent, "Something")

/**
 * Throw if a value is present (it's not null or undefined)
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfPresent = makeThrowable(Conditional.isMissing, "Nothing")

/**
 * Throw if a value is not of type Boolean
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotBoolean = makeThrowable(Conditional.isBoolean, "Boolean")

/**
 * Throw if a value is not of type Array
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotArray = makeThrowable(Conditional.isArray, "Array")

/**
 * Throw if a value is not of type Object
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotObject = makeThrowable(Conditional.isObject, "Object")

/**
 * Throw if a value is not of type String
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotString = makeThrowable(Conditional.isString, "String")

/**
 * Throw if a value is not of type Number
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotNumber = makeThrowable(Conditional.isNumber, "Number")

/**
 * Throw if a value is not of type Number and is not an Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotInteger = makeThrowable(Conditional.isInteger, "Integer")

/**
 * Throw if a value is not of type Function
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotFunction = makeThrowable(Conditional.isFunction, "Function")

/**
 * Throw if a value is `false`
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfFalse = makeThrowable(Conditional.isTrue, "True")

/**
 * Throw if a value is an empty String
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfEmptyString = makeThrowable(
  Conditional.isNonEmptyString,
  "Non-empty String",
)

/**
 * Throw if a value is an empty Array
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfEmptyArray = makeThrowable(
  Conditional.isNonEmptyArray,
  "Non-empty Array",
)

/**
 * Throw if a value is not a Positive Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotPositiveInteger = makeThrowable(
  Conditional.isPositiveInteger,
  "Positive Integer",
)

/**
 * Throw if a value is a Negative Integer
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNegativeInteger = makeThrowable(
  Conditional.isNonNegativeInteger,
  "Non-negative Integer",
)

/**
 * Throw if a value is not Constructable
 * @param  {any} val – value to pass the assertion
 * @param  {Error?} error – optional Error instance
 * @throws {TypeError, Error}
 * @returns {void}
 */
const throwIfNotConstructable = makeThrowable(
  Conditional.isConstructable,
  "Constructable",
)

export {
  makeThrowable,
  throwIfMissing,
  throwIfPresent,
  throwIfNotBoolean,
  throwIfNotArray,
  throwIfNotObject,
  throwIfNotString,
  throwIfNotNumber,
  throwIfNotInteger,
  throwIfNotFunction,
  throwIfFalse,
  throwIfEmptyString,
  throwIfEmptyArray,
  throwIfNotPositiveInteger,
  throwIfNegativeInteger,
  throwIfNotConstructable,
}
