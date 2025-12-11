import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../dto/create-user.dto";
import { Role } from "@prisma/client";

export class UserEntity {
  id!: string;
  email!: string;
  password!: string;
  role!: Role;
  createdAt!: Date;
  updatedAt!: Date;
}

export type UserResponse = Omit<UserEntity, "password">;

export interface UsersList {
  users: UserResponse[];
  total: number;
}

export class UpdateUser extends PartialType(CreateUserDto) {}
