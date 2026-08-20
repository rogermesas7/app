import { AgentCard } from "../components/AgentCard";

const AGENTES = [
  { nombre: "Director / Estratega", funcion: "Orquesta al equipo, guarda tu marca y decide qué grabar y por qué." },
  { nombre: "Investigador de tendencias", funcion: "Rastrea qué funciona ahora mismo y encaja con tu personalidad." },
  { nombre: "Guionista viral", funcion: "Estructura tus guiones por bloques, con ganchos que retienen." },
  { nombre: "Planner editorial", funcion: "Monta tu calendario semanal equilibrando alcance y retención." },
  { nombre: "Analista de datos", funcion: "Lee tus métricas y te dice exactamente qué bloque falló." },
];

export function Portada() {
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
        className="font-rotulo rounded-md bg-ambar px-8 py-3 text-base font-semibold uppercase tracking-wide text-pantano transition-colors hover:bg-ambar-soft"
      >
        Empezar
      </button>
    </main>
  );
}
