import { IsString } from 'class-validator';

export class FinalizeLetterDto {
  @IsString()
  selectedTemplate: string;
}
