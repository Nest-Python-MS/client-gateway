import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';

@Module({
  controllers: [PagesController],
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
export class PagesModule {}
