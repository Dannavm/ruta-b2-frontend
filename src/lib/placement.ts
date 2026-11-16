import { BANK } from '../data/exercises';
import type { Level } from '../data/phases';
import { shuffle } from './practice';
import type { StartLevel } from './storage';

export interface PlacementQuestion {
  level: Level;
  question: string;
  options: string[];
  answer: number;
}

const PER_LEVEL = 4;

/** 12 preguntas: 4 de A2, 4 de B1 y 4 de B2, de vocabulario y gramática */
export function buildPlacementTest(): PlacementQuestion[] {
  const levels: Level[] = ['A2', 'B1', 'B2'];
  return levels.flatMap((level) => {
    const bank = BANK[level];
    const pool = [
      ...bank.vocab,
      ...bank.grammar.filter((g) => g.type === 'mcq'), // solo opción múltiple
    ];
    return shuffle(pool)
      .slice(0, PER_LEVEL)
      .map((q) => {
        const order = shuffle(q.options.map((_, i) => i));
        return { level, question: q.question, options: order.map((i) => q.options[i]), answer: order.indexOf(0) };
      });
  });
}

/** Nivel según los aciertos de cada bloque: hay que aprobar un nivel para subir al siguiente */
export function placementLevel(questions: PlacementQuestion[], answers: number[]): StartLevel {
  const correct = (level: Level) => questions.filter((q, i) => q.level === level && answers[i] === q.answer).length;
  const pass = (level: Level) => correct(level) >= 3; // 3 de 4
  if (!pass('A2')) return correct('A2') >= 2 ? 'A2' : 'A1';
  if (!pass('B1')) return 'A2';
  if (!pass('B2')) return 'B1';
  return 'B2';
}
