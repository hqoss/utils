import * as Assertion from '.'

describe('Assertions', () => {
  describe('assertNull', () => {
    const configs = [
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

    configs.forEach(config => {
      test(`correctly evaluates for "${config.val}"`, () => {
        expect(config.method(config.val)).toEqual(config.expected)
      })
    })
  })

  // ... etc
})
