import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, USER_SERVICE } from 'src/config';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: NATS_SERVICE, 
        transport: Transport.NATS, 
        options: {servers: envs.natsServers} 
      },
    ]),
  ] 
})
export class UsersModule {}
