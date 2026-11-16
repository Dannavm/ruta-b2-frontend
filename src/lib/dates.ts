import { PLAN_START, WEEKS, type Week } from '../data/weeks';

export const DAY_MS = 86_400_000;
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MONTHS_LONG = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const pad = (n: number) => String(n).padStart(2, '0');

/** Fecha como texto "2026-11-16" (hora local, sin zona horaria) */
export const toKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** "2026-11-16" → Date a medianoche local */
export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function today(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

/** Días de a hasta b (positivo si b es después) */
export const daysBetween = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / DAY_MS);

/** 0 = lunes ... 6 = domingo */
export const weekdayIndex = (d: Date) => (d.getDay() + 6) % 7;

export const formatShort = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
export const formatLong = (d: Date) => `${d.getDate()} de ${MONTHS_LONG[d.getMonth()]} de ${d.getFullYear()}`;

export const TOTAL_WEEKS = WEEKS.length;

/** Número de semana del plan para una fecha (0 o menos = antes del inicio) */
export const weekNumberFor = (d: Date) => Math.floor(daysBetween(PLAN_START, d) / 7) + 1;

/** Semana actual limitada al rango 1..41 */
export const currentWeekNumber = () => Math.min(Math.max(weekNumberFor(today()), 1), TOTAL_WEEKS);

export interface WeekInfo extends Week {
  number: number;
  start: Date;
  end: Date;
}

export function getWeek(n: number): WeekInfo {
  const number = Math.min(Math.max(n, 1), TOTAL_WEEKS);
  const start = addDays(PLAN_START, (number - 1) * 7);
  return { ...WEEKS[number - 1], number, start, end: addDays(start, 6) };
}
