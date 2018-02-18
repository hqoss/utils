import { getAsBool, getAsInt, getAsStr } from "."

describe("env", () => {
  beforeEach(() => {
    this.env = {}
  })

  afterEach(() => {
    this.env = null
  })

  describe("getAsBool", () => {
    it("correctly retrieves the key from env, and parses its value as boolean", () => {
      const key = ":some_key"
      this.env = {
        [key]: "true",
      }
      const subject = getAsBool(key, this.env)
      expect(subject).toEqual(true)
    })

    it("throws a Reference Error when key not found in env", () => {
      const subject = () => getAsBool(":unknown_key", this.env)
      expect(subject).toThrow(ReferenceError)
      expect(subject).toThrow(`env.:unknown_key cannot be missing`)
    })

    it("throws a Type Error when key found in env is of incorrect type", () => {
      const key = ":some_key"
      this.env = {
        [key]: "1",
      }
      const subject = () => getAsBool(key, this.env)
      expect(subject).toThrow(TypeError)
      expect(subject).toThrow(`env.${key} has to be of type Boolean; was parsed as number instead`)
    })
  })

  describe("getAsInt", () => {
    it("correctly retrieves the key from env, and parses its value as integer", () => {
      const key = ":some_key"
      this.env = {
        [key]: "42",
      }
      const subject = getAsInt(key, this.env)
      expect(subject).toEqual(42)
    })

    it("throws a Reference Error when key not found in env", () => {
      const subject = () => getAsInt(":unknown_key", this.env)
      expect(subject).toThrow(ReferenceError)
      expect(subject).toThrow(`env.:unknown_key cannot be missing`)
    })

    it("throws a Type Error when key found in env is of incorrect type", () => {
      const key = ":some_key"
      this.env = {
        [key]: "3.14",
      }
      const subject = () => getAsInt(key, this.env)
      expect(subject).toThrow(TypeError)
      expect(subject).toThrow(`env.${key} has to be of type Integer; was parsed as number instead`)
    })
  })

  describe("getAsInt", () => {
    it("correctly retrieves the key from env, does no parsing", () => {
      const key = ":some_key"
      this.env = {
        [key]: "Hello, World!",
      }
      const subject = getAsStr(key, this.env)
      expect(subject).toEqual("Hello, World!")
    })

    it("throws a Reference Error when key not found in env", () => {
      const subject = () => getAsInt(":unknown_key", this.env)
      expect(subject).toThrow(ReferenceError)
      expect(subject).toThrow(`env.:unknown_key cannot be missing`)
    })
  })
})
