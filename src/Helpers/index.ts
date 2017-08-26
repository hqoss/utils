import * as moment from 'moment'

const noop = (): void => {}

const isValidISODate = (val: string): boolean => {
  return moment(val, moment.ISO_8601, true).isValid()
}

export { noop, isValidISODate }
