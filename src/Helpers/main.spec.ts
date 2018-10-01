import { generate, isValid } from "shortid"
import * as validateUUID from "uuid-validate"

import {
  fill,
  generateId,
  generateUUID,
  getRandomIntInclusive,
  identity,
  isValidId,
  isValidUUID,
  noop,
} from "./main"

jest
  .mock("shortid", () => ({
    generate: jest.fn(),
    isValid: jest.fn(),
  }))
  .mock("uuid", () => ({
    v4: jest.fn(),
  }))
  .mock("uuid-validate", () => jest.fn())

describe("Helpers", () => {
  describe("noop", () => {
    it("is a function that does not return", () => {
      expect(typeof noop).toEqual("function")
      expect(noop()).toBeUndefined()
      expect(noop("Hello, World!")).toBeUndefined()
      expect(noop(42, Math.PI, Infinity)).toBeUndefined()
    })
  })

  describe("identity", () => {
    it("is a function that returns the value it receives", () => {
      expect(typeof identity).toEqual("function")
      expect(identity("Hello, World!")).toEqual("Hello, World!")
    })
  })

  describe("getRandomIntInclusive", () => {
    it("throws if `min` provided is not a number", () => {
      const subjects = [
        () => getRandomIntInclusive("Hello, World!" as any, 1),
        () => getRandomIntInclusive(new Function() as any, 1),
        () => getRandomIntInclusive({} as any, 1),
        () => getRandomIntInclusive(true as any, 1),
        () => getRandomIntInclusive(NaN as any, 1),
      ]

      subjects.forEach((subject) => {
        expect(subject).toThrow("must be a number")
        expect(subject).toThrow(TypeError)
      })
    })

    it("throws if `max` provided is not a number", () => {
      const subjects = [
        () => getRandomIntInclusive(0, "Hello, World!" as any),
        () => getRandomIntInclusive(0, new Function() as any),
        () => getRandomIntInclusive(0, {} as any),
        () => getRandomIntInclusive(0, true as any),
        () => getRandomIntInclusive(0, NaN as any),
      ]

      subjects.forEach((subject) => {
        expect(subject).toThrow("must be a number")
        expect(subject).toThrow(TypeError)
      })
    })

    it("throws if `min` provided is greater than `max` provided", () => {
      const subjects = [
        () => getRandomIntInclusive(20, -7),
        () => getRandomIntInclusive(-2, -5),
        () => getRandomIntInclusive(1, 0),
        () => getRandomIntInclusive(Infinity, Math.PI),
      ]

      subjects.forEach((subject) => {
        expect(subject).toThrow("`min` cannot be greater than `max`")
        expect(subject).toThrow(RangeError)
      })
    })

    it("correctly evaluates for valid scenarios", () => {
      const scenarios = [
        { min: 0, max: 20 },
        { min: -10, max: 10 },
        { min: 0, max: 0 },
        { min: 100, max: 100 },
        { min: 0.1, max: 1.0 },
        { min: Math.PI, max: Infinity },
      ]

      scenarios.forEach((scenario) => {
        const subject = getRandomIntInclusive(scenario.min, scenario.max)
        expect(subject >= scenario.min).toEqual(true)
        expect(subject <= scenario.max).toEqual(true)
      })
    })
  })

  describe("generateId", () => {
    it("generates a random id", () => {
      const subject = generateId()
      expect(isValid(subject)).toEqual(true)
    })
  })

  describe("isValidId", () => {
    it("validates an id", () => {
      expect(isValidId(generate())).toEqual(true)
      expect(isValidId("foo")).toEqual(false)
    })
  })

  describe("generateUUID", () => {
    it("generates a uuid", () => {
      const subject = generateUUID()
      expect(validateUUID(subject)).toEqual(true)
    })
  })

  describe("isValidUUID", () => {
    it("validates a uuid", () => {
      const uuid = "95ecc380-afe9-11e4-9b6c-751b66dd541e"
      expect(isValidUUID(uuid)).toEqual(true)
      expect(isValidUUID("foobar")).toEqual(false)
    })
  })

  describe("fill", () => {
    it("fills an array with `n` items", () => {
      expect(fill(0)).toEqual([])
      expect(fill(4)).toEqual([0, 1, 2, 3])
      expect(fill(-4)).toEqual([])
    })

    it("throws if constructing with a number larger than MAX_SAFE_INTEGER", () => {
      try {
        fill(Infinity)
      } catch (err) {
        expect(err.name).toEqual("RangeError")
        expect(err.message).toEqual(
          `number of items can only be less than ${Number.MAX_SAFE_INTEGER}`,
        )
      }
    })

    it("throws if constructing with not an integer", () => {
      try {
        fill(Math.PI)
      } catch (err) {
        expect(err.name).toEqual("TypeError")
        expect(err.message).toEqual("numberOfItems has to be an integer")
      }
    })
  })
})
