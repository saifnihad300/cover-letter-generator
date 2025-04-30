import { IsString } from 'class-validator';

export class GenerateCoverLetterDto {
  @IsString()
  jobDescription: string;

  @IsString()
  resume: string;
}
