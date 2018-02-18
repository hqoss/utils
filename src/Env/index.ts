import { isBoolean, isInteger, isPresent } from "../Conditionals"
import { throwIfMissing } from "../ThrowIf"

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

function getAsStr(key: string, env = process.env): string {
  const value = env[key]
  throwIfMissing(value, `env.${key} cannot be missing`, ReferenceError)
  return value as string
}

export { getAsBool, getAsInt, getAsStr }
