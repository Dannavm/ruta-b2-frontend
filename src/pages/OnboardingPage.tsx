import { useState } from 'react';
import { Logo } from '../components/icons';
import { formatLong, fromKey, planStartFor, suggestedExamDate, toKey, today } from '../lib/dates';
import { buildPlacementTest, placementLevel, type PlacementQuestion } from '../lib/placement';
import type { ExamType, Goal, Settings, StartLevel } from '../lib/storage';

interface Props {
  initial: Settings;
  onFinish: (settings: Settings) => void;
}

const GOALS: { id: Goal; title: string; text: string; color: string }[] = [
  { id: 'exam', title: 'Aprobar un examen', text: 'IELTS, TOEFL, Cambridge, DET', color: 'var(--a2)' },
  { id: 'study', title: 'Estudiar en el extranjero', text: 'Becas y maestrías', color: 'var(--b1)' },
  { id: 'work', title: 'Mi trabajo', text: 'Reuniones, emails, entrevistas', color: 'var(--b2)' },
  { id: 'travel', title: 'Viajar y conversar', text: 'Situaciones del día a día', color: 'var(--ex)' },
];

const MINUTES = [15, 30, 45, 60];

const LEVELS: { id: StartLevel; title: string; text: string }[] = [
  { id: 'A1', title: 'Estoy empezando', text: 'Conozco palabras sueltas y frases muy básicas.' },
  { id: 'A2', title: 'Básico (A2)', text: 'Hablo de mi rutina y de mi pasado con frases simples.' },
  { id: 'B1', title: 'Intermedio (B1)', text: 'Cuento historias, doy mi opinión y me defiendo viajando.' },
  { id: 'B2', title: 'Intermedio alto (B2)', text: 'Argumento, leo textos largos y converso con fluidez.' },
];

const EXAMS: { id: ExamType; label: string }[] = [
  { id: 'undecided', label: 'Aún no lo sé' },
  { id: 'ielts', label: 'IELTS' },
  { id: 'toefl', label: 'TOEFL' },
  { id: 'cambridge', label: 'Cambridge' },
  { id: 'det', label: 'Duolingo English Test' },
];

const TOTAL_STEPS = 4;

export default function OnboardingPage({ initial, onFinish }: Props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initial.name);
  const [goal, setGoal] = useState<Goal>(initial.goal);
  const [minutes, setMinutes] = useState(initial.minutesPerDay);
  const [level, setLevel] = useState<StartLevel>(initial.level);
  const [examType, setExamType] = useState<ExamType>(initial.examType);
  const [hasExamDate, setHasExamDate] = useState(false);
  const [examDate, setExamDate] = useState('');

  // Test rápido de nivel
  const [test, setTest] = useState<PlacementQuestion[] | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<StartLevel | null>(null);

  const start = planStartFor(level);
  const suggested = suggestedExamDate(start);
  const finalExamDate = hasExamDate && examDate ? examDate : toKey(suggested);

  function startTest() {
    setTest(buildPlacementTest());
    setAnswers([]);
    setTestResult(null);
  }

  function answerTest(option: number) {
    if (!test) return;
    const next = [...answers, option];
    setAnswers(next);
    if (next.length === test.length) {
      const result = placementLevel(test, next);
      setTestResult(result);
      setLevel(result);
      setTest(null);
    }
  }

  function finish() {
    onFinish({
      ...initial,
      onboarded: true,
      name: name.trim(),
      goal,
      minutesPerDay: minutes,
      level,
      planStart: toKey(start),
      examDate: finalExamDate,
      examType,
    });
  }

  const canContinue = step !== 4 || !hasExamDate || Boolean(examDate);

  return (
    <div className="onboarding">
      <div className="onboarding-box">
        <div className="onboarding-top">
          {step > 1 && !test ? (
            <button type="button" className="icon-btn" aria-label="Volver" onClick={() => setStep(step - 1)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
          ) : (
            <Logo size={40} />
          )}
          <div className="steps" role="img" aria-label={`Paso ${step} de ${TOTAL_STEPS}`}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <i key={i} className={i < step ? 'on' : ''} />
            ))}
          </div>
          <span className="mono small muted">{step}/{TOTAL_STEPS}</span>
        </div>

        {/* Paso 1: bienvenida */}
        {step === 1 && (
          <div className="onboarding-step">
            <p className="label" style={{ color: 'var(--accent)' }}>Te damos la bienvenida</p>
            <h1>Tu ruta al inglés empieza aquí.</h1>
            <p className="lede" style={{ margin: 0 }}>Responde 4 preguntas y armamos un plan semana a semana solo para ti. Toma 2 minutos.</p>
            <label className="field">
              ¿Cómo te llamas?
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" autoComplete="given-name" maxLength={40} />
            </label>
          </div>
        )}

        {/* Paso 2: meta y tiempo */}
        {step === 2 && (
          <div className="onboarding-step">
            <h1>¿Para qué quieres el inglés?</h1>
            <p className="lede" style={{ margin: 0 }}>Con esto elegimos los temas y el tipo de práctica de tu ruta.</p>
            <div className="choices">
              {GOALS.map((g) => (
                <button key={g.id} type="button" className="choice" aria-pressed={goal === g.id} onClick={() => setGoal(g.id)} style={{ '--c': g.color } as React.CSSProperties}>
                  <span className="choice-dot" />
                  <span><b>{g.title}</b><br /><span className="muted small">{g.text}</span></span>
                </button>
              ))}
            </div>
            <p style={{ margin: '6px 0 0', fontWeight: 600 }}>¿Cuánto tiempo al día?</p>
            <div className="pills">
              {MINUTES.map((m) => (
                <button key={m} type="button" className="pill-btn" aria-pressed={minutes === m} onClick={() => setMinutes(m)}>
                  {m === 60 ? '1 h+' : `${m} min`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Paso 3: nivel (elegir o test) */}
        {step === 3 && !test && (
          <div className="onboarding-step">
            <h1>¿Cuál es tu nivel?</h1>
            {testResult ? (
              <p className="result-box">
                Según tu test, tu nivel es <b>{testResult}</b>. Puedes cambiarlo si crees que es otro.
              </p>
            ) : (
              <p className="lede" style={{ margin: 0 }}>Elige el que más se parezca a ti, o haz un test rápido de 12 preguntas.</p>
            )}
            <div className="choices">
              {LEVELS.map((l) => (
                <button key={l.id} type="button" className="choice" aria-pressed={level === l.id} onClick={() => setLevel(l.id)}>
                  <span className="choice-dot" />
                  <span><b>{l.title}</b><br /><span className="muted small">{l.text}</span></span>
                </button>
              ))}
            </div>
            <button type="button" className="btn ghost" onClick={startTest}>
              {testResult ? 'Repetir el test' : 'No lo sé: hacer el test rápido'}
            </button>
            {level === 'A1' && (
              <p className="muted small" style={{ margin: 0 }}>
                Tu ruta empezará en A2, con las bases desde cero. Te recomendamos sumar 10 minutos diarios de Duolingo las primeras semanas.
              </p>
            )}
          </div>
        )}

        {/* Paso 3: test en curso */}
        {step === 3 && test && (
          <div className="onboarding-step">
            <p className="label">Test rápido / pregunta {answers.length + 1} de {test.length}</p>
            <div className="progress"><i style={{ width: `${(answers.length / test.length) * 100}%` }} /></div>
            <h2 style={{ fontWeight: 600 }}>{test[answers.length].question}</h2>
            <div className="choices">
              {test[answers.length].options.map((option, i) => (
                <button key={`${answers.length}-${i}`} type="button" className="choice" onClick={() => answerTest(i)}>
                  {option}
                </button>
              ))}
            </div>
            <p className="muted small" style={{ margin: 0 }}>Si no sabes la respuesta, elige la que te parezca. No hay corrección aquí: solo medimos tu nivel.</p>
          </div>
        )}

        {/* Paso 4: examen y resumen */}
        {step === 4 && (
          <div className="onboarding-step">
            <h1>¿Tienes fecha de examen?</h1>
            <div className="pills">
              <button type="button" className="pill-btn" aria-pressed={!hasExamDate} onClick={() => setHasExamDate(false)}>Todavía no</button>
              <button type="button" className="pill-btn" aria-pressed={hasExamDate} onClick={() => setHasExamDate(true)}>Sí, ya la tengo</button>
            </div>
            {hasExamDate && (
              <label className="field">
                Fecha del examen
                <input type="date" value={examDate} min={toKey(today())} onChange={(e) => setExamDate(e.target.value)} />
              </label>
            )}
            <label className="field">
              Examen
              <select value={examType} onChange={(e) => setExamType(e.target.value as ExamType)}>
                {EXAMS.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.label}</option>
                ))}
              </select>
            </label>

            <div className="summary">
              <p className="label" style={{ color: 'var(--accent)' }}>Tu ruta</p>
              <p>
                Empiezas en <b>{level === 'A1' ? 'A2 (desde cero)' : level}</b>
                {level === 'B1' || level === 'B2' ? `, directo en la semana ${level === 'B1' ? 13 : 26}` : ''}, con unos <b>{minutes} minutos al día</b>.
              </p>
              <p>
                {hasExamDate && examDate
                  ? <>Tu examen: <b>{formatLong(fromKey(examDate))}</b>.</>
                  : <>Fecha sugerida para tu examen: <b>{formatLong(suggested)}</b>. Puedes cambiarla después.</>}
              </p>
            </div>
          </div>
        )}

        {!test && (
          <button type="button" className="btn" disabled={!canContinue} onClick={() => (step < TOTAL_STEPS ? setStep(step + 1) : finish())} style={{ width: '100%', minHeight: 56, fontSize: 17 }}>
            {step < TOTAL_STEPS ? 'Continuar' : 'Crear mi ruta'}
          </button>
        )}
      </div>
    </div>
  );
}
