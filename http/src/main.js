import { Role } from './apis/role.js';

const main = async () => {
  await Role.getRoles();
  await Role.createRole();
  await Role.updateRoleName(2);
  await Role.updateRolePolicy(2);
  await Role.updateRole(2);
  await Role.updateRoleUsers(2, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
};

main();
