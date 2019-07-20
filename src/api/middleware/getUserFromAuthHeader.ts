import * as jwt from 'jsonwebtoken'
import { Brackets } from 'typeorm'
import { logger } from '../../config/logger'
import settings from '../../config/settings'
import { User } from '../data/user/user.entity'

/**
 * Returns a user from an auth bearer token.
 * https://www.thepolyglotdeveloper.com/2018/07/protect-graphql-properties-jwt-nodejs-application/
 */
const getUserFromAuthHeader = async (bearerToken: string) => {
  try {
    const bearerTokenArray = bearerToken.split(' ')
    if (
      bearerTokenArray.length !== 2 ||
      bearerTokenArray[0].toLowerCase() !== 'bearer'
    ) {
      logger.debug(
        'getUserFromAuthHeader() - Authorization bearer token was not formatted properly or did not exist.',
      )
      return {}
    }

    const decodedToken: any = await jwt.verify(
      bearerTokenArray[1],
      settings.secretKey,
    )

    const user: any = await User.createQueryBuilder('user')
      // .leftJoin('user.roles', 'role')
      // .leftJoin('role.permissions', 'permission')
      .select([
        'user.id',
        // 'permission.value',
      ])
      .where('user.id = :id', { id: decodedToken.id })
      .andWhere(
        new Brackets((qb) => {
          // Prevent user auth if lastPasswordReset is after the jwt's iat value.
          // This allows password resets to happen without keeping track of JWTs,
          // which is the whole point of JWTs.
          qb.where('user.lastPasswordReset < :iat', {
            iat: new Date(decodedToken.iat * 1000),
          }).orWhere('user.lastPasswordReset IS NULL')
        }),
      )
      .getOne()

    if (!user) {
      return {}
    }
    return user
  } catch (err) {
    logger.error(err)
    return {}
  }
}

export default getUserFromAuthHeader
