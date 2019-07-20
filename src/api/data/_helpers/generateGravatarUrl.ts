import * as md5 from 'md5'

/**
 * Implements the Gravatar API.
 * https://en.gravatar.com/site/implement/images/
 */
export default (email: string) => {
  const gravatarBaseUrl: string = 'https://www.gravatar.com/avatar'
  const gravatarDefault: string = 'identicon'

  const gravatarHash: string = md5(email.trim().toLowerCase())

  return `${gravatarBaseUrl}/${gravatarHash}?d=${gravatarDefault}`
}
