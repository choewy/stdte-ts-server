import { Team } from './apis/team.js';

const main = async () => {
  await Team.updateTeam(1, undefined, 3);
  await Team.getTeams();

  await Team.updateTeamMembers(1, []);
  await Team.getTeams();

  await Team.deleteTeam(1, []);
};

main();
