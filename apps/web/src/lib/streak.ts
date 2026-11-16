import type { ProgressState } from './storage';
import { addDays, fromKey, today, toKey, weekdayIndex } from './dates';

/** 0 = no estudió, 1 = solo marcó tareas, 2 = hizo una práctica */
export function activityLevel(state: ProgressState, key: string): 0 | 1 | 2 {
  const day = state.days[key];
  if (!day) return 0;
  if (day.practiced) return 2;
  const tasksDone = Object.values(day.tasks ?? {}).some(Boolean);
  return tasksDone || (day.talks ?? 0) > 0 ? 1 : 0;
}

const isWeekend = (d: Date) => weekdayIndex(d) >= 5;

/** Racha actual. Los fines de semana sin estudio no la rompen, y hoy aún no cuenta como fallo. */
export function currentStreak(state: ProgressState): number {
  let d = today();
  if (!activityLevel(state, toKey(d))) d = addDays(d, -1);
  let streak = 0;
  for (let i = 0; i < 400; i++) {
    if (activityLevel(state, toKey(d))) streak++;
    else if (!isWeekend(d)) break;
    d = addDays(d, -1);
  }
  return streak;
}

export function bestStreak(state: ProgressState): number {
  const keys = Object.keys(state.days).filter((k) => activityLevel(state, k)).sort();
  if (!keys.length) return 0;
  let best = 0;
  let run = 0;
  const end = today();
  for (let d = fromKey(keys[0]); d <= end; d = addDays(d, 1)) {
    if (activityLevel(state, toKey(d))) best = Math.max(best, ++run);
    else if (!isWeekend(d)) run = 0;
  }
  return best;
}

export const daysStudied = (state: ProgressState) =>
  Object.keys(state.days).filter((k) => activityLevel(state, k)).length;

/** Nivel MCER según el puntaje del EF SET */
export function efsetLevel(score: number): string {
  if (score >= 71) return 'C2';
  if (score >= 61) return 'C1';
  if (score >= 51) return 'B2';
  if (score >= 41) return 'B1';
  if (score >= 31) return 'A2';
  return 'A1';
}
