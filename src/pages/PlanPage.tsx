import { useEffect, useRef } from 'react';
import { PHASES, PHASE_ORDER } from '../data/phases';
import { TOTAL_WEEKS, addDays, getPlanStart, formatLong, formatShort, getWeek, toKey, today, weekNumberFor } from '../lib/dates';
import { activityLevel } from '../lib/streak';
import type { Progress } from '../lib/useProgress';

interface Props {
  progress: Progress;
}

export default function PlanPage({ progress }: Props) {
  const { state } = progress;
  const currentWeek = weekNumberFor(today());
  const currentRef = useRef<HTMLDivElement>(null);
  const planStart = getPlanStart();

  // Al abrir el plan, centra la semana actual en la pantalla.
  // setTimeout espera a que App termine su propio scroll hacia arriba.
  useEffect(() => {
    const id = setTimeout(() => currentRef.current?.scrollIntoView({ block: 'center' }), 0);
    return () => clearTimeout(id);
  }, []);

  /** Cuántos días de esa semana estudiaste (0 a 7) */
  const daysStudied = (start: Date) =>
    Array.from({ length: 7 }, (_, i) => addDays(start, i)).filter((d) => activityLevel(state, toKey(d))).length;

  return (
    <>
      <h2>Plan semana a semana</h2>
      <p className="lede">
        {TOTAL_WEEKS} semanas, del {formatLong(planStart)} al {formatLong(addDays(planStart, TOTAL_WEEKS * 7 - 1))}. Cada semana
        tiene un tema de gramática, uno de vocabulario y una habilidad. Las semanas ligeras sirven para descansar y repasar.
      </p>

      <div className="panel" style={{ marginBottom: 26 }}>
        <h3>Antes de elegir examen</h3>
        <p style={{ margin: '6px 0 0', color: 'var(--text-2)' }}>
          Revisa qué certificado pide tu universidad, beca o empresa, y con qué puntaje. Muchas aceptan IELTS Academic o TOEFL, y
          algunas también el Duolingo English Test o Cambridge. La semana 33 está reservada para decidir y reservar tu fecha.
        </p>
      </div>

      {PHASE_ORDER.map((key) => {
        const phase = PHASES[key];
        const weeks = Array.from({ length: phase.toWeek - phase.fromWeek + 1 }, (_, i) => getWeek(phase.fromWeek + i));

        return (
          <div key={key} className="phase" style={{ '--c': phase.color } as React.CSSProperties}>
            <div className="phase-head">
              <h3>
                Fase {phase.number}: {phase.name}
              </h3>
              <p style={{ margin: '.2rem 0 0' }}>{phase.description}</p>
              <p className="muted small" style={{ margin: '.2rem 0 0' }}>
                Semanas {phase.fromWeek}–{phase.toWeek}, del {formatShort(weeks[0].start)} al {formatShort(weeks[weeks.length - 1].end)}.{' '}
                {phase.target}
              </p>
            </div>

            {weeks.map((week) => {
              const isCurrent = week.number === currentWeek;
              const isPast = week.number < currentWeek;
              return (
                <div
                  key={week.number}
                  ref={isCurrent ? currentRef : undefined}
                  className={`week${isCurrent ? ' current' : ''}${isPast ? ' past' : ''}`}
                >
                  <div className="num">
                    {week.number}
                    <small>{formatShort(week.start)}</small>
                  </div>
                  <div>
                    <h4>
                      {week.title}{' '}
                      {isCurrent && (
                        <span className="chip" style={{ '--c': 'var(--accent)' } as React.CSSProperties}>
                          Semana actual
                        </span>
                      )}
                      {week.flag === 'efset' && (
                        <span className="chip" style={{ '--c': 'var(--ex)' } as React.CSSProperties}>
                          EF SET
                        </span>
                      )}
                      {week.flag === 'light' && <span className="chip">Ligera</span>}
                    </h4>
                    <div className="meta">
                      {week.grammar}. Vocabulario: {week.vocab}.
                      {(isCurrent || isPast) && ` Días de estudio: ${daysStudied(week.start)} de 7.`}
                    </div>
                    <ul>
                      {week.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
