import { useEffect } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import TodayPage from './pages/TodayPage';
import PlanPage from './pages/PlanPage';
import PracticePage from './pages/PracticePage';
import ConversationPage from './pages/ConversationPage';
import ProgressPage from './pages/ProgressPage';
import ResourcesPage from './pages/ResourcesPage';
import { useProgress } from './lib/useProgress';

const TABS = [
  { to: '/', label: 'Hoy' },
  { to: '/plan', label: 'Plan semanal' },
  { to: '/practice', label: 'Práctica' },
  { to: '/conversation', label: 'Conversación' },
  { to: '/progress', label: 'Progreso' },
  { to: '/resources', label: 'Recursos' },
];

export default function App() {
  const { pathname } = useLocation();
  const progress = useProgress(); // el progreso vive aquí y se comparte con las páginas

  // Al cambiar de pestaña, vuelve arriba
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <>
      <header className="top">
        <div className="wrap">
          <h1>Mi ruta al B2</h1>
          <p className="sub">De A2 a un certificado B2 para tu maestría en Europa. Treinta minutos al día, cada día cuenta.</p>
        </div>
      </header>

      <nav className="tabs" aria-label="Secciones">
        <div className="wrap">
          {TABS.map((tab) => (
            // NavLink agrega aria-current="page" a la pestaña activa; el CSS la subraya
            <NavLink key={tab.to} to={tab.to} end={tab.to === '/'}>
              {tab.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="wrap">
        <Routes>
          <Route path="/" element={<TodayPage progress={progress} />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/conversation" element={<ConversationPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
