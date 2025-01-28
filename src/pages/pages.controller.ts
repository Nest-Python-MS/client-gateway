import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, map, tap } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { SaveDataLakeDto, ProcessingDataDto } from './dto/save_data_lake.dto';

@Controller('pages')
export class PagesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client : ClientProxy
  ) {}

  @Post('save_to_data_lake')
  save_to_data_lake(@Body() saveDataLakeDto : SaveDataLakeDto  ){
    return this.client.send('save_to_data_lake', saveDataLakeDto).pipe(
      catchError(error => {throw new RpcException(error);
      })
    )
  }

  @Post('test')
  test_nats() {
    return this.client.send('test_nats', {}).pipe(
      catchError(error => {
        console.error("Error:", error);
        throw new RpcException(error);
      })
    );
  }

  @Get('')
  get_all_pages() {
    return this.client.send('get_all_pages', {}).pipe(
      catchError(error => {
        console.error("Error:", error);
        throw new RpcException(error);
      })
    );
  }

  @Post('processing_data')
  processing_data(@Body() processingDataDto : ProcessingDataDto ) {
    return this.client.send('processing_data', processingDataDto).pipe(
      catchError(error => {
        console.error("Error:", error);
        throw new RpcException(error);
      })
    );
  }

  @Post('get_staging_from_date')
  get_staging_from_date(@Body() processingDataDto : ProcessingDataDto ) {
    return this.client.send('get_staging_from_date', processingDataDto).pipe(
      catchError(error => {
        console.error("Error:", error);
        throw new RpcException(error);
      })
    );
  }

  @Post('total_amount_month')
  total_amount_month() {
    return this.client.send('total_amount_month', {}).pipe(
      catchError(error => {
        console.error("Error:", error);
        throw new RpcException(error);
      })
    );
  }
}
