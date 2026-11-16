import { Link } from 'react-router-dom';
import RouteLine from '../components/RouteLine';
import ResourceLink from '../components/ResourceLink';
import { ArrowIcon, FlameIcon } from '../components/icons';
import { PHASES } from '../data/phases';
import { ROUTINE } from '../data/routine';
import { addDays, getWeek, toKey, today, weekNumberFor, weekdayIndex } from '../lib/dates';
import { activityLevel, currentStreak } from '../lib/streak';
import type { Progress } from '../lib/useProgress';

interface Props {
  progress: Progress;
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

/** "lunes 16 de noviembre" → "Lunes 16 de noviembre" */
function longDate(d: Date): string {
  const text = d.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' });
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const DAY_LETTERS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export default function TodayPage({ progress }: Props) {
  const { state, toggleTask } = progress;
  const now = today();
  const todayKey = toKey(now);
  const weekNumber = weekNumberFor(now);
  const week = getWeek(weekNumber);
  const dayIndex = weekdayIndex(now);
  const name = state.settings.name.trim();

  // Tareas de hoy
  const tasks = ROUTINE[week.phase][dayIndex].map((task, i) => ({ ...task, id: `t${i}` }));
  const doneTasks = state.days[todayKey]?.tasks ?? {};
  const doneCount = tasks.filter((t) => doneTasks[t.id]).length;
  const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0);

  // Práctica y racha
  const todaysPractice = state.practices.filter((p) => p.date === todayKey && p.kind === 'daily').at(-1);
  const lastPractices = state.practices.slice(-8);
  const best = lastPractices.reduce((max, p) => Math.max(max, p.score / p.total), 0);
  const streak = currentStreak(state);

  // Lunes a domingo de esta semana del calendario
  const monday = addDays(now, -dayIndex);
  const weekDays = DAY_LETTERS.map((letter, i) => {
    const date = addDays(monday, i);
    return { letter, key: toKey(date), level: activityLevel(state, toKey(date)), isToday: i === dayIndex };
  });

  return (
    <>
      <header className="today-head">
        <div>
          <p>{longDate(now)}</p>
          <h1>{greeting()}{name ? `, ${name}` : ''}</h1>
        </div>
        <div className="pill">
          <FlameIcon size={16} style={{ color: 'var(--warn)' }} />
          <b>{streak} {streak === 1 ? 'día' : 'días'}</b>
          <span className="muted">de racha</span>
        </div>
      </header>

      <RouteLine weekNumber={weekNumber} examDate={state.settings.examDate} />

      <div className="row">
        {/* Misión de hoy */}
        <section className="panel" style={{ flex: '3 1 420px', minWidth: 0 }}>
          <div className="panel-head" style={{ marginBottom: 0 }}>
            <h2 style={{ fontSize: 21 }}>Misión de hoy</h2>
            <span className="mono small muted">
              {doneCount} de {tasks.length} / {totalMinutes} min
            </span>
          </div>
          <div className="progress" style={{ margin: '14px 0 6px' }}>
            <i style={{ width: `${(doneCount / tasks.length) * 100}%` }} />
          </div>

          <ul className="tasks">
            {tasks.map((task) => {
              const done = Boolean(doneTasks[task.id]);
              return (
                <li key={task.id}>
                  <input type="checkbox" id={`task-${task.id}`} checked={done} onChange={(e) => toggleTask(task.id, e.target.checked)} />
                  <label htmlFor={`task-${task.id}`}>
                    <span className={done ? 'done-text' : undefined}>{task.text}</span>
                    {task.resource && (
                      <>
                        <br />
                        <span className="sub"><ResourceLink resource={task.resource} /></span>
                      </>
                    )}
                  </label>
                  <span className="min">{task.minutes} min</span>
                </li>
              );
            })}
          </ul>

          {doneCount === tasks.length && <p style={{ color: 'var(--accent)', fontWeight: 600 }}>¡Misión cumplida! Nos vemos mañana.</p>}

          <Link className="btn" to="/practice" style={{ marginTop: 14 }}>
            {todaysPractice ? 'Practicar más' : 'Empezar la práctica de hoy'}
            <ArrowIcon />
          </Link>
          {todaysPractice && (
            <p className="muted small" style={{ margin: '10px 0 0' }}>
              Práctica de hoy: {todaysPractice.score} de {todaysPractice.total}.
            </p>
          )}
        </section>

        <div className="col" style={{ flex: '2 1 300px' }}>
          {/* Esta semana */}
          <section className="panel">
            <div className="panel-head">
              <h2 style={{ fontSize: 21 }}>Esta semana</h2>
              {week.flag === 'efset' && <span className="chip" style={{ '--c': 'var(--ex)' } as React.CSSProperties}>EF SET</span>}
              {week.flag === 'light' && <span className="chip">Ligera</span>}
            </div>
            <dl className="focus">
              <dt>Gramática</dt>
              <dd>{week.grammar}</dd>
              <dt>Vocabulario</dt>
              <dd>{week.vocab}</dd>
              <dt>Habilidad</dt>
              <dd>{week.skill}</dd>
            </dl>
            <div className="week-strip" role="img" aria-label={`Días estudiados esta semana: ${weekDays.filter((d) => d.level).length} de 7`}>
              {weekDays.map((d) => (
                <div key={d.key}>
                  {d.letter}
                  <i className={[d.level ? `l${d.level}` : '', d.isToday ? 'today' : ''].join(' ')} />
                </div>
              ))}
            </div>
            <details style={{ marginTop: 16 }}>
              <summary style={{ cursor: 'pointer', color: 'var(--text-2)' }}>Objetivos de la semana</summary>
              <ul style={{ margin: '8px 0 0', paddingLeft: '1.1rem', color: 'var(--text-2)', fontSize: 14 }}>
                {week.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </details>
          </section>

          {/* Aciertos */}
          <section className="panel">
            <div className="panel-head" style={{ marginBottom: 0 }}>
              <h2 style={{ fontSize: 21 }}>Aciertos</h2>
              <span className="label">Últimas 8</span>
            </div>
            {lastPractices.length ? (
              <>
                <div className="bars" role="img" aria-label="Porcentaje de aciertos en tus últimas prácticas">
                  {lastPractices.map((p, i) => (
                    <i key={i} style={{ height: `${Math.max((p.score / p.total) * 100, 4)}%` }} title={`${p.score} de ${p.total}`} />
                  ))}
                </div>
                <p className="small" style={{ margin: '12px 0 0', color: 'var(--text-2)' }}>
                  Tu mejor resultado reciente: <b style={{ color: 'var(--text)' }}>{Math.round(best * 100)}%</b>
                </p>
              </>
            ) : (
              <p className="muted small" style={{ margin: '14px 0 0' }}>
                Haz tu primera práctica y aquí verás cómo mejoras.
              </p>
            )}
          </section>

          <Link to="/resources" className="panel" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '18px 24px' }}>
            <span>
              <b>Recursos de tu fase</b>
              <br />
              <span className="muted small">Fase {PHASES[week.phase].number}: videos, podcasts y lecturas</span>
            </span>
            <ArrowIcon style={{ color: 'var(--accent)' }} />
          </Link>
        </div>
      </div>
    </>
  );
}
