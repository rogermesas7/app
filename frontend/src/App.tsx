import { useState } from "react";
import { Portada } from "./pages/Portada";
import { Onboarding } from "./pages/Onboarding";
import { Dashboard } from "./pages/Dashboard";

type Pantalla = "portada" | "onboarding" | "dashboard";

function App() {
  const [pantalla, setPantalla] = useState<Pantalla>("portada");

  if (pantalla === "onboarding") {
    return <Onboarding onCompletar={() => setPantalla("dashboard")} />;
  }

  if (pantalla === "dashboard") {
    return <Dashboard />;
  }

  return <Portada onEmpezar={() => setPantalla("onboarding")} />;
}

export default App;
