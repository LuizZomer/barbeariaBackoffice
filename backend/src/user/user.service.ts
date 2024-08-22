import { BadRequestException, Injectable, NotFoundException, UnauthorizedException, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcript from 'bcrypt';
import { Role } from 'src/enums/role.enum';
import { messageGenerator } from 'src/utils/functions';

interface IListAllParam {
  page: number;
  take: number;
  role?: string
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({email, name, password, role, wage, workload}: CreateUserDto) {
    const incryptedPassword = bcript.hashSync(
      password,
      await bcript.genSalt(),
    );

    await this.prisma.user.create({
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

    return messageGenerator('create')
  }

  async findAll({page, take, role}:IListAllParam) {    
    const userTableCount = await this.prisma.user.count()

    const users = await this.prisma.user.findMany({
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
      skip: page * take,
      take: take,
      where:{
        role: role || undefined
      }
    });    

    return {users, userCount: Math.ceil(userTableCount / take)}
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

    await this.prisma.user.update({
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

    return messageGenerator('update')

  }

  async remove(id: string) {

    const countUser = await this.prisma.user.count()    

    if(countUser === 1) throw new BadRequestException("Você não pode deixar o sistema sem usuários")

    await this.exist(id);

    const user = await this.prisma.user.findUnique({
      where:{
        id
      }
    })

    if(user.role === Role.Admin) throw new UnauthorizedException("Você não pode apagar uma conta admin")

    await this.prisma.user.delete({
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

    return messageGenerator('delete')
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
