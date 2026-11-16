// Archivo generado desde legacy/ruta-b2-danna.html
export type PhaseKey = 'A2' | 'B1' | 'B2' | 'EX';
export type Level = 'A2' | 'B1' | 'B2';

export interface Phase {
  number: number;
  name: string;
  color: string; // variable CSS definida en index.css
  fromWeek: number;
  toWeek: number;
  description: string;
  target: string;
}

export const PHASE_ORDER: PhaseKey[] = ['A2', 'B1', 'B2', 'EX'];

export const PHASES: Record<PhaseKey, Phase> = {
  "A2": {
    "number": 1,
    "name": "A2 sólido",
    "color": "var(--a2)",
    "fromWeek": 1,
    "toWeek": 12,
    "description": "Asentar la base: hablar de ti, de tu día y de tu pasado con frases simples pero correctas.",
    "target": "Meta al cerrar: EF SET 35–40 (A2 alto)."
  },
  "B1": {
    "number": 2,
    "name": "B1 independiente",
    "color": "var(--b1)",
    "fromWeek": 13,
    "toWeek": 25,
    "description": "Contar historias, dar opiniones y entender audios cotidianos sin traducir todo mentalmente.",
    "target": "Meta al cerrar: EF SET 45–50 (B1)."
  },
  "B2": {
    "number": 3,
    "name": "B2 académico",
    "color": "var(--b2)",
    "fromWeek": 26,
    "toWeek": 35,
    "description": "Argumentar, leer textos académicos y escribir ensayos con estructura clara.",
    "target": "Meta al cerrar: EF SET 51 o más (B2)."
  },
  "EX": {
    "number": 4,
    "name": "Preparación del examen",
    "color": "var(--ex)",
    "fromWeek": 36,
    "toWeek": 41,
    "description": "Simulacros cronometrados, formato del examen elegido y tu lista personal de errores.",
    "target": "Meta: B2 certificado (por ejemplo IELTS Academic 6.0–6.5, o lo que pida tu programa)."
  }
};

// La fase de examen practica con ejercicios de nivel B2
export const levelOfPhase = (phase: PhaseKey): Level => (phase === 'EX' ? 'B2' : phase);
