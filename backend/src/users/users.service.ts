import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UsersList } from "./entities/user.entity";
import { Role } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(offset?: number, take?: number): Promise<UsersList> {
    const users = await this.prismaService.user.findMany({
      skip: offset,
      take,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const total = await this.prismaService.user.count();

    return {
      users,
      total,
    };
  }

  async getUserById(id: string) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async createUser(email: string, password: string, role: Role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  async updateUser(id: string, data: Partial<CreateUserDto>) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  async removeUser(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
