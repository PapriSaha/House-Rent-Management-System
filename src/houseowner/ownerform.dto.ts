import{ IsInt, IsNotEmpty, Length,Matches,IsEmail,IsDate} from "class-validator";
import { Type } from 'class-transformer';

export class OwnerForm{

    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    ownname:string;
    
    @IsEmail()
    ownemail:string;

    @IsDate()
    @Type(() => Date)
    dob:Date;
  
    @IsNotEmpty()
    ownaddress:string;
  
  }