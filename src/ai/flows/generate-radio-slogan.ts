/**
 * @fileOverview Un tool GenAI per generare slogan promozionali.
 * NOTA: Disabilitato per la build statica dell'APK (Server Actions non supportate).
 */

import {z} from 'genkit';

export const GenerateRadioSloganInputSchema = z.object({
  genre: z.string(),
});
export type GenerateRadioSloganInput = z.infer<typeof GenerateRadioSloganInputSchema>;

export const GenerateRadioSloganOutputSchema = z.object({
  slogans: z.array(z.string()),
});
export type GenerateRadioSloganOutput = z.infer<typeof GenerateRadioSloganOutputSchema>;

// Rimosso 'use server' e reso funzione sincrona di mock per evitare errori in build statica
export async function generateRadioSlogan(input: GenerateRadioSloganInput): Promise<GenerateRadioSloganOutput> {
  return { slogans: ["Slogan disponibile solo nella versione web cloud."] };
}
