import { Injectable } from '@nestjs/common';
import { GenerateCoverLetterDto } from './dto/generate cover lettter.dto';
import { CohereClient } from 'cohere-ai';
import * as dotenv from 'dotenv';

dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

@Injectable()
export class CoverLetterService {
  async generateCoverLetters(
    coverLetterDto: GenerateCoverLetterDto,
  ): Promise<string[]> {
    const { resume, jobDescription } = coverLetterDto;

    const userPrompt = `Given the following job description and resume, generate two distinct professional cover letter templates. 
Each letter should be clear, tailored to the job description, and demonstrate how the candidate’s experience aligns with the role.

Job Description:
${jobDescription}

Resume:
${resume}

Provide the letters in a numbered format (1 and 2).`;

    try {
      const chatResponse = await cohere.chat({
        model: 'command-r', // Ensure the correct model is being used here
        message: userPrompt, // Use message instead of messages
        temperature: 0.7,
      });

      const content = chatResponse.text?.trim() || '';

      const letters = content
        .split(/\n?2\.\s+/)
        .map((part) => part.replace(/^1\.\s*/, '').trim());

      return letters;
    } catch (error: unknown) {
      console.error('Cohere API Error:', error);
      throw new Error('Failed to generate cover letters');
    }
  }

  finalizeLetter(selectedLetter: string): string {
    return selectedLetter;
  }
}
