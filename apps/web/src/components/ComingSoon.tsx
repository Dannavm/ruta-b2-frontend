interface Props {
  title: string;
  description: string;
}

/** Marcador temporal mientras migramos cada página */
export default function ComingSoon({ title, description }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <p className="lede">{description}</p>
      <div className="panel">
        <p style={{ margin: 0 }}>🚧 Esta sección se está migrando a React. ¡Muy pronto estará lista!</p>
      </div>
    </section>
  );
}
