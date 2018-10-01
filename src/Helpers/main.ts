import { generate, isValid } from "shortid"
import { v4 } from "uuid"
import * as validateUUID from "uuid-validate"

import { isEqual } from "../Conditionals/main"
import { throwIfNotInteger, throwIfNotNumber } from "../ThrowIf/main"

/**
 * Returns void
 *
 * @returns {void}
 */
function noop(..._args: any[]): void {
  return void 0
}

/**
 * Returns itself
 *
 * @param {any} val to be returned
 * @returns {val}
 */
function identity<T>(val: T): T {
  return val
}

/**
 * Returns a random integer in the range provided
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} random integer within the range
 */
function getRandomIntInclusive(min: number, max: number): number {
  // @TODO investigate the use of generators
  throwIfNotNumber(min, `min "${min}" must be a number`, TypeError)
  throwIfNotNumber(max, `max "${max}" must be a number`, TypeError)

  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)

  if (minCeiled > maxFloored) {
    throw new RangeError("`min` cannot be greater than `max`")
  } else if (isEqual(minCeiled, maxFloored)) {
    return minCeiled
  } else {
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled
  }
}

/**
 * Returns a random id
 *
 * @returns {String}
 */
function generateId(): string {
  return generate()
}

/**
 * Validates an id
 *
 * @param {any} val
 * @returns {String}
 */
function isValidId(val: any): val is string {
  return isValid(val)
}

/**
 * Returns a UUID V4
 *
 * @returns {String}
 */
function generateUUID(): string {
  return v4()
}

/**
 * Validates a UUID
 *
 * @param {any} val
 * @returns {String}
 */
function isValidUUID(val: any): val is string {
  return validateUUID(val)
}

/**
 * Fills an array with n items
 *
 * @param {Number} numberOfItems
 * @returns {Array<Number>}
 */
function fill(numberOfItems: number): Array<number> {
  const maxSafeInt = Number.MAX_SAFE_INTEGER

  if (numberOfItems >= maxSafeInt) {
    throw new RangeError(`number of items can only be less than ${maxSafeInt}`)
  }

  throwIfNotInteger(numberOfItems, `numberOfItems has to be an integer`)

  if (numberOfItems > 0) {
    return Array.from(Array(numberOfItems).keys())
  } else {
    return []
  }
}

export {
  noop,
  identity,
  getRandomIntInclusive,
  generateId,
  isValidId,
  generateUUID,
  isValidUUID,
  fill,
}
