// Datos de ejemplo para la Fase 1 (sin conexión real a la API de Claude todavía).
// Cuando se conecte la IA de verdad, esto se sustituye por lo que generen los agentes.

export const AGENTES = [
  { nombre: "Director / Estratega", funcion: "Orquesta al equipo, guarda tu marca y decide qué grabar y por qué." },
  { nombre: "Investigador de tendencias", funcion: "Rastrea qué funciona ahora mismo y encaja con tu personalidad." },
  { nombre: "Guionista viral", funcion: "Estructura tus guiones por bloques, con ganchos que retienen." },
  { nombre: "Planner editorial", funcion: "Monta tu calendario semanal equilibrando alcance y retención." },
  { nombre: "Analista de datos", funcion: "Lee tus métricas y te dice exactamente qué bloque falló." },
];

export type DiaSemana = {
  dia: string;
  pilar: string;
  tipo: "Alcance" | "Retención";
  tendencia: boolean;
  notaDirector: string;
};

export const SEMANA: DiaSemana[] = [
  { dia: "Lunes", pilar: "Educativo", tipo: "Retención", tendencia: false, notaDirector: "Arrancamos la semana enseñando algo útil: genera confianza antes de pedir nada." },
  { dia: "Martes", pilar: "Opinión", tipo: "Alcance", tendencia: true, notaDirector: "Este audio está en tendencia y encaja con tu forma de hablar. Aprovéchalo hoy." },
  { dia: "Miércoles", pilar: "Detrás de cámaras", tipo: "Retención", tendencia: false, notaDirector: "Toca mostrar proceso real. Es el día con más guión, así que lo llevamos con calma." },
  { dia: "Jueves", pilar: "Entretenimiento", tipo: "Alcance", tendencia: true, notaDirector: "Formato ligero para recuperar alcance tras dos días de retención." },
  { dia: "Viernes", pilar: "Educativo", tipo: "Retención", tendencia: false, notaDirector: "Cierre de semana con un tema que ya sabemos que retiene bien en tu cuenta." },
  { dia: "Sábado", pilar: "Opinión", tipo: "Alcance", tendencia: false, notaDirector: "Fin de semana: bajamos ritmo de producción, mantenemos publicación." },
  { dia: "Domingo", pilar: "Descanso", tipo: "Alcance", tendencia: false, notaDirector: "Día sin grabar. La constancia importa más que publicar los 7 días." },
];

export type BloqueGuion = {
  rango: string;
  nombre: string;
  funcion: string;
};

export const GUION_DEL_DIA = {
  dia: "Miércoles",
  tema: "Detrás de cámaras: cómo monta El Caimán su semana de contenido",
  bloques: [
    { rango: "0-3s", nombre: "Gancho", funcion: "Frase seca que para el scroll. Energía alta." } as BloqueGuion,
    { rango: "3-8s", nombre: "Empatía", funcion: "Conectas con el problema real del espectador." },
    { rango: "8-20s", nombre: "Desarrollo", funcion: "Explicas el contexto, subes la tensión poco a poco." },
    { rango: "20-35s", nombre: "Giro", funcion: "El dato o idea que nadie esperaba. Pausa justo antes." },
    { rango: "35-45s", nombre: "Reflexión", funcion: "Bajas el tono y el ritmo. Aquí se queda la idea clave." },
    { rango: "45-55s", nombre: "Cierre", funcion: "Llamada a la acción clara, sin alargarte." },
  ],
  ganchos: [
    "Nadie te cuenta esto de crear contenido todos los días.",
    "Llevo meses grabando así y esto es lo que cambió todo.",
    "Si crees que necesitas un equipo para esto, para de leer.",
    "Esto es lo que hago cada lunes antes de grabar nada.",
  ],
};

export type AnalisisVideo = {
  titulo: string;
  retencion: number;
  views: number;
  bloqueFallo: string;
  ordenAnalista: string;
};

export const ANALISIS_VIDEOS: AnalisisVideo[] = [
  {
    titulo: "Cómo grabar sin cámara buena",
    retencion: 38,
    views: 12400,
    bloqueFallo: "Gancho (0-3s)",
    ordenAnalista: "La retención cae por debajo de tu media en el segundo 2. Prueba un gancho más corto y directo, sin intro.",
  },
  {
    titulo: "3 errores de guión que cometí",
    retencion: 61,
    views: 8900,
    bloqueFallo: "Giro (20-35s)",
    ordenAnalista: "Buena entrada, pero el giro llega tarde. Adelanta el dato sorprendente unos segundos.",
  },
  {
    titulo: "Un día grabando contenido real",
    retencion: 74,
    views: 21300,
    bloqueFallo: "Ninguno",
    ordenAnalista: "Tu mejor vídeo del mes. Repite esta estructura de bloques la semana que viene.",
  },
];
