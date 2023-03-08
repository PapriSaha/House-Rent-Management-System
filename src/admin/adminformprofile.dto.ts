import{ IsInt, IsNotEmpty, Length,Matches,IsEmail} from "class-validator";

export class AdminProfile{

    
    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    uname:string;

    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,}$/, {
        message:'Password must be equal or more than 6 characters long with at least 1 special character, 1 capital letter, 1 small and 1 digit',
      })
    pass:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    address:string;

    
}