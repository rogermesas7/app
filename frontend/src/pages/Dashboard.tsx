import { useState } from "react";
import { SEMANA, GUION_DEL_DIA, ANALISIS_VIDEOS } from "../data/mockData";

type Pestana = "semana" | "guion" | "analisis";

const PESTANAS: { id: Pestana; etiqueta: string }[] = [
  { id: "semana", etiqueta: "Semana" },
  { id: "guion", etiqueta: "Guión" },
  { id: "analisis", etiqueta: "Análisis" },
];

export function Dashboard() {
  const [pestana, setPestana] = useState<Pestana>("semana");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-1 text-center">
        <h1 className="font-rotulo text-2xl font-bold uppercase tracking-wide text-white">
          Tu panel
        </h1>
        <p className="text-xs uppercase tracking-wide text-white/40">
          Datos de ejemplo — Fase 1, aún sin conectar a tus redes
        </p>
      </header>

      <nav className="flex justify-center gap-2">
        {PESTANAS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setPestana(t.id)}
            className={`font-rotulo rounded-md px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
              pestana === t.id
                ? "bg-ambar text-pantano"
                : "bg-pantano-light text-white/70 hover:text-white"
            }`}
          >
            {t.etiqueta}
          </button>
        ))}
      </nav>

      {pestana === "semana" && <PestanaSemana />}
      {pestana === "guion" && <PestanaGuion />}
      {pestana === "analisis" && <PestanaAnalisis />}
    </main>
  );
}

function PestanaSemana() {
  return (
    <div className="flex flex-col gap-3">
      {SEMANA.map((d) => (
        <div
          key={d.dia}
          className="flex flex-col gap-2 rounded-lg border border-white/10 bg-pantano-light p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-rotulo text-sm font-semibold uppercase tracking-wide text-ambar">
              {d.dia}
              {d.tendencia && (
                <span className="ml-2 rounded bg-ambar/20 px-2 py-0.5 text-[10px] text-ambar-soft">
                  Tendencia
                </span>
              )}
            </p>
            <p className="text-sm text-white">
              {d.pilar} · <span className="text-white/50">{d.tipo}</span>
            </p>
          </div>
          <p className="max-w-sm text-sm text-white/60 sm:text-right">{d.notaDirector}</p>
        </div>
      ))}
    </div>
  );
}

function PestanaGuion() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-white/40">{GUION_DEL_DIA.dia}</p>
        <h2 className="font-rotulo text-lg font-semibold text-white">{GUION_DEL_DIA.tema}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {GUION_DEL_DIA.bloques.map((b) => (
          <div
            key={b.rango}
            className="flex items-start gap-4 rounded-lg border border-white/10 bg-pantano-light p-4"
          >
            <span className="font-rotulo w-16 shrink-0 text-sm font-bold text-ambar">
              {b.rango}
            </span>
            <div>
              <p className="font-medium text-white">{b.nombre}</p>
              <p className="text-sm text-white/60">{b.funcion}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="font-rotulo mb-2 text-sm font-semibold uppercase tracking-wide text-white/70">
          4 opciones de gancho
        </p>
        <div className="flex flex-col gap-2">
          {GUION_DEL_DIA.ganchos.map((g, i) => (
            <details
              key={i}
              className="rounded-md border border-white/10 bg-pantano-light px-4 py-3 text-sm text-white/80"
            >
              <summary className="cursor-pointer font-medium text-white">
                Opción {i + 1}
              </summary>
              <p className="mt-2 text-white/70">{g}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

function PestanaAnalisis() {
  return (
    <div className="flex flex-col gap-3">
      {ANALISIS_VIDEOS.map((v) => (
        <div key={v.titulo} className="rounded-lg border border-white/10 bg-pantano-light p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-medium text-white">{v.titulo}</p>
            <span className="font-rotulo shrink-0 text-sm font-bold text-ambar">
              {v.retencion}% retención
            </span>
          </div>
          <p className="mt-1 text-xs text-white/40">{v.views.toLocaleString("es-ES")} views</p>
          <p className="mt-3 text-sm text-white/70">
            <span className="font-semibold text-white/90">Bloque que falló: </span>
            {v.bloqueFallo}
          </p>
          <p className="mt-1 text-sm text-white/60">{v.ordenAnalista}</p>
        </div>
      ))}
    </div>
  );
}
