import { makeRecoverable, timeout, withTimeout } from "./main"

describe("Async", () => {
  describe("withTimeout", () => {
    it("resolves after 250ms", async () => {
      const source = () => Promise.resolve("foo")
      const val = await withTimeout(source, 250)
      expect(val).toEqual("foo")
    })
  })

  describe("timeout", () => {
    it("resolves original promise within time limit", async () => {
      const source = new Promise((resolve) => setTimeout(() => resolve("foo"), 250))
      const res = await timeout(source, 500)
      expect(res).toEqual("foo")
    })

    it("rejects after 250ms", async () => {
      const source = new Promise((resolve) => setTimeout(() => resolve("foo"), 500))

      try {
        await timeout(source, 250)
      } catch (err) {
        expect(err instanceof Error).toEqual(true)
        expect(err.message).toEqual("Async operation timed out")
      }
    })
  })

  describe("makeRecoverable", () => {
    it("throws if `source` is not a function", async () => {
      try {
        await makeRecoverable("Some Value" as any)
      } catch (err) {
        expect(err.message).toMatch(/source must be a function/)
      }
    })

    it("throws if `maxRetries` is not a non-negative integer", async () => {
      try {
        await makeRecoverable(() => Promise.resolve(), "42" as any)
      } catch (err) {
        expect(err.message).toMatch(/maxRetries must be a positive integer/)
      }
    })

    it("resolves `source`", async () => {
      const source = () => Promise.resolve(42)
      const subject = await makeRecoverable(source)
      expect(subject).toEqual(42)
    })

    describe("on error", () => {
      it("rethrows original error if no retry policy is configured", async () => {
        const source = () => Promise.reject(new TypeError("Error!"))
        try {
          await makeRecoverable(source, 0)
        } catch (err) {
          expect(err.name).toEqual("TypeError")
          expect(err.message).toEqual("Error!")
        }
      })

      it("retries if basic retry policy is configured", async () => {
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

      it("retries after a timeout if delay is configured", async () => {
        const source = jest.fn(() => Promise.reject(new SyntaxError("Err")))
        const maxRetries = 3
        try {
          await makeRecoverable(source, maxRetries, 100)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(maxRetries + 1)
          expect(err.name).toEqual("SyntaxError")
          expect(err.message).toEqual("Err")
        }
      })

      it("does not retry if retry error configuration does not match error type", async () => {
        const source = jest.fn(() => Promise.reject(new ReferenceError("RefErr")))

        const maxRetries = 3
        const recoverableError = TypeError

        try {
          await makeRecoverable(source, maxRetries, 0, recoverableError)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(1)
        }
      })

      it("retries if retry policy includes correctly configured error type", async () => {
        const source = jest.fn(() => Promise.reject(new SyntaxError("SyntaxErr")))

        const maxRetries = 3
        const recoverableError = SyntaxError

        try {
          await makeRecoverable(source, maxRetries, 0, recoverableError)
        } catch (err) {
          expect(source).toHaveBeenCalledTimes(maxRetries + 1)
        }
      })
    })
  })
})
