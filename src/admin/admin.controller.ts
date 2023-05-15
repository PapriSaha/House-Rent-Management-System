import { Body, Controller, Delete, Get, Param, Post,Put,Patch,Res,Query,Session,UseGuards,ParseFilePipe,ParseIntPipe,ParseFloatPipe,UsePipes,ValidationPipe,UseInterceptors,UploadedFile,MaxFileSizeValidator,FileTypeValidator} from "@nestjs/common";
import { ManagerForm } from 'src/manager/managerform.dto';
import { ManagerService } from 'src/manager/manager.service';
import { OwnerForm } from "src/houseowner/ownerform.dto";
import{OwnerService}from "src/houseowner/owner.service";
import { AdminProfile} from "./adminform.dto";
import { PaymentInfo} from "./adminform.dto";
import { AdminTenant} from "./adminform.dto";
import { HouseInfo} from "./adminform.dto";
import { AdminService } from "./adminservice.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { SessionGuard } from './session.guard';
import { AdminEntity } from "./adminentity.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Controller("/admin")

export class AdminController
{ 
  constructor(private adminService: AdminService,
    private managerService: ManagerService,
    private ownerService:OwnerService
    ){}  

//Tenant Index
    @Get('/tenantindex')
    getTenant(): any {
      return this.adminService.getIndex();
    }
    //Manager Index
    @Get('/tenantindex')
    getManager(): any {
      return this.managerService.getManagerIndex();
    }
//Admin Index
@Get('/adminindex')
getAllAdmin(): any {
  return this.adminService.getAdminIndex();
}
 
//Search Admins by ID
@Get("/findadmin/:id")
getAdminByID(@Param("id",ParseFloatPipe) id:number): any{
  return this.adminService.getAdminByID(id);
}

@Get("/findadmin")
getAdminByIDName(@Query() qry:any): any {
  return this.adminService.getAdminByIDName(qry);
}
//Search Tenants by ID
  @Get("/findtenant/:id")
    getTenantByID(@Param("id",ParseFloatPipe) id:number): any{
      return this.adminService.getTenantByID(id);
    }
  
    @Get("/findtenant")
    getTenantByIDName(@Query() qry:any): any {
      return this.adminService.getTenantByIDName(qry);
    }
    
// Search Tenants by User Name
  @Get("/findtenantbyuname/:uname")
  getTenantByName(@Param("uname") uname:string): any{
    return this.adminService.getTenantByName(uname);
  }
  @Get("/findtenantbyuname")
    getTenantByUnameName(@Query() qry:any): any {
      return this.adminService.getTenantByUnameName(qry);
    }
  
//Search House Owner
    @Get("/findowner/:ownid")
    getHouseOwnerByID(@Param("custid",ParseFloatPipe) ownid:number): any{
      return this.adminService.getHouseOwnerByID(ownid);
    }
    @Get("/findowner")
    getHouseOwnerByIDName(@Query() qry:any): any {
      return this.adminService.getHouseOwnerByIDName(qry);
    }  
//Search Manager by id

@Get("/findmanager/:id")
    getManagerByID(@Param("id",ParseFloatPipe) id:number): any{
      return this.adminService.getManagerByID(id);
    }
    @Get("/findmanager")
    getManagerByIDName(@Query() qry:any): any {
      return this.adminService.getManagerByIDName(qry);
    } 

  //Search Payment by reference no

@Get("/findpayment/:refno")
getPaymentByref(@Param("refno",ParseIntPipe) refno:number): any{
  return this.adminService.getPaymentByref(refno);
}
@Get("/findpayment")
getPaymentByrefno(@Query() qry:any): any {
  return this.adminService.getPaymentByrefno(qry);
} 
// View All managers


    @Get('/findmanagersbyadmin/:id')
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getManagersByAdminID(id);
    }

    @Get('/findadminbymanager/:id')
    getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
      return this.managerService.getAdminByManagerID(id);
    }
 
// Insert Tenant
@Post("/inserttenant")
//@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('filename',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req,file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})
}))
  insertTenant(@Body() mydto:AdminTenant,@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000}),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File):any{
    mydto.filename = file.filename; 
    return this.adminService.insertTenant(mydto);
  }

  

  @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
  
    // Insert Payment
  @Post("/insertpayment")
  @UsePipes(new ValidationPipe())
    insertPayment(@Body() mydto:PaymentInfo):any{
      return this.adminService.insertPayment(mydto);
    }
// Insert Manager
  @Post("/insertmanager")
  //@UsePipes(new ValidationPipe())
    insertManager(@Body() mydto:ManagerForm):any{
      return this.managerService.insertManager(mydto);
    }
// Insert House Owner
  @Post("/insertowner")
  @UsePipes(new ValidationPipe())
    insertHouseOwner(@Body() mydto:OwnerForm): any {
      return this.ownerService.insertOwner(mydto);
    }

//Signup
@Post('/signup')
@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('filename',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req,file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})
}))
signup(@Body() mydto:AdminProfile,@UploadedFile(new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 160000}),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File):any{

mydto.filename = file.filename;  
return this.adminService.signup(mydto);

}

//Sign in


  @Post('/signin')

  signin(@Session() session, @Body() mydto:AdminProfile){
  
  if(this.adminService.signin(mydto))
  {
    session.email = mydto.email;
  
  console.log(session.email);
  
  return {message:"success"};
  }
  else
  {
  return {message:"invalid credentials"};
  }
  }
  /*
  @Post('/signin')
  async signin(@Session() session, @Body() mydto:AdminProfile)
    {
     console.log("enter")
  
      const res = await (this.adminService.signin(mydto));
  if(res==true)
  {
    // console.log("pass milse")
    session.email = mydto.email;
    return (session.email);
  }
  else
  {
    throw new UnauthorizedException({ message: "invalid" });
  }
  }
  
*/



//Signout

@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}


// Forget Password 

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

//Insert Admin
@Post("/insertadmin")
@UsePipes(new ValidationPipe())
  insertAdmin(@Body() mydto:AdminProfile):any{
    return this.adminService.insertAdmin(mydto);
  }
//Update Admin
/*
@Put('/updateadmin')
@UseInterceptors(
  FileInterceptor('filename', {
    storage: diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      }
    })
  })
)
async updateAdmin(
  @Body() mydto: AdminProfile,
  @UploadedFile() file: Express.Multer.File
): Promise<string> {
  try {
    console.log(mydto.email);
    mydto.filename = file.filename;
    const result = await this.adminRepo.update({ email: mydto.email }, mydto);
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
@Put('/updateadmin/')
  //@UseGuards(SessionGuard)
  //@UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('uname') uname: string): any {
    console.log(session.email);
    return this.adminService.updateAdmin(uname, session.email);
  }

  @Put('/updateadmin/:id')
  //@UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: AdminProfile,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateAdminbyid(mydto, id);
  }
  
// Update Manager
  @Patch("/updatemanager/")
  @UsePipes(new ValidationPipe())
    updateManager( 
      @Body("name") name:string, 
      @Body("id") id:number
      ): any {
    return this.adminService.updateManager(name, id);
    } 
    @Patch("/updatemanager/:id")
  updateManagerbyid( 
      @Body() mydto:ManagerForm,
      @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.updateManagerbyid(mydto,id);
    }

//Delete Manager

  @Delete("/deletemanager/:id")
  deleteManagerbyid( 
     @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.deleteManagerbyid(id);
    }

//Delete House Owner

  @Delete("/deleteowner/:ownid")
  deleteHouseOwnerbyid( 
     @Param("ownid",ParseIntPipe) ownid:number
      ): any {
    return this.adminService.deleteHouseOwnerbyid(ownid);
    }

//Delete Admin

@Delete("/deleteadmin/:id")
  deleteAdminbyid( 
     @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.deleteAdminbyid(id);
    }


//Delete Tenant

@Delete("/deletetenant/:id")
  deleteTenantbyid( 
     @Param("id",ParseIntPipe) id:number
      ): any {
    return this.adminService.deleteTenantbyid(id);
    }

//Update House Owner

  @Put("/updateowner/")
  @UsePipes(new ValidationPipe())
    updateHouseOwner( 
      @Body("ownname") ownname:string, 
      @Body("ownid") ownid:number
      ): any {
    return this.adminService.updateHouseOwner(ownname, ownid);
    }
    
    @Put("/updateowner/:ownid")
  updateHouseOwnerbyid( 
      @Body() mydto:OwnerForm, 
      @Param("ownid",ParseIntPipe) ownid:number
      ): any {
    return this.adminService.updateHouseOwnerbyid(mydto,ownid);
    }

//View Profile
  @Get("/Profile")
    getAdmin(): any { 
        return this.adminService.getProfile();
    }
  

//Insert house
  @Post("/inserthouse")
  //@UsePipes(new ValidationPipe())
    insertHouse(@Body() mydto:HouseInfo): any {
      return this.adminService.insertHouse(mydto);
    }

//Update House
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

//Search house by area
  @Get("/findhouse/:housename")
      getHouseByArea(@Param("housename") housename:string): any{
        return this.adminService.getHouseByArea(housename);
      }

    @Get("/findhouse")
    getHouseByAreaName(@Query() qry:any): any {
      return this.adminService.getHouseByAreaName(qry);
    }  

//Send Email

@Post('/sendemail')
sendEmail(@Body() mydata){
return this.adminService.sendEmail(mydata);
}
}