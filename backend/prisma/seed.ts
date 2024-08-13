import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import { Role } from '../src/enums/role.enum';

const prisma = new PrismaClient()

async function main() {
    const newUser = await prisma.user.create({
        data:{
            email: "admin@admin.com",
            name: "admin", 
            role: Role.Admin,
            wage: 3000,
            workload: '10h',
            password: bcrypt.hashSync('123123123', await bcrypt.genSalt(10))
        }
    })

    console.log(newUser);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
