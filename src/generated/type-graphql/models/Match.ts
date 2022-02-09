import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { PlayerOnMatch } from "../models/PlayerOnMatch";
import { User } from "../models/User";
import { MatchState } from "../enums/MatchState";

@TypeGraphQL.ObjectType("Match", {
  isAbstract: true
})
export class Match {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => MatchState, {
    nullable: false
  })
  state!: "WAITING" | "PLAYING" | "COMPLETE";

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  roundTimer!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  currentTimer!: number;

  @TypeGraphQL.Field(_type => GraphQLScalars.JSONResolver, {
    nullable: false
  })
  match!: Prisma.JsonValue;

  currentPlayer?: User;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  currentPlayerId!: string;

  players?: PlayerOnMatch[];

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;
}
