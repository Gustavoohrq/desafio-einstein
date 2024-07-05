import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsIn, IsString, Matches } from "class-validator";
import { TransformToLowercase } from "src/shared/infrastructure/transformers/transform-to-lowercase";

export class CreateSchedulingDto {
    @IsString()
    @Matches(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, { message: 'Placa deve ser no formato Mercosul' })
    licensePlate: string;

    @IsDateString({ strict: true }, { message: 'A data deve estar no formato ISO 8601.' })
    date: Date;

    @IsString()
    @Matches(/^(1[0-7]|0[1-9]):([0-5][0-9])$/, { message: 'O horário deve estar no formato HH:MM.' })
    time: string;

    @IsString()
    @Transform(TransformToLowercase)
    @IsIn(['simples', 'completa'], { message: 'Tipo de lavagem inválido. Use "simples" ou "completa".' })
    type: 'simples' | 'completa';
}
