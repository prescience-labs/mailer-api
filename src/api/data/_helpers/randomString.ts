import * as crypto from 'crypto'

// https://stackoverflow.com/a/5191133/5623385
function roundUp(num: number, precision: number) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}

/**
 * Returns a random number with given length.
 */
export default (length: number = 10): string => {
  // generate random hex bytes using half of length since hex is 2 digits for every 1 base 10 digit
  const half: number = roundUp(length / 2, 0) // may be more than half of length
  return crypto
    .randomBytes(half)
    .toString('hex')
    .slice(-length) // ensure length
}
