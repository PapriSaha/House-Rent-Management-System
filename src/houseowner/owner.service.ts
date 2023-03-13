import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerForm } from "./ownerform.dto";
import { OwnerEntity } from "./ownerentity.entity";


@Injectable()
export class OwnerService {
    constructor(
        @InjectRepository(OwnerEntity)
        private ownRepo:Repository<OwnerEntity>,
      ) {}


insertOwner(mydto:OwnerForm):any {
    
   return this.ownRepo.save(mydto);

      }



}