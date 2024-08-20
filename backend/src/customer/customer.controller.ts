import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Post()
    async create(@Body() customer: CreateCustomerDTO){
        return this.customerService.create(customer)
    }

    @Get()
    async findMany(){
        return this.customerService.findMany()
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.customerService.findOne(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() customer: UpdateCustomerDTO){
        return this.customerService.update(id, customer)
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return this.customerService.delete(id)
    }
}
