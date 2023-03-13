import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller"
import { AdminService } from "./adminservice.service"
import { AdminEntity } from "./adminentity.entity"
import { OwnerEntity } from "src/houseowner/ownerentity.entity"
import { OwnerService } from "src/houseowner/owner.service";
import { TenantEntity } from "./adminentity.entity"
import { HouseEntity } from "./adminentity.entity"
import { ManagerService } from "src/manager/manager.service";
import { ManagerEntity } from "src/manager/managerentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({

imports: [
    MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'paprisaha986@gmail.com',
                   pass: 'tnpdurggdvgqopoj'
               },
              }
  }),
    TypeOrmModule.forFeature([AdminEntity,OwnerEntity,TenantEntity,ManagerEntity,HouseEntity])],
controllers: [AdminController],
providers: [AdminService,ManagerService,OwnerService],

})

export class AdminModule {}