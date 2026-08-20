import { AgentCard } from "../components/AgentCard";
import { AGENTES } from "../data/mockData";

type PortadaProps = {
  onEmpezar: () => void;
};

export function Portada({ onEmpezar }: PortadaProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-16 text-center">
      <div className="max-w-2xl">
        <h1 className="font-rotulo text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
          No contrates a nadie.{" "}
          <span className="text-ambar">Aquí tienes tu equipo.</span>
        </h1>
        <p className="mt-4 text-white/60">
          Cinco agentes de IA que conocen tu marca y trabajan coordinados: estrategia,
          tendencias, guiones, calendario y análisis.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {AGENTES.map((agente) => (
          <AgentCard key={agente.nombre} nombre={agente.nombre} funcion={agente.funcion} />
        ))}
      </div>

      <button
        type="button"
        onClick={onEmpezar}
        className="font-rotulo rounded-md bg-ambar px-8 py-3 text-base font-semibold uppercase tracking-wide text-pantano transition-colors hover:bg-ambar-soft"
      >
        Empezar
      </button>
    </main>
  );
}
