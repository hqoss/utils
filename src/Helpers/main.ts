import * as id from "shortid"
import { v4 } from "uuid"

import { isEqual } from "../Conditionals/main"
import { throwIfNotNumber } from "../ThrowIf/main"

/**
 * Returns void
 *
 * @returns {void}
 */
const noop = (..._args: any[]): void => {}

/**
 * Returns itself
 *
 * @param {any} val to be returned
 * @returns {val}
 */
const identity = <T>(val: T): T => val

/**
 * Returns a random integer in the range provided
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} random integer within the range
 */
const getRandomIntInclusive = (min: number, max: number): number => {
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
const generateId = (): string => id.generate()

/**
 * Validates an id
 *
 * @param {any} val
 * @returns {String}
 */
const isValidId = (val: any): val is string => id.isValid(val)

/**
 * Returns a UUID V4
 *
 * @returns {String}
 */
const generateUUID = (): string => v4()

export { noop, identity, getRandomIntInclusive, generateId, isValidId, generateUUID }
