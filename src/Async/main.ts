import { isPresent, isTrue, isNonNegativeInteger } from "../Conditionals/main"
import {
  throwIfNotFunction,
  throwIfNegativeInteger,
  throwIfNotConstructable,
} from "../ThrowIf/main"
import { Constructable } from "../types"

type Source<T> = () => Promise<T>

const timeout = (timeoutMs: number): Promise<never> =>
  new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(`Promise timed out after ${timeoutMs} ms`)), timeoutMs)
  })

/**
 * Makes a Promise-returning function recoverable (attempts retries, forces timeouts)
 *
 * @param  {<T>() => Promise<T>} source
 * @param  {Integer} maxRetries
 * @param  {Integer} timeoutPerError
 * @param  {Error} recoverableError
 * @returns {<T>() => Promise<T>}
 */
const makeRecoverable = async <T = any>(
  source: Source<T>,
  maxRetries = 3,
  timeoutPerError: number | null = null,
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
      if (isNonNegativeInteger(timeoutPerError)) {
        return await Promise.race([source(), timeout(timeoutPerError)])
      } else {
        return await source()
      }
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
