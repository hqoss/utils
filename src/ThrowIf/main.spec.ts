import * as ThrowIf from "./main"

describe("ThrowIf", () => {
  describe("makeThrowable", () => {
    it("calls `condition` with `val`", () => {
      const condition = jest.fn((_) => true)
      const val = "Some Value"
      const subject = ThrowIf.makeThrowable(condition, "Expected Type")
      subject(val)
      expect(condition).toHaveBeenCalledWith(val)
    })

    it("throws when `condition` returns false", () => {
      const condition = jest.fn((_) => false)
      const val = "Some Value"
      const subject = ThrowIf.makeThrowable(condition, "Expected Type")
      expect(() => subject(val)).toThrow()
    })

    it("throws if `expectedType` not provided", () => {
      const condition = jest.fn()
      expect(ThrowIf.makeThrowable(condition)).toThrow(TypeError)
      expect(ThrowIf.makeThrowable(condition)).toThrow(
        /"expectedType" has to be a non-empty string/,
      )
    })

    it("when supposed to, throws a TypeError if `errMessage` not non-empty string", () => {
      const condition = jest.fn((_) => false)
      const val = "Some Value"
      const subject = ThrowIf.makeThrowable(condition, "Expected Type")
      expect(() => subject(val)).toThrow(TypeError)
      expect(() => subject(val)).toThrow(/Error – expected/)
    })

    it("when supposed to, throws `errMessage` if non-empty string", () => {
      const condition = jest.fn((_) => false)
      const val = "Some Value"
      const errorMessage = "Error Message"
      const subject = ThrowIf.makeThrowable(condition, "Expected Type")
      expect(() => subject(val, errorMessage)).toThrow(errorMessage)
    })

    it("when supposed to, throws `errMessage` if non-empty string, and correct Error type when provided", () => {
      const condition = jest.fn((_) => false)
      const val = "Some Value"
      const errorMessage = "Error Message"
      const error = ReferenceError
      const subject = ThrowIf.makeThrowable(condition, "Expected Type")
      expect(() => subject(val, errorMessage, error)).toThrow(errorMessage)
      expect(() => subject(val, errorMessage, error)).toThrow(error)
    })
  })
})
