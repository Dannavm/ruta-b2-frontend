import type { Level } from './phases';
import data from './exercises.json';

// En exercises.json la opción correcta SIEMPRE va primera; la app mezcla las opciones al mostrarlas.

export interface ChoiceQuestion {
  question: string;
  options: string[];
  explanation: string;
}

export type GrammarQuestion =
  | ({ type: 'mcq' } & ChoiceQuestion)
  | { type: 'type'; question: string; answers: string[]; explanation: string };

export interface Reading {
  title: string;
  passage: string;
  questions: ChoiceQuestion[];
}

export interface LevelBank {
  vocab: ChoiceQuestion[];
  grammar: GrammarQuestion[];
  reading: Reading[];
  listening: string[];
}

export const BANK = data as Record<Level, LevelBank>;
