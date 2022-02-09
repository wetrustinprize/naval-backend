import * as TypeGraphQL from "type-graphql";

export enum MatchScalarFieldEnum {
  id = "id",
  state = "state",
  roundTimer = "roundTimer",
  currentTimer = "currentTimer",
  match = "match",
  currentPlayerId = "currentPlayerId",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(MatchScalarFieldEnum, {
  name: "MatchScalarFieldEnum",
  description: undefined,
});
