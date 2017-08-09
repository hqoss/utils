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
      throw new TypeError(
        `Error – expected ${expectedType}, instead got ${typeof val}`,
      )
    }
  }
}

const throwIfMissing: ThrowableMethod = makeThrowable(
  Assertion.assertPresent,
  'Something',
)
const throwIfNotBoolean: ThrowableMethod = makeThrowable(
  Assertion.assertBoolean,
  'Boolean',
)
const throwIfNotObject: ThrowableMethod = makeThrowable(
  Assertion.assertObject,
  'Object',
)
const throwIfNotString: ThrowableMethod = makeThrowable(
  Assertion.assertString,
  'String',
)
const throwIfNotOption: ThrowableMethod = makeThrowable(
  Assertion.assertOption,
  'Option',
)

export {
  ThrowableMethod,
  throwIfMissing,
  throwIfNotBoolean,
  throwIfNotObject,
  throwIfNotString,
  throwIfNotOption,
}
