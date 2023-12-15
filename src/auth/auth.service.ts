import { Injectable,NotFoundException } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { UpdateDto } from "./dto/update.dto";
@Injectable()
export class AuthService{
    private users=[
        {
            "id":1,
            "name":"anabia",
            "role":"INTERN",
        },
        {
            "id":2,
            "name":"tahir",
            "role":"ADMIN",
        }

    ]

    findAll(role?:"INTERN"| "ENGINEER"|"ADMIN"){
        if (role){
            const rolesArray= this.users.filter(user=>user.role===role)
            if (rolesArray.length===0) throw new NotFoundException({
                message:"UOh",
                error:"No role found"
            })
        return rolesArray
    }
        return this.users
    }
  
    findOne(id:number):object{
        const user=this.users.find(user=>user.id===id)
        if(!user){
            throw new NotFoundException("user not found")
        }
        return user
    }
    create(createDto:CreateDto){
        const userByHighestId=[...this.users].sort((a,b)=>b.id-a.id)
        const newUser={
            id:userByHighestId[0].id+1,
            ...createDto
        }
        this.users.push(newUser)
        return newUser
    } 
   update (id:number, updateDto:UpdateDto){
    this.users=this.users.map((user=>{
        if (user.id===id){
            return {...user,...updateDto}
        }
        return user
    }))
    return this.findOne(id)

   }

   delete (id:number){
    const removedUser=this.findOne(id)
    this.users= this.users.filter(user=>user.id!==id)
    return removedUser
   }

}