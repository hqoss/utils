import {
  isPresent,
  isTrue,
  isNonEmptyArray,
  isArray,
  isFunction,
  isObject,
  isEqual,
} from "../Conditionals"
import { throwIfMissing, throwIfEmptyArray } from "../ThrowIf"
import { MatchArm } from "../types"

const _def = Symbol("_def")

/**
 * Returns normalised array for `match` to consume
 * @returns {Array}
 */
const normalizeBasicMatcher = (arms: Object = {}): MatchArm[] => {
  const ownPropSymbols: any[] = Object.getOwnPropertySymbols(arms)
  const ownPropNames: any[] = Object.getOwnPropertyNames(arms)

  return ownPropSymbols
    .concat(ownPropNames)
    .map(key => ({ matchExpression: key, evaluation: (arms as any)[key] }))
}

/**
 * Returns normalised array for `match` to consume
 * @returns {Array}
 */
const normalizeAdvancedMatcher = (arms: Array<any> = []): MatchArm[] => {
  return arms
    .filter(isNonEmptyArray)
    .map(([matchExpression, evaluation]) => ({ matchExpression, evaluation }))
}

/**
 * Matches against either a basic, or an advanced matcher.
 * Basic has the following signature: { [MatchExpression]: evaluation }
 * Advanced has the following signature: ...[ MatchExpression, evaluation ]
 * @returns {any}
 */
const match = (val: any) => (...args: any[]) => {
  const [matcher, ...potentialRestOfMatcher] = args

  let evaluation

  if (!(isObject(matcher) || isArray(matcher))) {
    throw new TypeError("`matcher` has to be either an Object or an Array")
  }

  const normalizedArms: Array<MatchArm> = isObject(matcher)
    ? normalizeBasicMatcher(matcher as Object)
    : normalizeAdvancedMatcher([matcher, ...potentialRestOfMatcher])

  throwIfEmptyArray(normalizedArms, "`matcher` has to contain at least one arm")

  const defaultArm = normalizedArms.find(arm => arm.matchExpression === _def)

  throwIfMissing(defaultArm, "`matcher` needs to contain a default `_def` arm", ReferenceError)

  const explicitMatch = normalizedArms.find(({ matchExpression }) => {
    if (matchExpression === _def) {
      return false
    }
    return isFunction(matchExpression)
      ? isTrue((matchExpression as Function)(val)) // @TODO why does the type guard above not work?
      : isEqual(matchExpression, val)
  })

  if (isPresent(explicitMatch)) {
    evaluation = (explicitMatch as MatchArm).evaluation
  } else {
    evaluation = (defaultArm as MatchArm).evaluation
  }

  return isFunction(evaluation) ? evaluation(val) : evaluation
}

export { match, _def }
