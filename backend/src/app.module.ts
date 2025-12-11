// src/app.module.ts
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from "./users/users.module";
import { StudentsModule } from "./students/students.module";
import { TeachersModule } from "./teachers/teachers.module";
import { ApplicationsModule } from "./applications/applications.module";

@Module({
  imports: [UsersModule, StudentsModule, TeachersModule, ApplicationsModule],
  providers: [PrismaService],
})
export class AppModule {}
