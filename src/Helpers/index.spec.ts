import { noop, identity } from '.'

describe('Helpers', () => {
  describe('noop', () => {
    test('is a function that does not return', () => {
      expect(typeof noop).toEqual('function')
      expect(noop()).toBeUndefined()
    })
  })

  describe('identity', () => {
    test('is a function that returns the value it receives', () => {
      expect(typeof identity).toEqual('function')
      expect(identity('Hello, World!')).toEqual('Hello, World!')
    })
  })
})
