import { Some } from '@threestup/monads'

import * as ThrowIf from '.'

import { noop } from '../Helpers'

describe('Assertions', () => {
  interface ThrowIfConfig {
    method: ThrowIf.ThrowableMethod
    val: any
    throws: boolean
  }

  const runTests = (configs: ThrowIfConfig[]) =>
    configs.forEach(config => {
      test(`correctly evaluates for "${JSON.stringify(config.val)}"`, () => {
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
        val: noop,
        throws: false,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: {},
        throws: false,
      },
      {
        method: ThrowIf.throwIfMissing,
        val: [],
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

  describe('throwIfNotBoolean', () => {
    const configs = [
      {
        method: ThrowIf.throwIfNotBoolean,
        val: '',
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: 0,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: noop,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: {},
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: [],
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: false,
        throws: false,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: undefined,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotBoolean,
        val: null,
        throws: true,
      },
    ]

    runTests(configs)
  })

  describe('throwIfNotObject', () => {
    const configs = [
      {
        method: ThrowIf.throwIfNotObject,
        val: '',
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: 0,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: noop,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: {},
        throws: false,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: [],
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: false,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: undefined,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotObject,
        val: null,
        throws: true,
      },
    ]

    runTests(configs)
  })

  describe('throwIfNotString', () => {
    const configs = [
      {
        method: ThrowIf.throwIfNotString,
        val: '',
        throws: false,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: 0,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: noop,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: {},
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: [],
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: false,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: undefined,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotString,
        val: null,
        throws: true,
      },
    ]

    runTests(configs)
  })

  describe('throwIfNotOption', () => {
    const configs = [
      {
        method: ThrowIf.throwIfNotOption,
        val: '',
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: 0,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: noop,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: {},
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: [],
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: false,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: Some('str'),
        throws: false,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: undefined,
        throws: true,
      },
      {
        method: ThrowIf.throwIfNotOption,
        val: null,
        throws: true,
      },
    ]

    runTests(configs)
  })

  // ... etc
})
