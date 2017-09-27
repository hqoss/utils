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

export { noop, identity }
