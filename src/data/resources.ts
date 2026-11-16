// Archivo generado desde legacy/ruta-b2-danna.html
import type { PhaseKey } from './phases';

export interface Resource {
  name: string;
  url: string; // empieza con "/" si es una página interna
  description: string;
}

export const RESOURCES: Record<string, Resource> = {
  "duo": {
    "name": "Duolingo",
    "url": "https://www.duolingo.com",
    "description": "Calentamiento diario de 5–10 minutos. Útil para constancia, no como método principal."
  },
  "bcg": {
    "name": "British Council: gramática",
    "url": "https://learnenglish.britishcouncil.org/grammar",
    "description": "Explicaciones y ejercicios por nivel (A1–A2 y B1–B2). Tu fuente de gramática semanal."
  },
  "bcl": {
    "name": "British Council: listening",
    "url": "https://learnenglish.britishcouncil.org/skills/listening",
    "description": "Audios por nivel con transcripción y ejercicios."
  },
  "bcr": {
    "name": "British Council: reading",
    "url": "https://learnenglish.britishcouncil.org/skills/reading",
    "description": "Lecturas graduadas por nivel con preguntas."
  },
  "bcw": {
    "name": "British Council: writing",
    "url": "https://learnenglish.britishcouncil.org/skills/writing",
    "description": "Modelos de emails, ensayos e informes por nivel."
  },
  "bbc": {
    "name": "BBC Learning English",
    "url": "https://www.bbc.co.uk/learningenglish",
    "description": "Cursos, gramática y vocabulario con audio y transcripciones."
  },
  "six": {
    "name": "6 Minute English (BBC)",
    "url": "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
    "description": "Podcast de 6 minutos con vocabulario y transcripción. Ideal desde B1."
  },
  "voa": {
    "name": "VOA Learning English",
    "url": "https://learningenglish.voanews.com",
    "description": "Noticias leídas despacio y el curso Let’s Learn English para principiantes."
  },
  "ell": {
    "name": "ELLLO",
    "url": "https://www.elllo.org",
    "description": "Miles de audios cortos de personas reales de todo el mundo, por nivel."
  },
  "nil": {
    "name": "News in Levels",
    "url": "https://www.newsinlevels.com",
    "description": "La misma noticia en 3 niveles. Empieza en nivel 1 y sube."
  },
  "wai": {
    "name": "Write & Improve (Cambridge)",
    "url": "https://writeandimprove.com",
    "description": "Escribe y recibe corrección automática con tu nivel MCER estimado. Gratis."
  },
  "cam": {
    "name": "Cambridge Dictionary",
    "url": "https://dictionary.cambridge.org",
    "description": "Definiciones claras con pronunciación británica y americana."
  },
  "ted": {
    "name": "TED-Ed",
    "url": "https://ed.ted.com",
    "description": "Lecciones animadas de 5 minutos sobre ciencia y tecnología. Ideal para B1–B2."
  },
  "bfu": {
    "name": "BBC Future",
    "url": "https://www.bbc.com/future",
    "description": "Artículos de divulgación con el registro de una lectura de IELTS."
  },
  "yt_bbc": {
    "name": "YouTube: BBC Learning English",
    "url": "https://www.youtube.com/results?search_query=BBC+Learning+English",
    "description": "Videos cortos de gramática, pronunciación y la serie English at Work."
  },
  "yt_easy": {
    "name": "YouTube: Easy English",
    "url": "https://www.youtube.com/results?search_query=Easy+English+street+interviews",
    "description": "Entrevistas en la calle con subtítulos en inglés. Inglés real, nada de guion."
  },
  "yt_lucy": {
    "name": "YouTube: English with Lucy",
    "url": "https://www.youtube.com/results?search_query=English+with+Lucy",
    "description": "Gramática, vocabulario y pronunciación británica explicadas con calma."
  },
  "yt_rach": {
    "name": "YouTube: Rachel’s English",
    "url": "https://www.youtube.com/results?search_query=Rachel%27s+English+pronunciation",
    "description": "Pronunciación americana detallada. Perfecto para shadowing."
  },
  "yt_liz": {
    "name": "IELTS Liz",
    "url": "https://ieltsliz.com",
    "description": "Consejos, modelos de respuesta y estrategias para cada parte del IELTS."
  },
  "ielts": {
    "name": "IELTS: prácticas oficiales",
    "url": "https://ielts.org",
    "description": "Pruebas de práctica gratuitas y la información oficial del formato."
  },
  "det": {
    "name": "Duolingo English Test: práctica",
    "url": "https://englishtest.duolingo.com",
    "description": "Prueba de práctica gratuita con el formato real del DET."
  },
  "efset": {
    "name": "EF SET",
    "url": "https://www.efset.org",
    "description": "Test gratuito de 50 minutos con nivel MCER. Tu control cada 2–3 meses."
  },
  "claude": {
    "name": "Tutor IA",
    "url": "/conversation",
    "description": "Práctica de speaking escrita o por voz, adaptada a tu semana."
  }
};

export const PHASE_RESOURCES: Record<PhaseKey, string[]> = {
  "A2": [
    "duo",
    "bcg",
    "voa",
    "ell",
    "nil",
    "wai",
    "bbc",
    "yt_easy",
    "yt_bbc",
    "cam",
    "efset",
    "claude"
  ],
  "B1": [
    "bcg",
    "six",
    "bcl",
    "bcr",
    "voa",
    "wai",
    "ted",
    "yt_bbc",
    "yt_lucy",
    "yt_rach",
    "efset",
    "claude"
  ],
  "B2": [
    "bcg",
    "six",
    "ted",
    "bfu",
    "bcw",
    "wai",
    "yt_liz",
    "yt_rach",
    "ielts",
    "det",
    "efset",
    "claude"
  ],
  "EX": [
    "ielts",
    "det",
    "yt_liz",
    "wai",
    "six",
    "bfu",
    "efset",
    "claude"
  ]
};
