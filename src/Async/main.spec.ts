import { makeRecoverable } from "./main"

describe("Async", () => {
  describe("makeRecoverable", () => {
    test("throws if `source` is not a function", async () => {
      try {
        await makeRecoverable("Some Value" as any)
      } catch (err) {
        expect(err.message).toMatch(/source must be a function/)
      }
    })

    test("throws if `maxRetries` is not a non-negative integer", async () => {
      try {
        await makeRecoverable(() => Promise.resolve(), "42" as any)
      } catch (err) {
        expect(err.message).toMatch(/maxRetries must be a positive integer/)
      }
    })

    test("resolves `source`", async () => {
      const source = () => Promise.resolve(42)
      const subject = await makeRecoverable(source)
      expect(subject).toEqual(42)
    })

    describe("on error", () => {
      test("rethrows original error if no retry policy is configured", async () => {
        const source = () => Promise.reject(new TypeError("Error!"))
        try {
          await makeRecoverable(source, 0)
        } catch (err) {
          expect(err.name).toEqual("TypeError")
          expect(err.message).toEqual("Error!")
        }
      })

      test("retries if basic retry policy is configured", async () => {
        const source = jest.fn(() => Promise.reject(new SyntaxError("Err")))
        const maxRetries = 5
        try {
          await makeRecoverable(source, maxRetries)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(maxRetries + 1)
          expect(err.name).toEqual("SyntaxError")
          expect(err.message).toEqual("Err")
        }
      })

      test("does not retry if retry error configuration does not match error type", async () => {
        const source = jest.fn(() => Promise.reject(new ReferenceError("RefErr")))

        const maxRetries = 3
        const recoverableError = TypeError

        try {
          await makeRecoverable(source, maxRetries, recoverableError)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(1)
        }
      })

      test("retries if retry policy includes correctly configured error type", async () => {
        const source = jest.fn(() => Promise.reject(new SyntaxError("SyntaxErr")))

        const maxRetries = 3
        const recoverableError = SyntaxError

        try {
          await makeRecoverable(source, maxRetries, recoverableError)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(maxRetries + 1)
        }
      })
    })
  })
})
