import { PHASES, PHASE_ORDER } from '../data/phases';
import { TOTAL_WEEKS, daysBetween, formatShort, fromKey, getWeek, today } from '../lib/dates';

interface Props {
  weekNumber: number; // semana real (0 o menos = el plan aún no empieza)
  examDate: string; // "2027-08-28"
}

/** La línea de ruta: 4 fases que se iluminan a medida que avanzas, y el examen al final */
export default function RouteLine({ weekNumber, examDate }: Props) {
  const exam = fromKey(examDate);
  const daysLeft = Math.max(daysBetween(today(), exam), 0);
  const week = getWeek(weekNumber);
  const phase = PHASES[week.phase];

  let title: string;
  if (weekNumber < 1) title = 'Tu ruta empieza el lunes';
  else if (weekNumber > TOTAL_WEEKS) title = '¡Llegaste a la última estación!';
  else title = `Semana ${weekNumber} de ${TOTAL_WEEKS}: ${week.title}`;

  return (
    <section className="panel" aria-label="Tu ruta">
      <div className="route-top">
        <div>
          <p className="label" style={{ color: phase.color }}>
            Fase {phase.number} / {phase.name}
          </p>
          <h2>{title}</h2>
        </div>
        <div className="countdown">
          <b>{daysLeft}</b>
          <span>días para tu examen ({formatShort(exam)} {exam.getFullYear()})</span>
        </div>
      </div>

      <div className="track" role="img" aria-label={`Ruta de ${TOTAL_WEEKS} semanas; vas en la semana ${Math.max(weekNumber, 0)}`}>
        {PHASE_ORDER.map((key) => {
          const p = PHASES[key];
          const length = p.toWeek - p.fromWeek + 1;
          // Qué parte de la fase ya recorriste (0 a 100 %)
          const done = Math.min(Math.max((weekNumber - p.fromWeek + 0.5) / length, 0), 1) * 100;
          const isHere = weekNumber >= p.fromWeek && weekNumber <= p.toWeek;
          return (
            <div key={key} className="track-seg" style={{ flex: length, '--c': p.color } as React.CSSProperties}>
              {done > 0 && <i style={{ width: `${isHere ? done : 100}%` }} />}
              {isHere && <span className="track-here" style={{ left: `${done}%` }} />}
            </div>
          );
        })}
        <span className="track-end" title="Examen" />
      </div>

      <div className="track-labels">
        {PHASE_ORDER.map((key) => {
          const p = PHASES[key];
          const status = weekNumber > p.toWeek ? 'completada' : weekNumber >= p.fromWeek ? 'en curso' : '';
          return (
            <span key={key} style={{ flex: p.toWeek - p.fromWeek + 1, color: p.color }}>
              <b>{key === 'EX' ? 'EXAMEN' : key}</b> {status && <span className="muted">{status}</span>}
            </span>
          );
        })}
        <span style={{ width: 18, flex: 'none' }} />
      </div>
    </section>
  );
}
