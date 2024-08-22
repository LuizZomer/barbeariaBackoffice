import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service';
import { messageGenerator } from 'src/utils/functions';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService){}

    async create({email, name, password}: CreateCustomerDTO){

        const encryptedPassword = bcrypt.hashSync(password, await bcrypt.genSalt())

        await this.prisma.customer.create({
            data: {
                email,
                name,
                password: encryptedPassword
            }
        }) 

        return messageGenerator('create')
    }

    async findMany(take: number, page: number){

        const customerTableCount = await this.prisma.customer.count()

        const customers = this.prisma.customer.findMany({
            select:{
                customerId: true,
                email: true,
                loyaltyPoints: true,
                name: true,
                password: false,
                createdAt: true,
            },
            skip: page * take,
            take
        })

        return {customers, customerCount: Math.ceil(customerTableCount / take)}
    }

    async findOne(id: string){
        await this.exist(id)

        return this.prisma.customer.findFirst({
            select:{
                customerId: true,
                email: true,
                loyaltyPoints: true,
                name: true,
                password: false
            },
            where:{
                customerId: id
            }
        })
    }

    async update(id: string, customer: UpdateCustomerDTO){
        await this.exist(id)

        if(customer.password) {
            customer.password = bcrypt.hashSync(customer.password, await bcrypt.genSalt())
        }

        await this.prisma.customer.update({
            data: customer,
            where: {
                customerId: id
            }
        })

        return messageGenerator('update')
    }

    async delete(id: string){
        await this.exist(id)
        
        await this.prisma.customer.delete({
            where: {
                customerId: id
            }
        })

        return messageGenerator('delete')
    }

    async exist(id: string){
        const count = await this.prisma.customer.count({
            where: {
                customerId: id
            }
        })

        if(count) {            
            return true
        }

        throw new NotFoundException("Cliente não encontrado!")
    }
}
