import store from '../store'

export function hasPermission(permission) {
  let getters = store.getters;
  if (getters.userType === 1) { return true } //超管无敌
  let myPermissions = getters.permissions || []
  return myPermissions.includes(permission);
}
