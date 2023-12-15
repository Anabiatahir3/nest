//there are 2 types of middlewares
//functional and classbased

import { HttpException, Injectable, NestMiddleware ,Inject} from "@nestjs/common";
import { Request ,Response,NextFunction} from "express";
export async function userAgent(req:Request,res:Response,next:NextFunction){

    const ua=req.headers["user-agent"];
    console.log(ua)
    //we can aslo attach it to the req of 
    req["ua"]=ua
next()
}
//class based are used when there are dependency injections required
@Injectable()
export class userAgentMiddleware implements NestMiddleware{
    constructor(@Inject('Options') private option:string[]){}
    use(req:Request,res:Response,next:NextFunction){
    const ua=req.headers["user-agent"];
    console.log(ua)
    console.log(this.option)
    if (this.userAgentAcceptance(ua)){
     throw new Error()
    }
    req["ua"]=ua;
    next();


    }
private userAgentAcceptance(userAgent:string):boolean{
        return this.option.some((agent)=>{
            userAgent.toLowerCase().includes(agent.toLowerCase())
        })
       
       
    
    }
    
}

 