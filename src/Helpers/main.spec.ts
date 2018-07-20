import * as id from "shortid"
import { v4 } from "uuid"
import * as validateUUID from "uuid-validate"

import {
  noop,
  identity,
  getRandomIntInclusive,
  generateId,
  isValidId,
  generateUUID,
  isValidUUID,
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
    test("is a function that does not return", () => {
      expect(typeof noop).toEqual("function")
      expect(noop()).toBeUndefined()
      expect(noop("Hello, World!")).toBeUndefined()
      expect(noop(42, Math.PI, Infinity)).toBeUndefined()
    })
  })

  describe("identity", () => {
    test("is a function that returns the value it receives", () => {
      expect(typeof identity).toEqual("function")
      expect(identity("Hello, World!")).toEqual("Hello, World!")
    })
  })

  describe("getRandomIntInclusive", () => {
    test("throws if `min` provided is not a number", () => {
      const subjects = [
        () => getRandomIntInclusive("Hello, World!" as any, 1),
        () => getRandomIntInclusive(new Function() as any, 1),
        () => getRandomIntInclusive({} as any, 1),
        () => getRandomIntInclusive(true as any, 1),
        () => getRandomIntInclusive(NaN as any, 1),
      ]

      subjects.forEach(subject => {
        expect(subject).toThrow("must be a number")
        expect(subject).toThrow(TypeError)
      })
    })

    test("throws if `max` provided is not a number", () => {
      const subjects = [
        () => getRandomIntInclusive(0, "Hello, World!" as any),
        () => getRandomIntInclusive(0, new Function() as any),
        () => getRandomIntInclusive(0, {} as any),
        () => getRandomIntInclusive(0, true as any),
        () => getRandomIntInclusive(0, NaN as any),
      ]

      subjects.forEach(subject => {
        expect(subject).toThrow("must be a number")
        expect(subject).toThrow(TypeError)
      })
    })

    test("throws if `min` provided is greater than `max` provided", () => {
      const subjects = [
        () => getRandomIntInclusive(20, -7),
        () => getRandomIntInclusive(-2, -5),
        () => getRandomIntInclusive(1, 0),
        () => getRandomIntInclusive(Infinity, Math.PI),
      ]

      subjects.forEach(subject => {
        expect(subject).toThrow("`min` cannot be greater than `max`")
        expect(subject).toThrow(RangeError)
      })
    })

    test("correctly evaluates for valid scenarios", () => {
      const scenarios = [
        { min: 0, max: 20 },
        { min: -10, max: 10 },
        { min: 0, max: 0 },
        { min: 100, max: 100 },
        { min: 0.1, max: 1.0 },
        { min: Math.PI, max: Infinity },
      ]

      scenarios.forEach(scenario => {
        const subject = getRandomIntInclusive(scenario.min, scenario.max)
        expect(subject >= scenario.min).toEqual(true)
        expect(subject <= scenario.max).toEqual(true)
      })
    })
  })

  describe("generateId", () => {
    test("generates a random id", () => {
      ;(id.generate as any).mockImplementationOnce(() => "abc-123")

      const subject = generateId()
      expect(subject).toEqual("abc-123")
    })
  })

  describe("isValidId", () => {
    test("validates an id", () => {
      ;(id.isValid as any).mockImplementationOnce(() => true)
      ;(id.isValid as any).mockImplementationOnce(() => false)

      expect(isValidId("foo")).toEqual(true)
      expect(isValidId("foo")).toEqual(false)
    })
  })

  describe("generateUUID", () => {
    test("generates a uuid", () => {
      ;(v4 as any).mockImplementationOnce(() => "abc-123-def-456")

      const subject = generateUUID()
      expect(subject).toEqual("abc-123-def-456")
    })
  })

  describe("isValidUUID", () => {
    test("validates a uuid", () => {
      const uuid = "95ecc380-afe9-11e4-9b6c-751b66dd541e"
      ;(validateUUID as any).mockImplementationOnce(() => true)
      expect(isValidUUID(uuid)).toEqual(true)
      ;(validateUUID as any).mockImplementationOnce(() => false)
      expect(isValidUUID(uuid)).toEqual(false)
    })
  })
})
