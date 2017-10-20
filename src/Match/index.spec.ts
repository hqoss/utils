import { match, _def } from "."

describe("Helper", () => {
  describe("match", () => {
    test("throws if matcher is not an object or an array", () => {
      const disallowedMatchers = [
        new Function(),
        class {},
        "Str",
        42,
        true,
        null,
        undefined,
      ]

      disallowedMatchers.forEach(matcher => {
        expect(() => match("")(matcher)).toThrow(TypeError)
        expect(() => match("")(matcher)).toThrow(
          /`matcher` has to be either an Object or an Array/,
        )
      })
    })

    test("throws if no arms present when matcher is an object", () => {
      const matcher = {}
      expect(() => match("")(matcher)).toThrow()
      expect(() => match("")(matcher)).toThrow(
        /`matcher` has to contain at least one arm/,
      )
    })

    test("throws if no arms present when matcher is an array", () => {
      const matcher = [[]]
      expect(() => match("")(...matcher)).toThrow()
      expect(() => match("")(...matcher)).toThrow(
        /`matcher` has to contain at least one arm/,
      )
    })

    test("throws an error if `_def` is not present on the matcher object", () => {
      const config = {
        explicitMatch: Symbol("ExplicitMatch"),
        matchedValue: "Matched Value",
      }

      const matcher = {
        [config.explicitMatch]: config.matchedValue,
      }

      expect(() => match(config.explicitMatch)(matcher)).toThrow(ReferenceError)
      expect(() => match(config.explicitMatch)(matcher)).toThrow(
        /`matcher` needs to contain a default `_def` arm/,
      )
    })

    // test('has `_def` property available', () => {
    //   expect((match as any)._def).toEqual(_def)
    // })

    describe("basic", () => {
      test("correctly matches against a value, returns correct result", () => {
        const config = {
          explicitMatch: Symbol("ExplicitMatch"),
          matchedValue: "Matched Value",
          defaultValue: "Default Value",
        }

        const matcher = {
          [config.explicitMatch]: config.matchedValue,
          [_def]: config.defaultValue,
        }

        expect(match(config.explicitMatch)(matcher)).toEqual(
          config.matchedValue,
        )
      })

      test("correctly matches against a value, calls correct result", () => {
        const config = {
          explicitMatch: Symbol("ExplicitMatch"),
          matchedValue: jest.fn(),
          defaultValue: "Default Value",
        }

        const matcher = {
          [config.explicitMatch]: config.matchedValue,
          [_def]: config.defaultValue,
        }

        match(config.explicitMatch)(matcher)

        expect(config.matchedValue).toHaveBeenCalledWith(config.explicitMatch)
      })
    })

    describe("advanced", () => {
      test("correctly matches against a value, returns correct result", () => {
        const config = {
          explicitMatch: Symbol("ExplicitMatch"),
          matchedValue: "Matched Value",
          defaultValue: "Default Value",
        }

        const matcher = [
          [config.explicitMatch, config.matchedValue],
          [_def, config.defaultValue],
        ]

        expect(match(config.explicitMatch)(...matcher)).toEqual(
          config.matchedValue,
        )
      })

      test("correctly matches against a value, calls correct result", () => {
        const config = {
          explicitMatch: Symbol("ExplicitMatch"),
          matchedValue: jest.fn(),
          defaultValue: "Default Value",
        }

        const matcher = [
          [config.explicitMatch, config.matchedValue],
          [_def, config.defaultValue],
        ]

        match(config.explicitMatch)(...matcher)

        expect(config.matchedValue).toHaveBeenCalledWith(config.explicitMatch)
      })

      test("correctly matches against an assertion, returns correct result", () => {
        const explicitMatch = "Hello, World!"

        const config = {
          truthyAssertionMatch: (val: string) => val === explicitMatch,
          falsyAssertionMatch: (val: string) =>
            val.length === explicitMatch.length + 1,
          matchedValue: "Matched Value",
          unmatchedValue: "Unmatched Value",
          defaultValue: "Default Value",
        }

        const matcher = [
          [config.truthyAssertionMatch, config.matchedValue],
          [config.falsyAssertionMatch, config.unmatchedValue],
          [_def, config.defaultValue],
        ]

        expect(match(explicitMatch)(...matcher)).toEqual(config.matchedValue)
      })

      test("correctly matches against `_def`, returns correct result", () => {
        const config = {
          falsyAssertionMatch: () => false,
          nonMatch: Symbol("Something"),
          unmatchedValue: "Unmatched Value",
          defaultValue: "Default Value",
        }

        const matcher = [
          [config.falsyAssertionMatch, config.unmatchedValue],
          [config.nonMatch, config.unmatchedValue],
          [_def, config.defaultValue],
        ]

        expect(match("")(...matcher)).toEqual(config.defaultValue)
      })
    })
  })
})
