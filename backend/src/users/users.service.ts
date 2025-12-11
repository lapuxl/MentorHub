import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserResponse, UsersList } from "./entities/user.entity";
import { skip } from "node:test";

@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
    ) {}

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
}