import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { CustomerEntity } from "./adminentity.entity"
import { EmployeeEntity } from "./adminentity.entity"
import { HouseEntity } from "./adminentity.entity"


@Module({

imports: [TypeOrmModule.forFeature([AdminEntity,CustomerEntity,EmployeeEntity,HouseEntity])],
controllers: [AdminController],
providers: [AdminService],

})

export class AdminModule {}