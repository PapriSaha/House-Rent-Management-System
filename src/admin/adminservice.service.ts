import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from "src/manager/managerentity.entity";
import { AdminEntity } from "./adminentity.entity";
import { OwnerEntity } from "src/houseowner/ownerentity.entity";
import { TenantEntity } from "./adminentity.entity";
import { HouseEntity } from "./adminentity.entity";
import { OwnerForm } from "src/houseowner/ownerform.dto";
import { AdminProfile} from "./adminform.dto";
import { HouseInfo} from "./adminform.dto";
import { ManagerForm} from "src/manager/managerform.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";



@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        private mailerService: MailerService,
        @InjectRepository(OwnerEntity)
        private ownRepo: Repository<OwnerEntity>,
        @InjectRepository(TenantEntity)
        private tenantRepo: Repository<TenantEntity>,
        @InjectRepository(HouseEntity)
        private houseRepo: Repository<HouseEntity>,
        @InjectRepository(ManagerEntity)
        private managerRepo: Repository<ManagerEntity>
      ) 
      {}

//Search Tenant

getTenantByID(id):any {
    
    return this.tenantRepo.findOneBy({id});
}

getTenantByIDName(qry):any {

    return this.tenantRepo.findOneBy({ id:qry.id,name:qry.name });
    
}

//Search House Owner

getHouseOwnerByID(ownid):any {
    
    return this.ownRepo.findOneBy({ownid});
}

getHouseOwnerByIDName(qry):any {

    return this.ownRepo.findOneBy({ ownid:qry.ownid,ownname:qry.ownname });
    
}

//Search Manager

getManagerByID(id):any {
    
    return this.managerRepo.findOneBy({id});
}

getManagerByIDName(qry):any {
    
    return this.managerRepo.findOneBy({ id:qry.id,name:qry.name });
}


// Signup

async signup(mydto){
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.pass, salt);
    mydto.pass= hassedpassed;
    return this.adminRepo.save(mydto);
    }
//Signin

async signin(mydto){
    console.log(mydto.pass);
const mydata= await this.adminRepo.findOneBy({email: mydto.email});
const isMatch= await bcrypt.compare(mydto.pass, mydata.pass);
if(isMatch) {
return 1;
}
else {
    return 0;
}

}
//Update Admin

updateAdmin(uname,id):any {
    console.log(uname+id);
    return this.adminRepo.update(id,{uname:uname});
    }

updateAdminbyid(mydto:AdminProfile,id):any {
    return this.adminRepo.update(id,mydto);
    }

// Update Manager

updateManager(name,id):any {
    console.log(name+id);
    return this.managerRepo.update(id,{name:name});
    }

updateManagerbyid(mydto:ManagerForm,id):any {
    return this.managerRepo.update(id,mydto);
    }
    
// Update House Owner

updateHouseOwner(ownname,ownid):any {
    console.log(ownname+ownid);
    return this.ownRepo.update(ownid,{ownname:ownname});
    }

updateHouseOwnerbyid(mydto:OwnerForm,ownid):any {
    return this.ownRepo.update(ownid,mydto);
    }

//Delete Manager

    deleteManagerbyid(id):any {
    
        return this.managerRepo.delete(id);
    }

//Delete House Owner

    deleteHouseOwnerbyid(ownid):any {
    
        return this.ownRepo.delete(ownid);
    }
//Delete Admin

  deleteAdminbyid(id):any {
    
    return this.adminRepo.delete(id);
}
//Forget password
    updatePassword(pass,id):any {
        console.log(pass+id);
        return this.adminRepo.update(id,{pass:pass});
    }

    async updatePasswordByID(mydto:AdminProfile,id){
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(mydto.pass, salt);
         mydto.pass= hassedpassed;
        return this.adminRepo.update(id,mydto);
    }

//Insert house
    insertHouse(mydto:HouseInfo):any{

        const houseaccount = new HouseEntity()
        houseaccount.housename = mydto.housename;
        houseaccount.HouseAdd = mydto.HouseAdd;
        houseaccount.RentStatus = mydto.RentStatus;
        houseaccount.RentPrice= mydto.RentPrice;
       return this.houseRepo.save(houseaccount);
    }
  
//Update House
    updateHouse(housename,id):any {
        console.log(housename+id);
        return this.houseRepo.update(id,{housename:housename});
    }

    updateHouseByID(mydto:HouseInfo,id):any {
        return this.houseRepo.update(id,mydto);
    }

//View Profile
    getProfile():string { 
        return "This is Admin Profile";
    
    }

//Search house
    getHouseByID(id):any {
    
        return this.houseRepo.findOneBy({id});
    }
    getHouseByIDName(qry):any {
    
        return this.houseRepo.findOneBy({ id:qry.id,housename:qry.housename });
    }

//View All managers
    getManagersByAdminID(id):any {
        return this.adminRepo.find({ 
                where: {id:id},
            relations: {
                managers: true,
            },
         });
    }

//Send Email
    async sendEmail(mydata){
        return   await this.mailerService.sendMail({
               to: mydata.email,
               subject: mydata.subject,
               text: mydata.text, 
             });
       
       }
       
}