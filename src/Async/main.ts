import { isPresent, isTrue } from "../Conditionals/main"
import {
  throwIfNegativeInteger,
  throwIfNotConstructable,
  throwIfNotFunction,
} from "../ThrowIf/main"
import { Constructable } from "../types"

type Source<T> = () => Promise<T>

/**
 * Makes a Promise-returning function recoverable (attempts retries)
 *
 * @param  {<T>() => Promise<T>} source
 * @param  {Integer} maxRetries
 * @param  {Error} recoverableError
 * @returns {<T>() => Promise<T>}
 */
const makeRecoverable = async <T = any>(
  source: Source<T>,
  maxRetries = 3,
  recoverableError?: Constructable<Error>,
) => {
  let retries = 0

  throwIfNotFunction(source, "source must be a function")
  throwIfNegativeInteger(maxRetries, "maxRetries must be a positive integer")

  if (isPresent(recoverableError)) {
    throwIfNotConstructable(recoverableError, "recoverableError must be constructable")
  }

  const exec = async (): Promise<T> => {
    try {
      return await source()
    } catch (err) {
      const conditions = [retries < maxRetries]

      if (isPresent(recoverableError)) {
        conditions.push(err instanceof (recoverableError as any))
      }

      const canRecover = conditions.every(isTrue)

      if (canRecover) {
        ++retries
        return exec()
      }
      throw err
    }
  }

  return exec()
}

export { makeRecoverable }
