import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { User } from '../user/user.entity'

export { PermissionValues } from '../permission/permission.entity'

/**
 * Throws an error if a user doesn't have the proper permissions.
 * Checks the given user's permissions via the roles assigned to that user. If
 * the user has the permission `permissionValue` somewhere within its granted
 * permissions, return true. Otherwise, throw an ForbiddenError.
 */
export const needsPermission = async (user: User, permissionValue: string) => {
  if (!user) {
    throw new AuthenticationError(
      'No user was provided for authentication on a protected resource.',
    )
  }

  const permissionsRaw: any[] = await User.createQueryBuilder('user')
    .leftJoin('user.roles', 'role')
    .leftJoin('role.permissions', 'permission')
    .select(['permission.value'])
    .where('user.id = :id', { id: user.id })
    .getRawMany()

  /**
   * getRawMany returns an array of objects. We just want an array of strings.
   * Clean up the array of objects to return a sensible array.
   */
  const permissions: string[] = []
  permissionsRaw.forEach((p) => {
    permissions.push(p.permission_value)
  })

  if (!permissions.includes(permissionValue)) {
    throw new ForbiddenError("The user doesn't have permission to do that.")
  }

  return true
}
