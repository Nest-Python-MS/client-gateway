import { IsInt, IsString } from "class-validator";

export class SaveDataLakeDto {

    @IsString()
    public date: string;

    @IsInt()
    public page_id: number;

}

export class ProcessingDataDto {

    @IsString()
    public date: string;

}
