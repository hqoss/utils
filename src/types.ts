export type Conditional<T = any> = (...args: Array<T>) => boolean
export type Constructable<T = any> = new (...params: any[]) => T
export interface MatchArm {
  matchExpression: string | symbol | Function
  evaluation: any
}
