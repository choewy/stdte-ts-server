import { Credentials } from './apis/credentials.js';
import { Team } from './apis/team.js';

const main = async () => {
  await Credentials.signin();
  await Team.createTeam();
  await Team.updateTeam(1);
  await Team.getTeams();
};

main();
