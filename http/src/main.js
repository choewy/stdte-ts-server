import { Credentials } from './apis/credentials.js';
import { Role } from './apis/role.js';

const main = async () => {
  await Credentials.signup();
  await Role.getRoles();
};

main();
