import { throwIfNotNumber } from '../ThrowIf'

/**
 * Returns void
 * @returns {void}
 */
const noop = (): void => {}

/**
 * Returns itself
 * @param {any} val to be returned
 * @returns {val}
 */
const identity = <T>(val: T): T => val

/**
 * Returns a random integer in the range provided
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} random integer within the range
 */
const getRandomIntInclusive = (min: number, max: number): number => {
  throwIfNotNumber(min, '`min` has to be a number', TypeError)
  throwIfNotNumber(max, '`max` has to be a number', TypeError)

  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)

  if (minCeiled > maxFloored) {
    throw new RangeError('`min` cannot be greater than `max`')
  }

  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled
}

export { noop, identity, getRandomIntInclusive }
