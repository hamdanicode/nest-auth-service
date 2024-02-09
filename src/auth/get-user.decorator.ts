import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const GetUser= createParamDecorator((data:any,ctx:ExecutionContext)=>{
    const req= ctx.switchToHttp().getRequest();
    return req.user

})