import * as Assertion from '../Assertions'

type ThrowableMethod = (val: any, error?: Error) => void

const makeThrowable = (
  assertion: Assertion.AssertionMethod,
  expectedType: string,
) => (val: any, error?: Error): void => {
  const valid = assertion(val)
  if (valid) {
    void 0
  } else {
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error(
        `Error – expected ${expectedType}, instead got ${typeof val}`,
      )
    }
  }
}

const throwIfMissing: ThrowableMethod = makeThrowable(
  Assertion.assertPresent,
  'something',
)
const throwIfNotBoolean: ThrowableMethod = makeThrowable(
  Assertion.assertBoolean,
  'boolean',
)
const throwIfNotObject: ThrowableMethod = makeThrowable(
  Assertion.assertObject,
  'object',
)
const throwIfNotString: ThrowableMethod = makeThrowable(
  Assertion.assertString,
  'string',
)
const throwIfNotOption: ThrowableMethod = makeThrowable(
  Assertion.assertOption,
  'option',
)

export {
  ThrowableMethod,
  throwIfMissing,
  throwIfNotBoolean,
  throwIfNotObject,
  throwIfNotString,
  throwIfNotOption,
}
