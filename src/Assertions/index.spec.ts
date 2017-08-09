import * as Assertion from '.'

import { noop } from '../Helpers'

describe('Assertions', () => {
  interface AssertionConfig {
    method: Assertion.AssertionMethod
    val: any
    expected: boolean
  }

  const runTests = (configs: AssertionConfig[]) =>
    configs.forEach(config => {
      test(`correctly evaluates for "${JSON.stringify(config.val)}"`, () => {
        expect(config.method(config.val)).toEqual(config.expected)
      })
    })

  describe('assertNull', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertNull,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: {},
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: [],
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: false,
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: undefined,
        expected: false,
      },
      {
        method: Assertion.assertNull,
        val: null,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('assertUndefined', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertUndefined,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: {},
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: [],
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: false,
        expected: false,
      },
      {
        method: Assertion.assertUndefined,
        val: undefined,
        expected: true,
      },
      {
        method: Assertion.assertUndefined,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('assertMissing', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertMissing,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: {},
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: [],
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: false,
        expected: false,
      },
      {
        method: Assertion.assertMissing,
        val: undefined,
        expected: true,
      },
      {
        method: Assertion.assertMissing,
        val: null,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('assertPresent', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertPresent,
        val: '',
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: noop,
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: {},
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: [],
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: 0,
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: false,
        expected: true,
      },
      {
        method: Assertion.assertPresent,
        val: undefined,
        expected: false,
      },
      {
        method: Assertion.assertPresent,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('assertBoolean', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertBoolean,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: {},
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: [],
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: false,
        expected: true,
      },
      {
        method: Assertion.assertBoolean,
        val: undefined,
        expected: false,
      },
      {
        method: Assertion.assertBoolean,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('assertArray', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertArray,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: {},
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: [],
        expected: true,
      },
      {
        method: Assertion.assertArray,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: false,
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: undefined,
        expected: false,
      },
      {
        method: Assertion.assertArray,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('assertObject', () => {
    const configs: AssertionConfig[] = [
      {
        method: Assertion.assertObject,
        val: '',
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: noop,
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: {},
        expected: true,
      },
      {
        method: Assertion.assertObject,
        val: [],
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: 0,
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: false,
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: undefined,
        expected: false,
      },
      {
        method: Assertion.assertObject,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  // ... etc
})
