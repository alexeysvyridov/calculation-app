import { Role } from "./roles.js";

export class Permissions {
  // permissions: [];
  constructor() {
    // this.permissions = []
  }
  getPermissionsByRoleName(roleName: string) {
    const allRoles = new Role().getRoles();
    const role = allRoles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
  }
}