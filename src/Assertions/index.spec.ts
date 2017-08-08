import * as Assertion from '.'

describe('Assertions', () => {
  interface AssertionConfig {
    method: Assertion.AssertionMethod
    val: any
    expected: boolean
  }

  const runTests = (configs: AssertionConfig[]) =>
    configs.forEach(config => {
      test(`correctly evaluates for "${config.val}"`, () => {
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

  // ... etc
})
