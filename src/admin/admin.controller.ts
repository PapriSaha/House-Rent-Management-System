import { Body, Controller, Delete, Get, Param, Post, Put,Patch, Query,ParseIntPipe,ParseFloatPipe,UsePipes,ValidationPipe} from "@nestjs/common";
import { AdminForm } from "./adminformemployee.dto";
import { AdminCustomer } from "./adminformcustomer.dto";
import { AdminProfile} from "./adminformprofile.dto";
import { CarInfo} from "./admincarinfo.dto";
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
    loginName(@Query() qry:any): any {
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
      @Body("name") name:string, 
      @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.updateEmployeebyid(name,id);
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
      @Body("custname") custname:string, 
      @Param("custid",ParseIntPipe) custid:number
      ): any {
    return this.adminService.updateCustomerbyid(custname,custid);
    }

  @Get("/Profile")
    getAdmin(): any { 
        return this.adminService.getProfile();
    }
  


  @Post("/insertcar")
  @UsePipes(new ValidationPipe())
    insertCar(@Body() mydto:CarInfo): any {
      return this.adminService.insertCar(mydto);
    }


@Put("/updatecar/")
@UsePipes(new ValidationPipe())
    updateCar( 
      @Body("carname") carname:string,
      @Body("carid") carid:number
      ): any {
    return this.adminService.updateCar(carname,carid);
    }
  @Put("/updatecar/:carid")
    updateCarByID( 
        @Body("carname") carname:string,
        @Param("carid",ParseIntPipe) carid:number
        ): any {
      return this.adminService.updateCarByID(carname,carid);
      }


  @Get("/findcar/:carid")
      getCarByID(@Param("carid",ParseIntPipe) carid:number): any{
        return this.adminService.getCarByID(carid);
      }

    @Get("/findcar")
    getCarByIDName(@Query() qry:any): any {
      return this.adminService.getCarByIDName(qry);
    }  

}