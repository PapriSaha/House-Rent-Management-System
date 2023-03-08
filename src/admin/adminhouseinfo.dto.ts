import{ IsInt, IsNotEmpty, Length} from "class-validator";

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