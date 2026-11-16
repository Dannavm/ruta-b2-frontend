// Íconos de línea (SVG) usados en toda la app. Heredan el color del texto.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 18, children, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

export const TodayIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>
);
export const PlanIcon = (p: IconProps) => (<Icon {...p}><path d="M3 6h18M3 12h18M3 18h12" /></Icon>);
export const PracticeIcon = (p: IconProps) => (
  <Icon {...p}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></Icon>
);
export const TutorIcon = (p: IconProps) => (<Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>);
export const ProgressIcon = (p: IconProps) => (<Icon {...p}><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></Icon>);
export const ResourcesIcon = (p: IconProps) => (<Icon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" /></Icon>);
export const FlameIcon = (p: IconProps) => (<Icon {...p}><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 3 3 3s1-4 0-7z" /></Icon>);
export const ArrowIcon = (p: IconProps) => (<Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>);

/** Logo: una ruta que sube hasta una estación */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="32" height="32" rx="9" stroke="var(--accent)" strokeWidth="1.5" />
      <path d="M7 22 L14 15 L20 19 L27 11" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="27" cy="11" r="2.6" fill="var(--accent)" />
    </svg>
  );
}
