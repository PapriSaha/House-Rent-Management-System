import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OwnerEntity } from "./ownerentity.entity";



@Module({
imports: [TypeOrmModule.forFeature([OwnerEntity])],
controllers: [],
providers: [],

})

export class OwnerModule {}