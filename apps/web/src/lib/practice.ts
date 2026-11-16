import { BANK, type ChoiceQuestion } from '../data/exercises';
import type { Level } from '../data/phases';

export type PracticeItem =
  | { type: 'choice'; tag: string; question: string; options: string[]; answer: number; explanation: string; passage?: { title: string; text: string } }
  | { type: 'typed'; tag: string; question: string; answers: string[]; explanation: string }
  | { type: 'dictation'; tag: string; sentence: string };

/** Número a partir de un texto: la misma semilla da siempre la misma práctica */
function hash(text: string): number {
  let h = 2166136261;
  for (const c of text) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Generador de números aleatorios con semilla (mulberry32) */
function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** En el JSON la correcta va primera: la mezclamos y recordamos dónde quedó */
function toChoice(q: ChoiceQuestion, tag: string, random: () => number): Extract<PracticeItem, { type: 'choice' }> {
  const order = shuffle(q.options.map((_, i) => i), random);
  return {
    type: 'choice',
    tag,
    question: q.question,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(0),
    explanation: q.explanation,
  };
}

/**
 * Arma una práctica de 10 ejercicios: 4 de vocabulario, 3 de gramática,
 * 2 de lectura y 1 dictado (o 1 de vocabulario si no hay audio).
 */
export function buildPractice(seed: string, level: Level, withDictation: boolean): PracticeItem[] {
  const random = seededRandom(hash(seed));
  const bank = BANK[level];
  const items: PracticeItem[] = [];

  const vocab = shuffle(bank.vocab, random);
  vocab.slice(0, 4).forEach((q) => items.push(toChoice(q, 'Vocabulario', random)));

  shuffle(bank.grammar, random)
    .slice(0, 3)
    .forEach((q) => {
      if (q.type === 'type') items.push({ type: 'typed', tag: 'Gramática', question: q.question, answers: q.answers, explanation: q.explanation });
      else items.push(toChoice(q, 'Gramática', random));
    });

  const reading = shuffle(bank.reading, random)[0];
  reading.questions.slice(0, 2).forEach((q) => {
    items.push({ ...toChoice(q, 'Lectura', random), passage: { title: reading.title, text: reading.passage } });
  });

  if (withDictation) items.push({ type: 'dictation', tag: 'Escucha', sentence: shuffle(bank.listening, random)[0] });
  else items.push(toChoice(vocab[4], 'Vocabulario', random));

  return items;
}

/** Minúsculas, sin puntuación y con apóstrofos uniformes, para comparar respuestas */
export const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.,!?;:"“”()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const checkTyped = (input: string, answers: string[]) => answers.some((a) => normalize(a) === normalize(input));

export interface DictationResult {
  correct: boolean;
  words: { word: string; ok: boolean }[];
  hits: number;
}

/** Compara palabra por palabra y marca las que faltaron o cambiaron */
export function checkDictation(input: string, sentence: string): DictationResult {
  const target = normalize(sentence).split(' ');
  const typed = normalize(input).split(' ');
  let from = 0;
  const words = target.map((word) => {
    const found = typed.indexOf(word, from);
    if (found >= 0) from = found + 1;
    return { word, ok: found >= 0 };
  });
  const hits = words.filter((w) => w.ok).length;
  return { correct: hits === target.length && typed.length === target.length, words, hits };
}
