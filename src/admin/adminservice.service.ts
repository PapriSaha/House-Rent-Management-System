import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./adminentity.entity";
import { CustomerEntity } from "./adminentity.entity";
import { EmployeeEntity } from "./adminentity.entity";
import { HouseEntity } from "./adminentity.entity";
import { AdminForm } from "./adminformemployee.dto";
import { AdminCustomer } from "./adminformcustomer.dto";
import { AdminProfile} from "./adminformprofile.dto";
import { HouseInfo} from "./adminhouseinfo.dto";



@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(CustomerEntity)
        private customerRepo: Repository<CustomerEntity>,
        @InjectRepository(EmployeeEntity)
        private empRepo: Repository<EmployeeEntity>,
        @InjectRepository(HouseEntity)
        private houseRepo: Repository<HouseEntity>
      ) 
      {}

login(uname):any {
    
    return this.adminRepo.findOneBy({uname});
}
    
loginName(qry):any {
        
    return this.adminRepo.findOneBy({ uname:qry.uname,pass:qry.pass });
}
getCustomerByID(custid):any {
    
    return this.customerRepo.findOneBy({custid});
}

getCustomerByIDName(qry):any {

    return this.customerRepo.findOneBy({ custid:qry.custid,custname:qry.custname });
    
}

getEmployeeByID(id):any {
    
    return this.empRepo.findOneBy({id});
}




getEmployeeByIDName(qry):any {
    
    return this.empRepo.findOneBy({ id:qry.id,name:qry.name });
}


insertEmployee(mydto:AdminForm):any{

    const empaccount = new EmployeeEntity()
    empaccount.name = mydto.name;
    empaccount.email = mydto.email; 
    empaccount.address = mydto.address;
   return this.empRepo.save(empaccount);
}



insertCustomer(mydto:AdminCustomer):any{

    const cusaccount = new CustomerEntity()
    cusaccount.custname = mydto.custname;
    cusaccount.email = mydto.email;
    cusaccount.address = mydto.address;
   return this.customerRepo.save(cusaccount);
    }


signup(mydto:AdminProfile):any{

    const adminaccount = new AdminEntity()
    adminaccount.uname = mydto.uname;
    adminaccount.pass = mydto.pass;
    adminaccount.email = mydto.email;
    adminaccount.address = mydto.address;
   return this.adminRepo.save(adminaccount);
        
}




updateEmployee(name,id):any {
    console.log(name+id);
    return this.empRepo.update(id,{name:name});
    }



updateEmployeebyid(mydto:AdminForm,id):any {
    return this.empRepo.update(id,mydto);
    }
    

updateCustomer(custname,custid):any {
    console.log(custname+custid);
    return this.customerRepo.update(custid,{custname:custname});
    }



updateCustomerbyid(mydto:AdminCustomer,custid):any {
    return this.customerRepo.update(custid,mydto);
    }




    deleteEmployeebyid(id):any {
    
        return this.empRepo.delete(id);
    }



    deleteCustomerbyid(custid):any {
    
        return this.customerRepo.delete(custid);
    }

    updatePassword(pass,id):any {
        console.log(pass+id);
        return this.adminRepo.update(id,{pass:pass});
    }

    updatePasswordByID(mydto:AdminProfile,id):any {
        return this.adminRepo.update(id,mydto);
    }
    
    insertHouse(mydto:HouseInfo):any{

        const houseaccount = new HouseEntity()
        houseaccount.housename = mydto.housename;
        houseaccount.HouseAdd = mydto.HouseAdd;
        houseaccount.RentStatus = mydto.RentStatus;
        houseaccount.RentPrice= mydto.RentPrice;
       return this.houseRepo.save(houseaccount);
    }

    updateHouse(housename,id):any {
        console.log(housename+id);
        return this.houseRepo.update(id,{housename:housename});
    }

    updateHouseByID(mydto:HouseInfo,id):any {
        return this.houseRepo.update(id,mydto);
    }
    getCarByID(id):any {
    
        return this.houseRepo.findOneBy({id});
    }
    getProfile():string { 
        return "This is Admin Profile";
    
    }

    getHouseByIDName(qry):any {
    
        return this.houseRepo.findOneBy({ id:qry.id,housename:qry.housename });
    }
}