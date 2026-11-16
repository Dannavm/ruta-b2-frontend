import { DEFAULT_EXAM_DATE } from '../data/weeks';
import type { Level } from '../data/phases';

export interface DayRecord {
  tasks?: Record<string, boolean>; // tareas de la rutina marcadas ese día
  practiced?: boolean; // terminó al menos una práctica
  talks?: number; // mensajes de conversación enviados
}

export type PracticeKind = 'daily' | 'extra' | 'ai';

export interface PracticeResult {
  date: string; // "2026-11-16"
  kind: PracticeKind;
  score: number;
  total: number;
  level: Level;
}

export interface EfsetResult {
  date: string;
  score: number; // 0–100
}

export type ExamType = 'ielts' | 'det' | 'undecided';

export interface Settings {
  name: string; // cómo saludar a la persona; vacío = sin nombre
  examDate: string;
  examType: ExamType;
}

export interface ProgressState {
  version: 1;
  days: Record<string, DayRecord>;
  practices: PracticeResult[];
  efset: EfsetResult[];
  settings: Settings;
}

const STORAGE_KEY = 'ruta-b2:progress';
const MAX_PRACTICES = 600;

export const defaultState = (): ProgressState => ({
  version: 1,
  days: {},
  practices: [],
  efset: [],
  settings: { name: '', examDate: DEFAULT_EXAM_DATE, examType: 'ielts' },
});

/** Combina lo guardado con los valores por defecto, por si faltan campos */
function merge(raw: unknown): ProgressState {
  const base = defaultState();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<ProgressState>;
  return {
    version: 1,
    days: r.days && typeof r.days === 'object' ? r.days : {},
    practices: Array.isArray(r.practices) ? r.practices.slice(-MAX_PRACTICES) : [],
    efset: Array.isArray(r.efset) ? r.efset : [],
    settings: { ...base.settings, ...(r.settings ?? {}) },
  };
}

export function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? merge(JSON.parse(raw)) : defaultState();
  } catch {
    return defaultState(); // modo privado o datos dañados
  }
}

export function saveState(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sin espacio o almacenamiento bloqueado: la app sigue funcionando en memoria
  }
}
