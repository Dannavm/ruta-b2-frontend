import { useCallback, useEffect, useState } from 'react';
import { loadState, saveState, type EfsetResult, type PracticeResult, type ProgressState, type Settings } from './storage';
import { toKey, today } from './dates';

/**
 * Hook con todo el progreso de la usuaria.
 * Guarda en localStorage cada vez que algo cambia.
 */
export function useProgress() {
  const [state, setState] = useState<ProgressState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const toggleTask = useCallback((taskId: string, done: boolean) => {
    const key = toKey(today());
    setState((s) => {
      const day = s.days[key] ?? {};
      return { ...s, days: { ...s.days, [key]: { ...day, tasks: { ...day.tasks, [taskId]: done } } } };
    });
  }, []);

  const addPractice = useCallback((result: Omit<PracticeResult, 'date'>) => {
    const key = toKey(today());
    setState((s) => ({
      ...s,
      practices: [...s.practices, { ...result, date: key }].slice(-600),
      days: { ...s.days, [key]: { ...s.days[key], practiced: true } },
    }));
  }, []);

  const addTalk = useCallback(() => {
    const key = toKey(today());
    setState((s) => ({ ...s, days: { ...s.days, [key]: { ...s.days[key], talks: (s.days[key]?.talks ?? 0) + 1 } } }));
  }, []);

  const addEfset = useCallback((result: EfsetResult) => {
    setState((s) => ({ ...s, efset: [...s.efset, result].sort((a, b) => a.date.localeCompare(b.date)) }));
  }, []);

  const removeEfset = useCallback((index: number) => {
    setState((s) => ({ ...s, efset: s.efset.filter((_, i) => i !== index) }));
  }, []);

  const updateSettings = useCallback((settings: Partial<Settings>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...settings } }));
  }, []);

  return { state, toggleTask, addPractice, addTalk, addEfset, removeEfset, updateSettings };
}

export type Progress = ReturnType<typeof useProgress>;
