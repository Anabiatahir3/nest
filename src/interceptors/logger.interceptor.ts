import { Injectable,NestInterceptor,ExecutionContext,CallHandler } from "@nestjs/common";
import { Request,Response } from "express";
import { Observable } from "rxjs";
import {  tap ,map} from "rxjs/operators";
@Injectable()
export class LoggerInterceptor implements NestInterceptor{
    intercept(context:ExecutionContext, next:CallHandler):Observable<any>{
        const ctx=context.switchToHttp();
        const request=ctx.getRequest<Request>()
        const response=ctx.getResponse<Response>()
        const startTime=Date.now()
        console.log("1st")

        return next.handle().pipe(
            // tap((data)=>{
            //     const endTime=Date.now()
            //     const resTime=endTime-startTime

            //     console.log(
            //         `${request.method} ${request.path} ${response.statusCode} ${resTime}ms`
            //     )
            // })
            tap((data)=>{
                console.log(data)
              }),
            map(data => ({
                data,
                statusCode: ctx.getResponse().statusCode, // Get HTTP status code
                timestamp: new Date().toISOString(),
              }))
             
        )
    }
}


 