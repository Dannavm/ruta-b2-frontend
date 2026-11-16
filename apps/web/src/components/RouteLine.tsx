import { PHASES, PHASE_ORDER } from '../data/phases';
import { WEEKS } from '../data/weeks';
import { TOTAL_WEEKS, daysBetween, formatShort, fromKey, getWeek, today } from '../lib/dates';

interface Props {
  weekNumber: number; // semana real (0 o menos = el plan aún no empieza)
  examDate: string; // "2027-08-28"
}

/** La línea de tren: 4 fases, una estación por semana y el examen al final */
export default function RouteLine({ weekNumber, examDate }: Props) {
  const exam = fromKey(examDate);
  const daysLeft = Math.max(daysBetween(today(), exam), 0);

  let where: string;
  if (weekNumber < 1) where = 'Tu plan empieza el lunes. Hoy ya puedes hacer tu primera práctica.';
  else if (weekNumber > TOTAL_WEEKS) where = 'Llegaste a la última estación. ¡Mucho éxito en tu examen!';
  else where = `Semana ${weekNumber} de ${TOTAL_WEEKS}: ${getWeek(weekNumber).title}`;

  return (
    <div className="route">
      <div className="route-head">
        <div className="where">{where}</div>
        <div className="count">
          <b>{daysLeft}</b>
          <span>
            días para tu examen oficial ({formatShort(exam)} {exam.getFullYear()})
          </span>
        </div>
      </div>

      <div className="line" aria-label={`Recorrido de ${TOTAL_WEEKS} semanas dividido en 4 fases`}>
        {PHASE_ORDER.map((key) => {
          const phase = PHASES[key];
          const weeks = Array.from({ length: phase.toWeek - phase.fromWeek + 1 }, (_, i) => phase.fromWeek + i);
          return (
            <div key={key} className="seg" style={{ flex: weeks.length, background: phase.color, color: phase.color }}>
              {weeks.map((w) => {
                const classes = ['dot'];
                if (w < weekNumber) classes.push('done');
                if (w === weekNumber) classes.push('here');
                if (WEEKS[w - 1].flag === 'efset' && w !== weekNumber) classes.push('test');
                return (
                  <i key={w} className={classes.join(' ')} title={`Semana ${w}`}>
                    {w === weekNumber && <span className="here-tag">Estás aquí</span>}
                  </i>
                );
              })}
            </div>
          );
        })}
        <span className="endstop" title="Examen" />
      </div>

      <div className="legend">
        {PHASE_ORDER.map((key) => {
          const phase = PHASES[key];
          return (
            <div key={key} style={{ flex: phase.toWeek - phase.fromWeek + 1, color: phase.color }}>
              Fase {phase.number}
              <small>{phase.name}</small>
            </div>
          );
        })}
        <div style={{ flex: 'none', width: 24 }} />
      </div>
    </div>
  );
}
