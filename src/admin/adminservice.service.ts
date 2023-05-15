import { HttpException, HttpStatus, Injectable ,NotFoundException} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerEntity } from "src/manager/managerentity.entity";
import { AdminEntity } from "./adminentity.entity";
import { PaymentEntity } from "./adminentity.entity";
import { OwnerEntity } from "src/houseowner/ownerentity.entity";
import { TenantEntity } from "./adminentity.entity";
import { HouseEntity } from "./adminentity.entity";
import { OwnerForm } from "src/houseowner/ownerform.dto";
import { AdminProfile} from "./adminform.dto";
import { AdminTenant} from "./adminform.dto";
import { HouseInfo} from "./adminform.dto";
import { PaymentInfo} from "./adminform.dto";
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
        private managerRepo: Repository<ManagerEntity>,
        @InjectRepository(PaymentEntity)
        private paymentRepo: Repository<PaymentEntity>
      ) 
      {}

//Tenant Index
      getIndex():any { 
        return this.tenantRepo.find();
    
    }

//Admin Index
getAdminIndex():any { 
    return this.adminRepo.find();

}



//Search Admin by ID

getAdminByID(id):any {
    
    return this.adminRepo.findOneBy({id});
}

getAdminByIDName(qry):any {

    return this.adminRepo.findOneBy({ id:qry.id,uname:qry.uname });
    
}
//Search Tenant by ID

getTenantByID(id):any {
    
    return this.tenantRepo.findOneBy({id});
}

getTenantByIDName(qry):any {

    return this.tenantRepo.findOneBy({ id:qry.id,name:qry.name });
    
}

//Search Payment by Reference NO

getPaymentByref(refno):any {
    
    return this.paymentRepo.findOneBy({refno});
}

getPaymentByrefno(qry):any {

    return this.paymentRepo.findOneBy({ refno:qry.refno,id:qry.id});
    
}

//Search Tenant by Name
getTenantByName(uname):any {
    
    return this.tenantRepo.findOneBy({uname});
}
getTenantByUnameName(qry):any {

    return this.tenantRepo.findOneBy({ uname:qry.uname,name:qry.name });
    
}

//Insert Payment
insertPayment(mydto:PaymentInfo):any {
    
    return this.paymentRepo.save(mydto);
 
       }

//Insert Admin

async insertAdmin(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.pass, salt);
    mydto.pass= hassedpassed;
     return this.adminRepo.save(mydto);
    }

//Insert Tenant

async insertTenant(mydto:AdminTenant){
    
    return this.tenantRepo.save(mydto);
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


  async signin(mydto: AdminProfile): Promise<number> {
    console.log(mydto.pass);
    const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
    if (!mydata) {
      // Handle the case when user data is not found
      return 0;
    }
  
    if (!mydto.pass || !mydata.pass) {
      // Handle the case when password data is missing
      return 0;
    }
  
    const isMatch = await bcrypt.compare(mydto.pass, mydata.pass);
  
    if (isMatch) {
      return 1;
    } else {
      return 0;
    }
  }
  
 /*
  async signin(mydto) {
     const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
     if (!mydata) {
       return 0;
     }
     if(mydto.pass== mydata.pass) 
     {
       return true;
     }
     return false;
   }
*/

//Update Admin
/*
async updateAdmin(mydto: AdminProfile, email: string): Promise<string> {
    console.log(mydto.email);
    try {
      const result = await this.adminRepo.update({ email: email }, mydto);
      if (result.affected === 0) {
        // No rows were affected by the update
        return 'Admin not found';
      } else {
        // Update was successful
        return 'Admin updated';
      }
    } catch (err) {
      // An error occurred during the update operation
      console.error(err);
      return 'Update failed';
    }
  }
  

*/

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

//Delete Tenant

deleteTenantbyid(id):any {
    
    return this.tenantRepo.delete(id);
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
        //houseaccount.housename = mydto.housename;
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

//Search house by area
    getHouseByArea(housename):any {
    
        return this.houseRepo.findOneBy({housename});
    }
    getHouseByAreaName(qry):any {
    
        return this.houseRepo.findOneBy({ housename:qry.housename,id:qry.id});
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
