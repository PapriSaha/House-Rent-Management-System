import{ IsInt, IsNotEmpty, Length } from "class-validator";

export class AdminForm {   
    @IsNotEmpty({message:"Enter your id:"})
    @IsInt({message:"ID must be a number"})
    id: number;


    @IsNotEmpty()
    @Length(3,20,{message: "name must be the size of between 3 and 20",})
    name: string;
}
    

  