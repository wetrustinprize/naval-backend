import * as TypeGraphQL from "type-graphql";

export enum PlayerOnMatchScalarFieldEnum {
  matchId = "matchId",
  playerId = "playerId",
  totalScanners = "totalScanners",
  totalMissiles = "totalMissiles",
  totalKills = "totalKills",
  totalDeaths = "totalDeaths",
  assignedAt = "assignedAt"
}
TypeGraphQL.registerEnumType(PlayerOnMatchScalarFieldEnum, {
  name: "PlayerOnMatchScalarFieldEnum",
  description: undefined,
});
