import { useState } from "react";
import { AGENTES } from "../data/mockData";

type Paso = "grabar" | "generando" | "desplegando";

type OnboardingProps = {
  onCompletar: () => void;
};

export function Onboarding({ onCompletar }: OnboardingProps) {
  const [paso, setPaso] = useState<Paso>("grabar");
  const [grabando, setGrabando] = useState(false);
  const [grabacionLista, setGrabacionLista] = useState(false);

  function alternarGrabacion() {
    if (grabando) {
      setGrabando(false);
      setGrabacionLista(true);
      return;
    }
    setGrabando(true);
    setGrabacionLista(false);
  }

  function continuar() {
    setPaso("generando");
    // Simulación de la extracción de la biblia de marca.
    // Aquí no se llama a ninguna IA todavía: es solo la animación de la Fase 1.
    window.setTimeout(() => setPaso("desplegando"), 1400);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      {paso === "grabar" && (
        <div className="flex max-w-md flex-col items-center gap-6">
          <h1 className="font-rotulo text-3xl font-bold uppercase tracking-wide text-white">
            Cuéntanos quién eres
          </h1>
          <p className="text-white/60">
            Graba un audio corto contando tu marca: quién eres, de qué hablas y a
            quién le hablas. Con eso tu equipo arma tu biblia de marca.
          </p>

          <button
            type="button"
            onClick={alternarGrabacion}
            className={`font-rotulo flex h-24 w-24 items-center justify-center rounded-full text-sm font-semibold uppercase tracking-wide transition-colors ${
              grabando
                ? "animate-pulse bg-red-500 text-white"
                : "bg-ambar text-pantano hover:bg-ambar-soft"
            }`}
          >
            {grabando ? "Grabando…" : "Grabar"}
          </button>

          {grabacionLista && !grabando && (
            <p className="text-sm text-ambar">Grabación lista.</p>
          )}

          <button
            type="button"
            onClick={continuar}
            disabled={!grabacionLista}
            className="font-rotulo rounded-md border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors enabled:hover:border-ambar enabled:hover:text-ambar disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continuar
          </button>
        </div>
      )}

      {paso === "generando" && (
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-ambar border-t-transparent" />
          <p className="font-rotulo text-lg uppercase tracking-wide text-white/70">
            Extrayendo tu biblia de marca…
          </p>
        </div>
      )}

      {paso === "desplegando" && (
        <div className="flex max-w-lg flex-col items-center gap-8">
          <h1 className="font-rotulo text-3xl font-bold uppercase tracking-wide text-white">
            Desplegando tu <span className="text-ambar">equipo</span>
          </h1>
          <ul className="flex w-full flex-col gap-3 text-left">
            {AGENTES.map((agente, i) => (
              <li
                key={agente.nombre}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-pantano-light px-4 py-3 opacity-0 animate-[fadeIn_0.4s_ease_forwards]"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="text-ambar">✓</span>
                <span className="font-medium text-white">{agente.nombre}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onCompletar}
            className="font-rotulo rounded-md bg-ambar px-8 py-3 text-base font-semibold uppercase tracking-wide text-pantano transition-colors hover:bg-ambar-soft"
          >
            Entrar al panel
          </button>
        </div>
      )}
    </main>
  );
}
