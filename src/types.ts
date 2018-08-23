export type Conditional<T = any> = (...args: Array<T>) => boolean
export type Constructable<T = any> = new (...params: any[]) => T
export interface MatchArm {
  // tslint:disable-next-line:ban-types
  matchExpression: string | symbol | Function
  evaluation: any
}
