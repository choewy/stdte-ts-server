import { Credentials } from './apis/credentials.js';
import { Team } from './apis/team.js';

const main = async () => {
  await Credentials.signin();
  await Team.getTeams();
};

main();
