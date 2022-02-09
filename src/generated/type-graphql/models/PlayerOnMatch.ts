import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Match } from "../models/Match";
import { User } from "../models/User";

@TypeGraphQL.ObjectType("PlayerOnMatch", {
  isAbstract: true
})
export class PlayerOnMatch {
  match?: Match;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  matchId!: string;

  player?: User;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  playerId!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  totalScanners!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  totalMissiles!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  totalKills!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  totalDeaths!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  assignedAt!: Date;
}
