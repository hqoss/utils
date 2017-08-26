import * as Helper from '.'

describe('Helper', () => {
  describe('noop', () => {
    test(`is a function that does not return`, () => {
      expect(typeof Helper.noop).toEqual('function')
      expect(Helper.noop()).toBeUndefined()
    })
  })

  describe('isValidISODate', () => {
    test(`correctly evaluates 'Some String' to false`, () => {
      const subject = Helper.isValidISODate('Some String')
      expect(subject).toEqual(false)
    })

    test(`correctly evaluates '2017-08-26T04:36:38.413Z' to true`, () => {
      const subject = Helper.isValidISODate('2017-08-26T04:36:38.413Z')
      expect(subject).toEqual(true)
    })
  })
})
