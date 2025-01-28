import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import {  PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client : ClientProxy
  ) {}

  @Post()
  createUser(@Body() createUserDto : CreateUserDto  ){
    return this.client.send('create_user', createUserDto).pipe(
      catchError(error => {throw new RpcException(error);
      })
    )
  }

  @Get()
  findAllUsers(@Query() paginationDto : PaginationDto){
    return this.client.send('find_all_users', paginationDto).pipe(
      catchError(error => {throw new RpcException(error);
      })
    )
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number){

    return this.client.send('find_one_user', {id}).pipe(
      catchError(error => {throw new RpcException(error);
      })
    )
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number){
    return this.client.send('delete_user', { id}).pipe(
      catchError(error => {throw new RpcException(error) }))
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
    return this.client.send('update_user', { id, ...updateUserDto}).pipe(
      catchError(error => {throw new RpcException(error) }))
  }
}
