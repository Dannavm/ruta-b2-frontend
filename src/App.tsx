import { useEffect } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import TodayPage from './pages/TodayPage';
import PlanPage from './pages/PlanPage';
import PracticePage from './pages/PracticePage';
import ConversationPage from './pages/ConversationPage';
import ProgressPage from './pages/ProgressPage';
import ResourcesPage from './pages/ResourcesPage';
import { useProgress } from './lib/useProgress';
import { WEEKS } from './data/weeks';
import { currentWeekNumber, fromKey, setPlanStart } from './lib/dates';
import OnboardingPage from './pages/OnboardingPage';
import { Logo, PlanIcon, PracticeIcon, ProgressIcon, ResourcesIcon, TodayIcon, TutorIcon } from './components/icons';

const NAV = [
  { to: '/', label: 'Hoy', icon: TodayIcon, mobile: true },
  { to: '/plan', label: 'Mi plan', icon: PlanIcon, mobile: true },
  { to: '/practice', label: 'Práctica', icon: PracticeIcon, mobile: true },
  { to: '/conversation', label: 'Tutor IA', icon: TutorIcon, mobile: true },
  { to: '/progress', label: 'Progreso', icon: ProgressIcon, mobile: true },
  { to: '/resources', label: 'Recursos', icon: ResourcesIcon, mobile: false }, // en celular se abre desde Hoy
];

/** Próxima semana con control EF SET, desde la semana actual */
function nextCheck() {
  const current = currentWeekNumber();
  const index = WEEKS.findIndex((w, i) => i + 1 >= current && w.flag === 'efset');
  return index === -1 ? null : { week: index + 1, weeksLeft: index + 1 - current };
}

export default function App() {
  const { pathname } = useLocation();
  const progress = useProgress(); // el progreso vive aquí y se comparte con las páginas
  const { settings } = progress.state;

  // Cada persona tiene su propio inicio de plan: se configura antes de dibujar las páginas
  setPlanStart(fromKey(settings.planStart));
  const check = nextCheck();

  // Al cambiar de sección, vuelve arriba
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  // Primera visita (o "cambiar mi ruta"): mostrar el onboarding
  if (!settings.onboarded) {
    return <OnboardingPage initial={settings} onFinish={(next) => progress.updateSettings(next)} />;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <Logo />
          <span>Ruta B2</span>
        </Link>
        <nav className="nav" aria-label="Secciones">
          {NAV.map(({ to, label, icon: IconComponent }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              <IconComponent />
              {label}
            </NavLink>
          ))}
        </nav>
        {check && (
          <div className="sidebar-card">
            <p className="label">Próximo control</p>
            <p style={{ marginTop: 6, fontWeight: 600 }}>EF SET en la semana {check.week}</p>
            <p className="muted small">{check.weeksLeft === 0 ? '¡Es esta semana!' : check.weeksLeft === 1 ? 'Falta 1 semana' : `Faltan ${check.weeksLeft} semanas`}</p>
          </div>
        )}
        <button
          type="button"
          className="sidebar-link"
          style={{ marginTop: check ? 0 : 'auto', textAlign: 'left', padding: '0 8px' }}
          onClick={() => {
            if (confirm('¿Quieres cambiar tu meta, nivel o fecha de examen? Tu progreso se mantiene.')) progress.updateSettings({ onboarded: false });
          }}
        >
          Cambiar mi ruta
        </button>
      </aside>

      <main className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<TodayPage progress={progress} />} />
            <Route path="/plan" element={<PlanPage progress={progress} />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/conversation" element={<ConversationPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Secciones">
        {NAV.filter((item) => item.mobile).map(({ to, label, icon: IconComponent }) => (
          <NavLink key={to} to={to} end={to === '/'}>
            <IconComponent size={22} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
