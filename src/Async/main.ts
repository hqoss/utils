import { isPresent, isTrue } from "../Conditionals/main"
import {
  throwIfNegativeInteger,
  throwIfNotConstructable,
  throwIfNotFunction,
} from "../ThrowIf/main"
import { Constructable } from "../types"

type Source<T> = () => Promise<T>

/**
 * Makes a Promise-returning function resolve after a timeout
 *
 * @param  {<T>() => Promise<T>} source
 * @param  {Integer} timeoutMs
 * @returns {Promise<T>}
 */
function withTimeout<T>(source: Source<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, timeoutMs)).then(source)
}

/**
 * Races a Promise against a timeout
 *
 * @param  {<T>() => Promise<T>} source
 * @param  {Integer} timeoutMs
 * @returns {Promise<T>}
 */
function timeout<T>(source: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error("Async operation timed out")), timeoutMs),
    ),
    source,
  ]) as Promise<T>
}

/**
 * Makes a Promise-returning function recoverable (attempts retries)
 *
 * @param  {<T>() => Promise<T>} source
 * @param  {Integer} maxRetries
 * @param  {Integer} retryDelayMs
 * @param  {Error} recoverableError
 * @returns {Promise<T>}
 */
async function makeRecoverable<T = any>(
  source: Source<T>,
  maxRetries = 3,
  retryDelayMs = 0,
  recoverableError?: Constructable<Error>,
): Promise<T> {
  let retries = 0

  throwIfNotFunction(source, "source must be a function")
  throwIfNegativeInteger(maxRetries, "maxRetries must be a positive integer")
  throwIfNegativeInteger(retryDelayMs, "retryDelayMs must be a positive integer")

  if (isPresent(recoverableError)) {
    throwIfNotConstructable(recoverableError, "recoverableError must be constructable")
  }

  async function exec(): Promise<T> {
    try {
      if (retryDelayMs > 0 && retries > 0) {
        return await withTimeout(source, retryDelayMs)
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
      } else {
        throw err
      }
    }
  }

  return exec()
}

export { withTimeout, timeout, makeRecoverable }
