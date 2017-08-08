import * as ThrowIf from '.'

describe('Assertions', () => {
  interface ThrowIfConfig {
    method: ThrowIf.ThrowableMethod
    val: any
    throws: boolean
  }

  const runTests = (configs: ThrowIfConfig[]) =>
    configs.forEach(config => {
      test(`correctly evaluates for "${config.val}"`, () => {
        if (config.throws) {
          expect(() => config.method(config.val)).toThrow()
        } else {
          expect(() => config.method(config.val)).not.toThrow()
        }
      })
    })

  describe('throwIfMissing', () => {
    const configs = [
      {
        method: ThrowIf.throwIfMissing,
        val: '',
        throws: false,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: 0,
        throws: false,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: false,
        throws: false,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: undefined,
        throws: true,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: null,
        throws: true,
      },
    ]

    runTests(configs)
  })

  // ... etc
})
