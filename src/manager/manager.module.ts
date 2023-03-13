import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerEntity } from "./managerentity.entity";



@Module({
imports: [TypeOrmModule.forFeature([ManagerEntity])],
controllers: [],
providers: [],

})

export class ManagerModule {}