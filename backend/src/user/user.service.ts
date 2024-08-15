import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const incryptedPassword = bcript.hashSync(
      user.password,
      await bcript.genSalt(),
    );

    return this.prisma.user.create({
      data: {
        ...user,
        password: incryptedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        wage: true,
        email: true,
        id: true,
        name: true,
        role: true,
        workload: true,
        createdAt: true,
        password: false,
      },
    });
  }

  async findOne(id: string) {
    await this.exist(id);

    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    { email, name, role, wage, workload }: UpdateUserDto,
  ) {
    await this.exist(id);

    return this.prisma.user.update({
      data: {
        email,
        name,
        role,
        wage,
        workload,
      },
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    await this.exist(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exist(id: string) {
    const user = await this.prisma.user.count({
      where: {
        id,
      },
    });

    if (user) {
      return true;
    }

    throw new NotFoundException('Id não existente');
  }
}
