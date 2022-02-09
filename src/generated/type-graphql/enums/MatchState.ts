import * as TypeGraphQL from "type-graphql";

export enum MatchState {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
  COMPLETE = "COMPLETE"
}
TypeGraphQL.registerEnumType(MatchState, {
  name: "MatchState",
  description: undefined,
});
