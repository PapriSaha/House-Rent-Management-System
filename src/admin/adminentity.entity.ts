import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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



}
@Entity("customer")
   export class CustomerEntity{

  @PrimaryGeneratedColumn()
  custid: number;

  @Column()
  custname: string;

  @Column()
  email: string;

  @Column()
  address: string;

   }
   @Entity("employee")
   export class EmployeeEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address: string;

   }

   @Entity("houseInfo")
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
