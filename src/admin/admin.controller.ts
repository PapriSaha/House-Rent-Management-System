import { Body, Controller, Delete, Get, Param, Post,Put,Patch, Query,ParseIntPipe,ParseFloatPipe,UsePipes,ValidationPipe} from "@nestjs/common";
import { AdminForm } from "./adminformemployee.dto";
import { AdminCustomer } from "./adminformcustomer.dto";
import { AdminProfile} from "./adminformprofile.dto";
import { HouseInfo} from "./adminhouseinfo.dto";
import { AdminService } from "./adminservice.service";



@Controller("/admin")

export class AdminController
{ 
  constructor(private adminService: AdminService){}

  @Get("/login/:uname/:pass")
    login(@Param("uname") uname:string): any{
      return this.adminService.login(uname);
    }
    @Get("/login")
    loginName(@Query() qry:any ): any {
      return this.adminService.loginName(qry);
    }  

  @Get("/findcustomer/:custid")
    getCustomerByID(@Param("custid",ParseFloatPipe) custid:number): any{
      return this.adminService.getCustomerByID(custid);
    }
    @Get("/findcustomer")
    getCustomerByIDName(@Query() qry:any): any {
      return this.adminService.getCustomerByIDName(qry);
    }  



  @Get("/findemployee/:id")
    getEmployeeByID(@Param("id",ParseIntPipe) id:number): any{
      return this.adminService.getEmployeeByID(id);
    }
    @Get("/findemployee")
    getEmployeeByIDName(@Query() qry:any): any {
      return this.adminService.getEmployeeByIDName(qry);
    }  

  @Post("/insertemployee")
  @UsePipes(new ValidationPipe())
    insertEmployee(@Body() mydto:AdminForm): any {
      return this.adminService.insertEmployee(mydto);
    }

  @Post("/insertcustomer")
  @UsePipes(new ValidationPipe())
    insertCustomer(@Body() mydto:AdminCustomer): any {
      return this.adminService.insertCustomer(mydto);
    }
  @Post("/signup")
  @UsePipes(new ValidationPipe())
    signup(@Body() mydto:AdminProfile): any {
      return this.adminService.signup(mydto);
    }
    
    @Patch("/forgetpassword/")
    @UsePipes(new ValidationPipe())
      updatePassword( 
        @Body("pass") pass:string, 
        @Body("id") id:number
        ): any {
      return this.adminService.updatePassword(pass, id);
      } 
      @Patch("/forgetpassword/:id")
    updatePasswordByID( 
        @Body() mydto:AdminProfile,
        @Param("id",ParseIntPipe) id:number
        ): any {
      return this.adminService.updatePasswordByID(mydto,id);
      }

  @Put("/updateemployee/")
  @UsePipes(new ValidationPipe())
    updateEmployee( 
      @Body("name") name:string, 
      @Body("id") id:number
      ): any {
    return this.adminService.updateEmployee(name, id);
    } 
    @Put("/updateemployee/:id")
  updateEmployeebyid( 
      @Body() mydto:AdminForm,
      @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.updateEmployeebyid(mydto,id);
    }

  @Delete("/deleteEmp/:id")
  deleteEmployeebyid( 
     @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.deleteEmployeebyid(id);
    }

  @Delete("/deletecustomer/:custid")
  deleteCustomerbyid( 
     @Param("custid",ParseIntPipe) custid:number
      ): any {
    return this.adminService.deleteCustomerbyid(custid);
    }

  @Put("/updatecustomer/")
  @UsePipes(new ValidationPipe())
    updateCustomer( 
      @Body("custname") custname:string, 
      @Body("custid") custid:number
      ): any {
    return this.adminService.updateCustomer(custname, custid);
    }
    
    @Put("/updatecustomer/:custid")
  updateCustomerbyid( 
      @Body() mydto:AdminCustomer, 
      @Param("custid",ParseIntPipe) custid:number
      ): any {
    return this.adminService.updateCustomerbyid(mydto,custid);
    }

  @Get("/Profile")
    getAdmin(): any { 
        return this.adminService.getProfile();
    }
  


  @Post("/inserthouse")
  @UsePipes(new ValidationPipe())
    insertCar(@Body() mydto:HouseInfo): any {
      return this.adminService.insertHouse(mydto);
    }


@Put("/updatehouse/")
@UsePipes(new ValidationPipe())
    updateCar( 
      @Body("housename") housename:string,
      @Body("id") id:number
      ): any {
    return this.adminService.updateHouse(housename,id);
    }
  @Put("/updatehouse/:id")
    updateCarByID( 
        @Body() mydto:HouseInfo,
        @Param("id",ParseIntPipe) id:number
        ): any {
      return this.adminService.updateHouseByID(mydto,id);
      }


  @Get("/findhouse/:id")
      getCarByID(@Param("id",ParseIntPipe) id:number): any{
        return this.adminService.getCarByID(id);
      }

    @Get("/findhouse")
    getHouseByIDName(@Query() qry:any): any {
      return this.adminService.getHouseByIDName(qry);
    }  

}