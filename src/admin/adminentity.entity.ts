import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ManagerEntity } from 'src/manager/managerentity.entity';
import{OwnerEntity} from 'src/houseowner/ownerentity.entity';

@Entity("admin")
export class AdminEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uname: string;

  @Column()
  pass: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  dob:Date;

  @Column()
  filename:string;


  @OneToMany(() => ManagerEntity ,(manager) => manager.admin)
  managers: ManagerEntity[]
  


}


@Entity("tenant")
   export class TenantEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uname:string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  dob:Date;

  @Column()
  filename:string;

   }


   @Entity("houseinfo")
   export class HouseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  housename: string;

  @Column()
  HouseAdd: string;

  @Column()
  RentStatus: string;

  @Column()
  RentPrice: number;

   }

   @Entity("paymentinfo")
   export class PaymentEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refno:number;

  @Column()
  payid:number;


  @Column()
  amount:number;

  @Column()
  paydate:Date;

  @Column()
  paymonth:string;


   }

   