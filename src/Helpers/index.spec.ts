import * as Helper from '.'

describe('Helper', () => {
  test(`noop is a function that does not return`, () => {
    expect(typeof Helper.noop).toEqual('function')
    expect(Helper.noop()).toBeUndefined()
  })
})
