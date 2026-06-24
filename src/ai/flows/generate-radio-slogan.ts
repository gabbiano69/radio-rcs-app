'use server';
/**
 * @fileOverview Un tool GenAI per generare slogan promozionali accattivanti per stazioni radio.
 *
 * - generateRadioSlogan - Funzione che gestisce il processo di generazione degli slogan.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRadioSloganInputSchema = z.object({
  genre: z
    .string()
    .describe('Il genere della radio o il tema (es. Pop, Rock, Notizie Locali).'),
});
export type GenerateRadioSloganInput = z.infer<typeof GenerateRadioSloganInputSchema>;

const GenerateRadioSloganOutputSchema = z.object({
  slogans: z
    .array(z.string())
    .describe('Un array di 5 slogan creativi e brevi per la radio.'),
});
export type GenerateRadioSloganOutput = z.infer<typeof GenerateRadioSloganOutputSchema>;

export async function generateRadioSlogan(
  input: GenerateRadioSloganInput
): Promise<GenerateRadioSloganOutput> {
  return generateRadioSloganFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRadioSloganPrompt',
  input: {schema: GenerateRadioSloganInputSchema},
  output: {schema: GenerateRadioSloganOutputSchema},
  prompt: `Sei un esperto di marketing creativo specializzato in branding radiofonico.
Il tuo compito è generare 5 slogan brevi, accattivanti e in lingua ITALIANA per una stazione radio.

Il nome della radio è: Radio RCS Sicilia.
Il genere/tema indicato dall'utente è: {{{genre}}}

Crea slogan che trasmettano energia, sicilianità e professionalità.
`,
});

const generateRadioSloganFlow = ai.defineFlow(
  {
    name: 'generateRadioSloganFlow',
    inputSchema: GenerateRadioSloganInputSchema,
    outputSchema: GenerateRadioSloganOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
