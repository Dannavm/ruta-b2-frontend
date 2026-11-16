import { Link } from 'react-router-dom';
import { RESOURCES } from '../data/resources';

interface Props {
  /** Clave de RESOURCES ("bcg"), ruta interna ("/practice") o null */
  resource: string | null;
}

/** Enlace a un recurso: interno con React Router, externo en una pestaña nueva */
export default function ResourceLink({ resource }: Props) {
  if (!resource) return null;

  const url = resource.startsWith('/') ? resource : RESOURCES[resource]?.url;
  if (!url) return null;

  if (url.startsWith('/')) return <Link to={url}>Abrir aquí</Link>;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {RESOURCES[resource].name}
    </a>
  );
}
