import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcript from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({email, name, password, role, wage, workload}: CreateUserDto) {
    const incryptedPassword = bcript.hashSync(
      password,
      await bcript.genSalt(),
    );

    return this.prisma.user.create({
      data: {
        email,
        name,
        role,
        wage, 
        workload,
        password: incryptedPassword,
      },
      select:{
        wage: true,
        email: true,
        id: true,
        name: true,
        role: true,
        workload: true,
        createdAt: true,
        password: false,
      }
    });
  }

  async findAll(role?: string) {    
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
      },where:{
        role: role || undefined
      }
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
      select:{
        wage: true,
        email: true,
        id: true,
        name: true,
        role: true,
        workload: true,
        createdAt: true,
        password: false,
      }
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
