import { isBoolean, isInteger, isPresent } from "../Conditionals"
import { throwIfMissing } from "../ThrowIf"

/**
 * Attempts to retrieve and parse a value from process.env,
 * returns it as Boolean
 *
 * @param  {String} key
 * @param  {Object} env
 * @returns {Boolean}
 */
function getAsBool(key: string, env = process.env): boolean {
  const value = env[key]

  throwIfMissing(value, `env.${key} cannot be missing`, ReferenceError)

  let parsedValue: boolean | null
  let type: string = typeof value

  try {
    parsedValue = JSON.parse(value as string)
    type = typeof parsedValue

    if (!isBoolean(parsedValue)) {
      throw new TypeError("Err: type mismatch")
    }
  } catch (e) {
    parsedValue = null
  }

  if (isPresent(parsedValue)) {
    return parsedValue as boolean
  } else {
    throw new TypeError(`env.${key} has to be of type Boolean; was parsed as ${type} instead`)
  }
}

/**
 * Attempts to retrieve and parse a value from process.env,
 * returns it as Integer
 *
 * @param  {String} key
 * @param  {Object} env
 * @returns {Integer}
 */
function getAsInt(key: string, env = process.env): number {
  const value = env[key]

  throwIfMissing(value, `env.${key} cannot be missing`, ReferenceError)

  let parsedValue: number | null
  let type: string = typeof value

  try {
    parsedValue = JSON.parse(value as string)
    type = typeof parsedValue

    if (!isInteger(parsedValue)) {
      throw new TypeError("Err: type mismatch")
    }
  } catch (e) {
    parsedValue = null
  }

  if (isPresent(parsedValue)) {
    return parsedValue as number
  } else {
    throw new TypeError(`env.${key} has to be of type Integer; was parsed as ${type} instead`)
  }
}

/**
 * Attempts to retrieve a value from process.env,
 * returns it as String
 *
 * @param  {String} key
 * @param  {Object} env
 * @returns {String}
 */
function getAsStr(key: string, env = process.env): string {
  const value = env[key]
  throwIfMissing(value, `env.${key} cannot be missing`, ReferenceError)
  return value as string
}

export { getAsBool, getAsInt, getAsStr }
