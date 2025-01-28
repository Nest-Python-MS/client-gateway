import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcGlobalExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    console.log('llega RpcException');
    console.log(exception.getError());

    const rpcError = exception.getError();
    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      res.status(status).json(rpcError);
    }

    res.status(401).json({
      status : 400,
      message : rpcError
    })
  }
} 