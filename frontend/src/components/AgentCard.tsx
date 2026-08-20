type AgentCardProps = {
  nombre: string;
  funcion: string;
};

export function AgentCard({ nombre, funcion }: AgentCardProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-pantano-light p-5 text-left transition-colors hover:border-ambar/50">
      <h3 className="font-rotulo text-lg font-semibold tracking-wide text-ambar">
        {nombre}
      </h3>
      <p className="mt-1 text-sm text-white/70">{funcion}</p>
    </div>
  );
}
