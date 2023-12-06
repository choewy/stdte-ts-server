import { Profile } from './apis/profile.js';

const main = async () => {
  await Profile.updateMyProfile();
  await Profile.getMyProfile();
};

main();
