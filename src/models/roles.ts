import allRoles from '../localDb/roles.json' with {type: "json"};

interface Roles  {
  name: string,
  permissions: string[]
}

export class Role {
  roles: Roles[];
  constructor() {
    this.roles = allRoles.roles;
  }
  getRoleByName(name) {
    return this.roles.find((role) => role.name === name)
  }
  getRoles() {
    return this.roles;
  }
}