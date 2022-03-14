import * as TypeGraphQL from "type-graphql";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}
TypeGraphQL.registerEnumType(UserRole, {
  name: "UserRole",
  description: undefined,
});
