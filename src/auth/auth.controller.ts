import { Controller, Get, Param,Post,Body ,Patch,Delete,Query,
    ParseIntPipe,ValidationPipe, UseInterceptors,Inject, ParseEnumPipe, HttpException, Req} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";
import { ExampleService } from "./example.service";
import { Request } from "express";

  


@Controller('auth')

export class AuthController{
    constructor(private readonly authService:AuthService,private readonly exampleService:ExampleService,
     @Inject('DB_NAME') private config:Map<string,any>){}
    //all our routes are defined here
    //static routes such as "/hello" should be defined before dynamic routes such as "/:id"
 @Get()
    findAll(@Query("role")role?:"INTERN"|"ADMIN"|"ENGINEER"){
        console.log(this.config)
        return  this.authService.findAll(role)
        
    }
    @Get("/example")
    getExample(@Req()req: Request){
        console.log(req["ua"])
        return this.exampleService.getExample()
    }
    @Get(':id')
    findOne(@Param('id',ParseIntPipe)id:number):Record<string,any>{
    return this.authService.findOne(id)
    }

    
    @Post()
    create(@Body(ValidationPipe)createDto:CreateDto){
        return this.authService.create(createDto)
    }
    @Patch(":id")
    update(@Param("id",ParseIntPipe) id :number, @Body(ValidationPipe)updateDto:UpdateDto){
        return this.authService.update(id,updateDto)
    }
    @Delete(":id")
    delete(@Param("id",ParseIntPipe) id :number){
        return this.authService.delete(id)
    }
}