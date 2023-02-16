import{ IsInt, IsNotEmpty, Length,Matches,IsNumber } from "class-validator";

export class AdminCustomer{

    @IsNotEmpty({message: "Enter your id number:"})
    @IsInt({message:"ID must be a number"})
    custid:number;

    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    custname:string;

}