import * as Assertion from '../Assertions'

type Constructable<T = Error> = new (...params: any[]) => T
type ThrowableMethod<T = Error> = (
  val: any,
  errMessage?: string,
  err?: Constructable<T>,
) => void

const makeThrowable = (
  assertion: Assertion.AssertionMethod,
  expectedType: string,
) => (val: any, errMessage: string = '', err: Constructable = Error): void => {
  const valid = assertion(val)
  const errorMessage = Assertion.assertNonEmptyString(errMessage)
    ? errMessage
    : `Error – expected "${expectedType}", instead got "${typeof val}"`

  if (Assertion.assertTrue(valid)) {
    void 0
  } else {
    throw new err(errorMessage)
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
  Constructable,
  ThrowableMethod,
  throwIfMissing,
  throwIfNotBoolean,
  throwIfNotObject,
  throwIfNotString,
  throwIfNotOption,
}
