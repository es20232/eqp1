import {IsDate, IsNumber, IsString, Length} from "class-validator";


export class createpostdto {
    @Length(1, 1024)
    @IsString()
    descricao: string;
}
export class updatepostdto {
    @Length(1, 1024)
    @IsString()
    descricao: string;
}

export class returnpostdto{

    @IsNumber()
    id: number
    
    @IsNumber()
    Userid:number;

    @IsDate()
    publication_date:Date;

    @Length(1, 1024)
    @IsString()
    descricao: string;
   
    @IsString()
    postimage:string;

}