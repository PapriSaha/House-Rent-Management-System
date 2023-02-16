import { Injectable } from "@nestjs/common";
import { AdminForm } from "./adminformemployee.dto";
import { AdminCustomer } from "./adminformcustomer.dto";
import { AdminProfile} from "./adminformprofile.dto";
import { CarInfo} from "./admincarinfo.dto";



@Injectable()
export class AdminService {



login(uname):any {
    
    return "Login Successful and the User Name of this Account is "+ uname;
}
    
loginName(qry):any {
        
    return "the attempted password is correct and this is "+qry.pass +" and the user name is "+qry.uname;
}
getCustomerByID(custid):any {
    
    return "This Customer id is found and the id is "+ custid;
}

getCustomerByIDName(qry):any {
    
    return "the Customer id is found which is "+qry.custid +" and name is "+qry.custname;
}

getEmployeeByID(id):any {
    
    return "This Employee id is found and the id is "+ id ;
}




getEmployeeByIDName(qry):any {
    
    return "the Employee id is found which is "+qry.id +" and name is "+qry.name;
}


insertEmployee(mydto:AdminForm):any{

    return "Inserted Employee User name: " + mydto.name+" and id is " + mydto.id;
}



insertCustomer(mydto:AdminCustomer):any{

        return "Inserted Customer User name: " + mydto.custname+" and id is " + mydto.custid;
    }


signup(mydto:AdminProfile):any{

        return "Admin User name: " + mydto.uname+" and password is " + mydto.pass;
}




updateEmployee(name,id):any {
        return "Updated Employee name: " +name+" and id is " +id;
    }



updateEmployeebyid(name,id):any {
        return "Update Employee id is " +id+" and the name is " + name;
    }
    

updateCustomer(custname,custid):any {
        return "Updated Employee name: " +custname+" and id is " +custid;
    }



updateCustomerbyid(custname,custid):any {
        return "Update Employee id is " +custid;
    }




    deleteEmployeebyid(id):any {
    
        return  id + "This Employee is deleted";
    }



    deleteCustomerbyid(custid):any {
    
        return  custid + "this Customer is deleted";
    }
    
    insertCar(mydto:CarInfo):any{

        return "Inserted Car name: " + mydto.carname +" , id is " + mydto.carid +" and the license number is " + mydto.carLicenceNo;
    }

    updateCar(carname,carid):any {
        return "Updated Car name: " +carname +" and id is "+ carid;
    }

    updateCarByID(carname,carid):any {
        return "Updated Car id is " +carid;
    }
    getCarByID(carid):any {
    
        return "This Car id is found and the id is "+ carid;
    }
    getProfile():string { 
        return "This is Admin Profile";
    
    }

    getCarByIDName(qry):any {
    
        return "the Car id is found which is "+qry.carid+" and name is "+qry.carname;
    }
}