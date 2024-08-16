import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class PermissionService {
    async select(){
        // after add role in bd
        return  [
            {name: 'Admin', role: Role.Admin},
            {name: 'Funcionário', role: Role.Employee},
            {name: 'Financeiro', role: Role.Financial},
        ]
    }
}
