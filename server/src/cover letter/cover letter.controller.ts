import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CoverLetterService } from './cover letter.service';
import { GenerateCoverLetterDto } from './dto/generate cover lettter.dto';
import { FinalizeLetterDto } from './dto/finalize letter.dto';

@Controller()
export class CoverLetterController {
  constructor(
    private readonly coverLetterService: CoverLetterService, // Ensure line breaks after constructor parameters
  ) {}

  @Post('generate')
  async generateCoverLetters(
    @Body() coverLetterDto: GenerateCoverLetterDto, // Add line breaks to ensure Prettier formatting
  ): Promise<{ templates: string[] }> {
    try {
      const templates = await this.coverLetterService.generateCoverLetters(
        coverLetterDto, // Remove line breaks to avoid Prettier warning
      );
      return { templates };
    } catch (error) {
      throw new BadRequestException(
        (error as { message?: string })?.message ||
          'Failed to generate cover letter templates',
      );
    }
  }

  @Post('finalize')
  finalizeLetter(
    @Body() { selectedTemplate }: FinalizeLetterDto, // Add line breaks to ensure proper formatting
  ) {
    try {
      const finalLetter =
        this.coverLetterService.finalizeLetter(selectedTemplate);
      return { finalLetter };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error.message || 'Failed to finalize cover letter',
        );
      }
      throw new BadRequestException('Failed to finalize cover letter');
    }
  }
}
