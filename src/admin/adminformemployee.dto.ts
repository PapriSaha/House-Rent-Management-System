import{ IsInt, IsNotEmpty, Length,Matches,IsEmail } from "class-validator";

export class AdminForm {   


    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    name: string;

    @IsEmail()
    email:string;
    @IsNotEmpty()
    address:string;
}
    

  