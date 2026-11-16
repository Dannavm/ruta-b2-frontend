// Archivo generado desde legacy/ruta-b2-danna.html
import type { PhaseKey } from './phases';

export interface RoutineTask {
  text: string;
  resource: string | null; // clave de RESOURCES, una ruta interna ("/practice") o null
  minutes: number;
}

export const WEEKDAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// ROUTINE[fase][día]: el día 0 es lunes y el 6 es domingo
export const ROUTINE: Record<PhaseKey, RoutineTask[][]> = {
  "A2": [
    [
      {
        "text": "Gramática de la semana",
        "resource": "bcg",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      },
      {
        "text": "Duolingo",
        "resource": "duo",
        "minutes": 8
      }
    ],
    [
      {
        "text": "Escucha: Let’s Learn English o ELLLO nivel 2–3",
        "resource": "voa",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      },
      {
        "text": "Anota 5 palabras nuevas",
        "resource": "cam",
        "minutes": 5
      }
    ],
    [
      {
        "text": "Lectura: 1 noticia en News in Levels (nivel 1–2)",
        "resource": "nil",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      },
      {
        "text": "Duolingo",
        "resource": "duo",
        "minutes": 8
      }
    ],
    [
      {
        "text": "Escritura: 6 oraciones sobre el tema de la semana",
        "resource": "wai",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Conversación con Claude",
        "resource": "claude",
        "minutes": 15
      },
      {
        "text": "Shadowing: repite en voz alta un video corto",
        "resource": "yt_bbc",
        "minutes": 10
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Repaso de tus errores de la semana",
        "resource": "/progress",
        "minutes": 15
      },
      {
        "text": "Video con subtítulos en inglés",
        "resource": "yt_easy",
        "minutes": 30
      },
      {
        "text": "Práctica extra",
        "resource": "/practice",
        "minutes": 15
      }
    ],
    [
      {
        "text": "Opcional: serie o música en inglés con subtítulos en inglés",
        "resource": null,
        "minutes": 30
      }
    ]
  ],
  "B1": [
    [
      {
        "text": "Gramática de la semana (B1)",
        "resource": "bcg",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      },
      {
        "text": "Duolingo",
        "resource": "duo",
        "minutes": 8
      }
    ],
    [
      {
        "text": "Escucha: 1 episodio de 6 Minute English",
        "resource": "six",
        "minutes": 10
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      },
      {
        "text": "Anota 5 expresiones nuevas",
        "resource": "cam",
        "minutes": 5
      }
    ],
    [
      {
        "text": "Lectura B1 del British Council o VOA",
        "resource": "bcr",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Escritura: email o historia de 120 palabras",
        "resource": "wai",
        "minutes": 20
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Conversación con Claude",
        "resource": "claude",
        "minutes": 15
      },
      {
        "text": "Shadowing con un video de pronunciación",
        "resource": "yt_rach",
        "minutes": 10
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Repaso de errores de la semana",
        "resource": "/progress",
        "minutes": 15
      },
      {
        "text": "TED-Ed con subtítulos en inglés",
        "resource": "ted",
        "minutes": 20
      },
      {
        "text": "Escucha extra del British Council",
        "resource": "bcl",
        "minutes": 20
      },
      {
        "text": "Práctica extra",
        "resource": "/practice",
        "minutes": 15
      }
    ],
    [
      {
        "text": "Opcional: serie en inglés con subtítulos en inglés",
        "resource": null,
        "minutes": 40
      }
    ]
  ],
  "B2": [
    [
      {
        "text": "Gramática B2 + 10 palabras académicas",
        "resource": "bcg",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Escucha: 6 Minute English o TED-Ed tomando notas",
        "resource": "six",
        "minutes": 15
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Lectura académica: 1 artículo de BBC Future",
        "resource": "bfu",
        "minutes": 20
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Escritura: medio ensayo (introducción + 1 párrafo)",
        "resource": "wai",
        "minutes": 25
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Speaking Part 2 con Claude (2 minutos)",
        "resource": "claude",
        "minutes": 15
      },
      {
        "text": "Shadowing",
        "resource": "yt_rach",
        "minutes": 10
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Ensayo completo de 250 palabras",
        "resource": "wai",
        "minutes": 40
      },
      {
        "text": "Estrategias de examen",
        "resource": "yt_liz",
        "minutes": 20
      },
      {
        "text": "Práctica extra",
        "resource": "/practice",
        "minutes": 15
      }
    ],
    [
      {
        "text": "Opcional: documental o charla en inglés",
        "resource": null,
        "minutes": 40
      }
    ]
  ],
  "EX": [
    [
      {
        "text": "Reading cronometrado (práctica oficial)",
        "resource": "ielts",
        "minutes": 30
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Listening cronometrado (práctica oficial)",
        "resource": "ielts",
        "minutes": 30
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Writing Task 1 o tareas cortas del DET",
        "resource": "wai",
        "minutes": 25
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Writing Task 2 cronometrado",
        "resource": "wai",
        "minutes": 40
      }
    ],
    [
      {
        "text": "Simulacro de speaking con Claude",
        "resource": "claude",
        "minutes": 20
      },
      {
        "text": "Práctica diaria aquí",
        "resource": "/practice",
        "minutes": 10
      }
    ],
    [
      {
        "text": "Simulacro completo",
        "resource": "det",
        "minutes": 120
      }
    ],
    [
      {
        "text": "Descanso activo: algo en inglés que disfrutes",
        "resource": null,
        "minutes": 30
      }
    ]
  ]
};
