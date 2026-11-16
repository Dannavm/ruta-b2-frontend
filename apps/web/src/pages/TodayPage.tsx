import { Link } from 'react-router-dom';
import RouteLine from '../components/RouteLine';
import ResourceLink from '../components/ResourceLink';
import { PHASES } from '../data/phases';
import { ROUTINE, WEEKDAYS } from '../data/routine';
import { formatShort, getWeek, toKey, today, weekNumberFor, weekdayIndex } from '../lib/dates';
import { currentStreak } from '../lib/streak';
import type { Progress } from '../lib/useProgress';

interface Props {
  progress: Progress;
}

export default function TodayPage({ progress }: Props) {
  const { state, toggleTask } = progress;
  const now = today();
  const todayKey = toKey(now);
  const weekNumber = weekNumberFor(now);
  const week = getWeek(weekNumber);
  const phase = PHASES[week.phase];
  const dayIndex = weekdayIndex(now);

  const tasks = ROUTINE[week.phase][dayIndex].map((task, i) => ({ ...task, id: `t${i}` }));
  const doneTasks = state.days[todayKey]?.tasks ?? {};
  const totalMinutes = tasks.reduce((sum, t) => sum + t.minutes, 0);
  const allDone = tasks.every((t) => doneTasks[t.id]);

  const todaysPractice = state.practices.filter((p) => p.date === todayKey && p.kind === 'daily').at(-1);
  const streak = currentStreak(state);

  return (
    <>
      <RouteLine weekNumber={weekNumber} examDate={state.settings.examDate} />

      <div className="grid2">
        <div>
          <div className="panel">
            <span className="chip" style={{ '--c': phase.color } as React.CSSProperties}>
              Fase {phase.number}: {phase.name}
            </span>
            {week.flag === 'light' && <span className="chip">Semana ligera</span>}
            {week.flag === 'efset' && (
              <span className="chip" style={{ '--c': 'var(--ex)' } as React.CSSProperties}>
                Semana de EF SET
              </span>
            )}
            <h2>
              {weekNumber < 1 ? 'Tu primera semana' : 'Esta semana'}: {week.title}
            </h2>
            <p className="muted small" style={{ margin: 0 }}>
              {formatShort(week.start)} al {formatShort(week.end)}
            </p>
            <dl className="focus">
              <dt>Gramática</dt>
              <dd>{week.grammar}</dd>
              <dt>Vocabulario</dt>
              <dd>{week.vocab}</dd>
              <dt>Habilidad</dt>
              <dd>{week.skill}</dd>
            </dl>
            <h3 style={{ marginTop: 16 }}>Al terminar la semana podrás…</h3>
            <ul className="goals">
              {week.goals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="panel">
            <h3>Rutina de hoy, {WEEKDAYS[dayIndex].toLowerCase()}</h3>
            <p className="muted small" style={{ margin: 0 }}>
              {allDone ? '¡Rutina completa! 🎉 Nos vemos mañana.' : `${totalMinutes} minutos en total. Marca cada tarea al terminarla.`}
            </p>
            <ul className="tasks">
              {tasks.map((task) => {
                const done = Boolean(doneTasks[task.id]);
                return (
                  <li key={task.id}>
                    <input type="checkbox" id={`task-${task.id}`} checked={done} onChange={(e) => toggleTask(task.id, e.target.checked)} />
                    <label htmlFor={`task-${task.id}`}>
                      <span className={done ? 'done-text' : undefined}>{task.text}</span>
                      <br />
                      <ResourceLink resource={task.resource} />
                    </label>
                    <span className="min">{task.minutes} min</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="panel">
            <h3>Práctica diaria</h3>
            {todaysPractice ? (
              <>
                <p style={{ margin: '.2rem 0 1rem' }}>
                  Hoy hiciste {todaysPractice.score} de {todaysPractice.total}.{' '}
                  {todaysPractice.score / todaysPractice.total >= 0.8 ? '¡Excelente trabajo!' : 'Repasa las explicaciones y sigue así.'}
                </p>
                <Link className="btn ghost" to="/practice">
                  Practicar más
                </Link>
              </>
            ) : (
              <>
                <p style={{ margin: '.2rem 0 1rem' }}>10 ejercicios de vocabulario, gramática, lectura y escucha de tu nivel. Unos 10 minutos.</p>
                <Link className="btn" to="/practice">
                  Empezar la práctica de hoy
                </Link>
              </>
            )}
          </div>

          <div className="panel">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <b style={{ fontStretch: '120%', fontSize: '1.6rem' }}>{streak}</b> <span className="muted">{streak === 1 ? 'día de racha' : 'días de racha'}</span>
              </div>
              <Link className="small" to="/progress">
                Ver progreso
              </Link>
            </div>
            <p className="muted small" style={{ margin: '.3rem 0 0' }}>
              Los fines de semana no rompen tu racha.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
