import{ IsInt, IsNotEmpty, Length,Matches,IsEmail,IsDate} from "class-validator";
import { Type } from 'class-transformer';

export class AdminProfile{

  @IsNotEmpty()
    uname:string;

    @IsNotEmpty()
    pass:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    address:string;

    @IsDate()
    @Type(() => Date)
    dob:Date;

    filename:string;
    
}

export class AdminTenant{

  @IsNotEmpty()
  uname:string;

  @IsNotEmpty()
  @Length(3,20,{message: "name must be the size of between 3 and 20",})
  name:string;
  
  @IsEmail()
  email:string;

  @IsNotEmpty()
  address:string;

  @IsDate()
    @Type(() => Date)
    dob:Date;

    filename:string;


}

export class HouseInfo{

    
  @IsNotEmpty()
  @Length(5,10,{message: "name must be the size of between 5 and 40",})
  housename:string;

  @IsNotEmpty({message: "Enter house address:"})
  HouseAdd:string;

  @IsNotEmpty({message:"Enter rent status"})
  RentStatus: string;

  @IsNotEmpty({message:"Enter rent price: "})
  RentPrice: number;

}

export class PaymentInfo{

    
  @IsNotEmpty()
  refno:number;

  @IsNotEmpty()
  payid:number;


  @IsNotEmpty()
  amount:number;

  @IsDate()
  @Type(() => Date)
  paydate:Date;

  @IsNotEmpty()
  paymonth:string;


}