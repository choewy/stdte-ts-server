import { Credentials } from './apis/credentials.js';

const main = async () => {
  await Credentials.signout();
  await Credentials.signup();
  await Credentials.signin();
  await Credentials.updatePassword();
};

main();
