import * as Conditional from '.'
import { noop } from '../Helpers'
import { Conditional as ConditionalFn } from '../types'

describe('Conditionals', () => {
  interface ConditionalConfig {
    args?: Array<any>
    method: ConditionalFn
    val?: any
    expected: boolean
  }

  const runTests = (configs: ConditionalConfig[]) =>
    configs.forEach(config => {
      if (config.args) {
        test(`correctly evaluates for "${JSON.stringify(config.args)}"`, () => {
          expect(config.method(...(config.args as any))).toEqual(
            config.expected,
          )
        })
      } else {
        test(`correctly evaluates for "${JSON.stringify(config.val)}"`, () => {
          expect(config.method(config.val)).toEqual(config.expected)
        })
      }
    })

  describe('isNull', () => {
    const configs = [
      {
        method: Conditional.isNull,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isNull,
        val: null,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('isUndefined', () => {
    const configs = [
      {
        method: Conditional.isUndefined,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isUndefined,
        val: undefined,
        expected: true,
      },
      {
        method: Conditional.isUndefined,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isMissing', () => {
    const configs = [
      {
        method: Conditional.isMissing,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isMissing,
        val: undefined,
        expected: true,
      },
      {
        method: Conditional.isMissing,
        val: null,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('isPresent', () => {
    const configs = [
      {
        method: Conditional.isPresent,
        val: '',
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: noop,
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: {},
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: [],
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: 0,
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: false,
        expected: true,
      },
      {
        method: Conditional.isPresent,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isPresent,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isBoolean', () => {
    const configs = [
      {
        method: Conditional.isBoolean,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: false,
        expected: true,
      },
      {
        method: Conditional.isBoolean,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isBoolean,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isArray', () => {
    const configs = [
      {
        method: Conditional.isArray,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: [],
        expected: true,
      },
      {
        method: Conditional.isArray,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isArray,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isObject', () => {
    const configs = [
      {
        method: Conditional.isObject,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: {},
        expected: true,
      },
      {
        method: Conditional.isObject,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isObject,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isString', () => {
    const configs = [
      {
        method: Conditional.isString,
        val: '',
        expected: true,
      },
      {
        method: Conditional.isString,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isString,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isString,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isString,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isString,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isString,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isString,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isNumber', () => {
    const configs = [
      {
        method: Conditional.isNumber,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: 0,
        expected: true,
      },
      {
        method: Conditional.isNumber,
        val: 42,
        expected: true,
      },
      {
        method: Conditional.isNumber,
        val: Infinity,
        expected: true,
      },
      {
        method: Conditional.isNumber,
        val: NaN,
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: '42',
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isNumber,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isFunction', () => {
    const configs = [
      {
        method: Conditional.isFunction,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: noop,
        expected: true,
      },
      {
        method: Conditional.isFunction,
        val: ReferenceError,
        expected: true,
      },
      {
        method: Conditional.isFunction,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isFunction,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isNonEmptyString', () => {
    const configs = [
      {
        method: Conditional.isNonEmptyString,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: 'str',
        expected: true,
      },
      {
        method: Conditional.isNonEmptyString,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyString,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isNonEmptyArray', () => {
    const configs = [
      {
        method: Conditional.isNonEmptyArray,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: [{}],
        expected: true,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: [undefined],
        expected: true,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isNonEmptyArray,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isTrue', () => {
    const configs = [
      {
        method: Conditional.isTrue,
        val: '',
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: {},
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: [],
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: false,
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: true,
        expected: true,
      },
      {
        method: Conditional.isTrue,
        val: undefined,
        expected: false,
      },
      {
        method: Conditional.isTrue,
        val: null,
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isPositiveInteger', () => {
    const configs = [
      {
        method: Conditional.isPositiveInteger,
        val: 'Not a Number',
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: 0,
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: NaN,
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: Infinity,
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: Math.PI,
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: -1,
        expected: false,
      },
      {
        method: Conditional.isPositiveInteger,
        val: 1,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('isPositiveInteger', () => {
    const configs = [
      {
        method: Conditional.isNonNegativeInteger,
        val: 'Not a Number',
        expected: false,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: 0,
        expected: true,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: NaN,
        expected: false,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: Infinity,
        expected: false,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: Math.PI,
        expected: false,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: -1,
        expected: false,
      },
      {
        method: Conditional.isNonNegativeInteger,
        val: 1,
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('hasOneItem', () => {
    const configs = [
      {
        method: Conditional.hasOneItem,
        val: { a: 'b' },
        expected: false,
      },
      {
        method: Conditional.hasOneItem,
        val: -1,
        expected: false,
      },
      {
        method: Conditional.hasOneItem,
        val: [],
        expected: false,
      },
      {
        method: Conditional.hasOneItem,
        val: [{}],
        expected: true,
      },
      {
        method: Conditional.hasOneItem,
        val: ['', 1],
        expected: false,
      },
      {
        method: Conditional.hasOneItem,
        val: [null],
        expected: true,
      },
      {
        method: Conditional.hasOneItem,
        val: [undefined],
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('hasMultipleItems', () => {
    const configs = [
      {
        method: Conditional.hasMultipleItems,
        val: { a: 'b' },
        expected: false,
      },
      {
        method: Conditional.hasOneItem,
        val: -1,
        expected: false,
      },
      {
        method: Conditional.hasMultipleItems,
        val: [],
        expected: false,
      },
      {
        method: Conditional.hasMultipleItems,
        val: [{}],
        expected: false,
      },
      {
        method: Conditional.hasMultipleItems,
        val: ['', 1],
        expected: true,
      },
      {
        method: Conditional.hasMultipleItems,
        val: [null, undefined],
        expected: true,
      },
      {
        method: Conditional.hasMultipleItems,
        val: [null, undefined, ''],
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('isConstructable', () => {
    const configs = [
      {
        method: Conditional.isConstructable,
        val: 'Not a Function',
        expected: false,
      },
      {
        method: Conditional.isConstructable,
        val: noop,
        expected: false,
      },
      {
        method: Conditional.isConstructable,
        val: new Function(),
        expected: true,
      },
      {
        method: Conditional.isConstructable,
        val: function a() {},
        expected: true,
      },
      {
        method: Conditional.isConstructable,
        val: class {},
        expected: true,
      },
      {
        method: Conditional.isConstructable,
        val: class ClassName {},
        expected: true,
      },
    ]

    runTests(configs)
  })

  describe('hasOnlyKeys', () => {
    const configs = [
      {
        method: Conditional.hasOnlyKeys,
        args: [{}, []],
        expected: true,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [{ a: 'b' }, ['a']],
        expected: true,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [{ a: 'b' }, ['c']],
        expected: false,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [{ a: 'b', c: 'd' }, ['a']],
        expected: false,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [{ a: 'b' }, ['a', 'c']],
        expected: false,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [{}, null],
        expected: false,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: [null, []],
        expected: false,
      },
      {
        method: Conditional.hasOnlyKeys,
        args: ['', noop],
        expected: false,
      },
    ]

    runTests(configs)
  })

  describe('isEqual', () => {
    const configs = [
      {
        method: Conditional.isEqual,
        args: [{}, []],
        expected: false,
      },
      {
        method: Conditional.isEqual,
        args: [{ a: 'b' }, { a: 'b' }],
        expected: false,
      },
      {
        method: Conditional.isEqual,
        args: [[], []],
        expected: false,
      },
      {
        method: Conditional.isEqual,
        args: [null, null],
        expected: true,
      },
      {
        method: Conditional.isEqual,
        args: [undefined, undefined],
        expected: true,
      },
      {
        method: Conditional.isEqual,
        args: [Symbol('a'), Symbol('a')],
        expected: false,
      },
      {
        method: Conditional.isEqual,
        args: ['b', 'b'],
        expected: true,
      },
      {
        method: Conditional.isEqual,
        args: [new Function(), new Function()],
        expected: false,
      },
      {
        method: Conditional.isEqual,
        args: [noop, noop],
        expected: true,
      },
    ]

    runTests(configs)
  })
})
