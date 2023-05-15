import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerForm } from "./managerform.dto";
import { ManagerEntity } from "./managerentity.entity";


@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(ManagerEntity)
        private managerRepo:Repository<ManagerEntity>,
      ) {}


insertManager(mydto:ManagerForm):any {
    
   return this.managerRepo.save(mydto);

      }

      //Manager Index
getManagerIndex():any { 
    return this.managerRepo.find();

}

getAdminByManagerID(id):any {
        return this.managerRepo.find({ 
                where: {id:id},
            relations: {
                admin: true,
            },
        });
    }


}