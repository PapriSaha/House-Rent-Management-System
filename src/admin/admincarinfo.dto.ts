import{ IsInt, IsNotEmpty, Length} from "class-validator";

export class CarInfo{

    
    @IsNotEmpty()
    @Length(5,10,{message: "name must be the size of between 5 and 10",})
    carname:string;

    @IsNotEmpty({message: "Enter car id number:"})
    @IsInt({message:"ID must be a number"})
    carid:number;

    @IsNotEmpty({message: "Enter car licence number:"})
    @IsInt({message:"ID must be a number"})
    carLicenceNo:number;
}