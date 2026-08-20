# INFORME MAESTRO — App "Tu Equipo de Contenido" (proyecto El Caimán)

> Documento fundacional del proyecto. Pensado para pegarse en Claude Code como
> punto de partida y consultarse a lo largo de toda la construcción.
> Fecha: agosto 2026. Autor del brief: Roger (El Caimán). Redactado con Claude.

---

## 0. Cómo usar este documento

- **Este archivo es el mapa, no la app.** Guárdalo en el repo (por ejemplo `docs/INFORME-MAESTRO.md`).
- **Dónde se construye:** en Claude Code, sobre el repo. Ahí vive el código y la memoria del proyecto.
- **Dónde se piensa:** en el chat normal de Claude (pizarra de ideas, textos, diseño de pantallas nuevas, dudas de estrategia). No cuesta cuota de Code.
- **Regla de oro:** una cosa a la vez. No se pasa a la siguiente fase hasta que la anterior funciona.

---

## 0-bis. REGLA DE ORO — Fiabilidad y cero invento (aplica a TODO el sistema)

Esta es una regla transversal, obligatoria para **todos** los agentes y skills, en
**todas** sus acciones. No es una nota suelta: es un principio de producto.

**Por qué es crítica:** esta app se vende. Si da información inventada o errónea,
no es un fallo menor — es un problema de credibilidad y potencialmente legal. Un
usuario que publica contenido basado en un dato falso que le dio la app se la
juega, y nos la jugamos nosotros.

**La regla:**
- **Cero invento.** Ningún agente da una opinión "porque sí" ni se inventa datos,
  cifras, fechas, nombres o hechos.
- **Todo contrastado en internet**, con búsqueda activa, siempre que se afirme un
  hecho, un dato, una tendencia o una recomendación basada en datos.
- **Múltiples fuentes**, no una sola. Cotejar varias.
- **Fuentes autoritativas y fiables:** los profesionales de referencia del sector,
  gente con autoridad real y conocimiento demostrado. No foros random ni webs de
  dudosa procedencia.
- **Con fuente y fecha.** Cada afirmación relevante debe poder rastrearse a de
  dónde salió y de cuándo es (lo importante caduca rápido en redes).

**Matización honesta (importante, no saltarse):** ninguna IA verifica perfecto el
100% de las veces. Contrastar con varias fuentes fiables reduce los errores
muchísimo, pero no los elimina del todo. Por eso la regla de "contrastar" va
siempre acompañada de:
1. **Mostrar las fuentes** al usuario, para que pueda comprobarlo él mismo.
2. **Avisar en temas delicados** (salud, dinero, legal, y cualquier afirmación de
   hechos sensibles) de que conviene verificar antes de publicar.
3. **Si no hay fuente fiable, se dice.** Es preferible un "esto no lo he podido
   contrastar" a un dato inventado con seguridad falsa.

Esto ya está en el ADN de tus skills actuales (el investigador y el de identidad
de marca ya trabajan con "fuente, fecha y cero invento"). Aquí se eleva a norma
de TODO el sistema y de la app.

---

## 1. La idea en una frase

Una app donde un creador mete su identidad de marca (por audio) una sola vez, y
a partir de ahí un "equipo" de cinco agentes de IA le monta la estrategia, el
calendario semanal, los guiones y el análisis de sus vídeos — todos coordinados
y con su personalidad. El gancho de venta: *"No contrates a nadie. Aquí tienes tu equipo."*

Es la versión-producto del sistema de cinco agentes que Roger ya construyó en
Claude Code para su propia marca (repo `caiman-proyecto`).

---

## 2. Aviso de realidad (leer antes de invertir tiempo o dinero)

Esto no es opinión, son datos que salieron al investigar el mercado. Se deja por
escrito para decidir con la cabeza fría, no con la ilusión del momento.

1. **El mercado está saturado.** Existen decenas de herramientas de IA para
   contenido en redes. Hay artículos comparando 21 de ellas con su precio.
2. **Hay competencia española fuerte:** Metricool (desde ~19€/mes, en español,
   soporte en español, respaldo de Google/Meta, referente hispano). La barrera
   de idioma que parecía una ventaja ya está cubierta por ellos.
3. **Nadie cobra pago único; todos cobran suscripción con créditos**, porque cada
   generación de IA cuesta tokens. Un pago único + costes recurrentes = pérdida
   en cada usuario. **El modelo tiene que ser suscripción con límite de uso.**
4. **El foso no es la tecnología** (replicable en semanas), **es el criterio de
   contenido con personalidad.** Y eso solo se demuestra creciendo con El Caimán.
   La app se vende sola el día que Roger sea un caso de éxito; sin audiencia, no
   se vende ni estando perfecta.

**Conclusión de negocio:** construir la app y hacer crecer El Caimán van en
paralelo. La app es lo que se vende *después* de tener autoridad, no en vez de.

---

## 3. La diferencia real frente a Metricool

Metricool = **brazo ejecutor**: programa publicaciones, mide métricas, y tiene un
generador de copys sueltos (le das un tema y un tono, te da un texto). Su propia
documentación reconoce que la generación de contenido con IA no es su fuerte.

Nuestra app = **cerebro estratega con personalidad y memoria**. Las tres
diferencias concretas a defender:

1. **Estrategia con criterio propio, no un botón de texto.** El director decide
   qué grabar y por qué, lleva la contraria con datos, cierra el bucle de aprendizaje.
2. **Investigación de tendencias accionable con encaje de marca.** No "seguimiento
   de hashtags" genérico, sino "graba esto hoy porque este audio peta y encaja
   con tu personalidad", con fuente y fecha.
3. **Guiones estructurados + análisis que apunta al bloque que falló.** Guión por
   bloques con timestamps y ganchos; el analista conecta "esta métrica bajó" →
   "falló el gancho del segundo 3". Esa cadena creación↔análisis con memoria de
   marca, Metricool no la tiene.

**Riesgo a vigilar:** el competidor real no es solo Metricool, es "Metricool +
ChatGPT/Claude gratis". La pregunta de negocio abierta es: ¿por qué alguien paga
por esto en vez de usar esa combinación? La respuesta tiene que ser el criterio
empaquetado + la comodidad de tenerlo todo coordinado en un sitio.

---

## 4. Los cinco agentes (el corazón del producto)

Estos ya existen y funcionan en el repo `caiman-proyecto`. Se portan a la app.
Cada uno es, en esencia, un prompt de sistema muy afinado + acceso a los archivos
de contexto compartidos.

| Agente | Función | Qué entrega |
|---|---|---|
| **Director / Estratega** | Orquestador. Punto único de entrada. | Enruta peticiones, guarda la biblia de marca, cierra el bucle de aprendizaje, asesora llevando la contraria con datos. |
| **Investigador de tendencias** | Rastreo multiplataforma. | Briefs accionables (audio/formato/tema/hook), clasificados por fase del ciclo de vida y por encaje con la marca. Con fuente y fecha, cero invento. |
| **Guionista viral** | Guiones de Reels/TikTok. | Mapa por bloques con timestamps (0-3, 3-8, 8-20, 20-35, 35-45, 45-55) + 4 opciones de gancho. Nunca palabra por palabra. |
| **Planner editorial** | Calendario. | Semana rotando pilares, equilibrando alcance y retención, respetando franja de publicación. Banco de ideas vivo. |
| **Analista de datos** | Lectura de métricas. | Traduce cada métrica al bloque exacto del guión que falla. Compara contra la propia media del usuario. Desprecia vanity metrics. |

**Archivos de contexto compartidos** (la "memoria" del equipo; en la app pasan a
ser base de datos por usuario):
- `marca.md` — biblia de marca (personalidad, pilares, diferencial, franja horaria)
- `banco-ideas.md` — ideas vivas
- `calendario.md` — plan de publicación
- `learnings.md` — qué ha funcionado y qué no

---

## 5. Las pantallas (basadas en el prototipo ya montado)

El prototipo funcional (`prototipo-caiman.jsx`) ya muestra el flujo. Las pantallas son:

1. **Portada / venta** — titular "No contrates a nadie. Aquí tienes tu equipo.",
   lista de los cinco agentes, botón de empezar.
2. **Onboarding** — el usuario graba su identidad por audio → se extrae la biblia
   de marca → animación de "despliegue del equipo".
3. **Dashboard con 3 pestañas:**
   - **Semana:** calendario de 7 días con pilar, etiqueta alcance/retención,
     marca de tendencia, y una nota del director explicando la estrategia.
   - **Guión:** guión del día por bloques con timestamps + 4 ganchos desplegables.
   - **Análisis:** tarjetas por vídeo con retención/views, el bloque que falló, y
     una orden del analista al guionista.
4. **Formatos de grabación** (NUEVO) — galería de formatos; al elegir uno, escenas
   de ejemplo de cómo colocarse. Ver 5-bis-A.
5. **Presencia en cámara** (NUEVO) — guía de gesticulación, manos, postura,
   encuadre. Rama independiente. Ver 5-bis-B.
6. **Teleprompter** (NUEVO) — el guión pasando por pantalla al grabar. Ver 5-bis-C.

**Identidad visual:** verde pantano muy oscuro (#0d1512) + acento ámbar-mostaza
(#e0a82e, "los ojos del caimán en el agua"). Tipografía condensada tipo rótulo
para titulares. Deliberadamente lejos del look genérico de app de IA.

---

## 5-bis. Ampliación de alcance: de la idea al vídeo publicado

Decisión de producto (agosto 2026): el cliente objetivo es alguien que **no sabe
crear contenido**. Por tanto la app no puede acabar en el guión — tiene que cubrir
también el hueco donde ese usuario se atasca y abandona: grabarse y editar. Se
cubre en modo **guía**, no construyendo editores de vídeo dentro de la app.

**Principio rector (leer siempre antes de tocar estos bloques):**
- **Guiar / enseñar = SÍ.** La app dice cómo hacerlo, muestra ejemplos, da el
  teleprompter. Barato y aporta muchísimo.
- **Construir un editor/grabador de vídeo dentro de la app = NO.** Eso es CapCut,
  una empresa de cientos de ingenieros y gratis. Competir ahí hunde el proyecto.

Mapa completo de producción (de la idea al vídeo publicado):
1. Idea y estrategia — ✅ ya existe (los 5 agentes)
2. Guión — ✅ ya existe (guionista)
3. **Biblioteca de formatos de grabación** — NUEVO (ver 5-bis-A)
4. **Presencia en cámara** — NUEVO (ver 5-bis-B)
5. **Teleprompter** — NUEVO (ver 5-bis-C)
6. **Edición** — idea aparcada, sin construir aún (ver 5-bis-D)
7. Publicación — programar, hora óptima, copy, hashtags (futuro)
8. Análisis — ✅ ya existe (analista)

### 5-bis-A. Biblioteca de formatos de grabación

Qué es: el usuario elige un **formato de grabación** (POV, hablar a cámara,
mostrar producto, voz en off con imágenes, etc.) y la app le muestra **escenas de
ejemplo** — fotos o clips de referencia — que le enseñan exactamente el plano,
dónde colocarse, dónde va la cámara, cómo encuadrar. El usuario lo ve y lo copia
con su móvil.

- **La app NO graba.** Es una **galería/biblioteca visual de referencias de plano**,
  organizada por formato. Técnicamente es una galería, no un editor → barato, sin pozo.
- **Formatos abiertos a ampliar.** Se empieza con unos pocos clave y se añaden
  más con el tiempo. La estructura debe permitir añadir/quitar formatos fácilmente.
- **Origen de las escenas de ejemplo — CRÍTICO (legal):** las imágenes/clips deben
  ser (a) grabadas por Roger, (b) de stock con licencia comercial válida, o
  (c) generadas con IA. **NUNCA sacadas de internet sin licencia** — en una app de
  pago eso es infracción de derechos de autor de terceros.
- **Recomendación de arranque:** Roger graba él mismo unos pocos formatos clave
  (POV, a cámara, producto, voz en off). Pocos y buenos, con su cara → coste cero,
  sin líos de licencia, y refuerza la marca El Caimán. Ampliar después.

### 5-bis-B. Presencia en cámara (rama independiente)

Rama **separada** de la biblioteca de formatos. La biblioteca enseña *dónde
colocarte*; esta enseña *cómo comportarte una vez estás delante*:
- Gesticulación: qué hacer con las manos, cuándo moverlas.
- Postura y colocación del cuerpo.
- Cómo encuadrarte bien dentro del plano.
- Energía, mirada a cámara, ritmo corporal.

Mismo principio que la biblioteca: se enseña con ejemplos y guías (texto + clips/
imágenes de referencia con origen legal), no se construye nada que grabe o analice
el cuerpo del usuario. Abierta a ampliar.

### 5-bis-C. Teleprompter (con guión interpretado)

El guión (que ya genera el guionista) pasa por pantalla mientras el usuario se
graba, para no tener que memorizar. Velocidad ajustable. Encaja de forma natural
con los formatos de grabación. Es sencillo de construir y aporta mucho al usuario
que "no sabe empezar".

**Modulador de interpretación ("cómo lo dices").** El teleprompter no solo pasa el
texto: lo marca con indicaciones de interpretación sobre cada frase — subir el
tono, hacer una pausa, bajar la voz, más energía, un golpe de intención. Como las
anotaciones de un actor en su guión o un músico en una partitura. Detalles:

- **Lo genera el MISMO guionista que ya existe**, con la marca, la personalidad y
  las reglas ya puestas (las de `caiman-proyecto`). NO es un módulo aparte ni un
  agente nuevo: es una capa más de marcado que produce el guionista actual. La
  modulación sale de quien ya conoce la marca, no de un sistema independiente.
- **La IA propone, el usuario ajusta.** El guionista marca la interpretación
  automáticamente; el usuario puede retocarla a mano.
- **Ligado a los bloques del guión** (la estructura viral que ya se usa): el
  gancho (0-3s) pide por defecto energía alta y frase seca; la reflexión (35-45s)
  pide bajar tono y ritmo lento; el giro (20-35s) pide una pausa justo antes para
  crear tensión. Así el "cómo lo dices" refuerza el "por qué funciona", en vez de
  ser marcas aleatorias.
- **Barato de construir:** no necesita tecnología nueva, solo un prompt más afinado
  en el guionista y una forma clara de pintar las marcas en pantalla.

### 5-bis-D. Edición de vídeo — IDEA APARCADA (no construir aún)

Se deja constancia de la idea para que no se pierda, pero **no es una opción
activa todavía** y su forma está sin definir. Cuando se retome, respetar el
principio rector: guiar hacia una herramienta externa (ej. CapCut) y enseñar a
usarla — cortes, subtítulos automáticos, ritmo, música, texto en pantalla,
estructura teaser+reveal — antes que intentar construir un editor propio.
Cubre: cortes, subtítulos (clave en reels), ritmo, música, texto en pantalla.

---

---

## 5-ter. Monetización extra: tienda de accesorios (empezar por AFILIACIÓN)

Idea de negocio (agosto 2026): dentro de la app, recomendar/vender accesorios que
resuelven dolores reales del creador. Caso origen: con la cámara trasera del
iPhone (la buena) no ves el teleprompter → un **accesorio de espejo** que se pega
sobre la cámara y refleja la pantalla lo soluciona. Mismo patrón para otros
accesorios (aros de luz, trípodes, micros, soportes…).

Dos vías posibles. **Se arranca SOLO por la vía A. La B queda abierta pero no se
toca todavía.**

### Vía A — Afiliación (la que se implementa) ✅

Recomendar productos de otras marcas con un enlace de afiliado. El usuario compra
en la web de esa marca; nosotros nos llevamos una comisión. **No tocamos producto,
ni stock, ni envíos, ni devoluciones** — de lo físico se encarga la marca.
Riesgo casi cero.

- Técnicamente simple: una pantalla de recomendaciones con enlaces de afiliado.
- Sirve para **validar** si la gente compra accesorios desde la app sin arriesgar
  un euro en inventario.
- **Obligación legal (España/UE):** hay que indicar de forma visible que es un
  enlace de afiliado / publicidad. Poner etiqueta "publicidad" o "enlace afiliado".
- **Requisito real: necesita audiencia.** La afiliación y los patrocinios se pagan
  por ventas o alcance. Sin usuarios en la app ni seguidores en El Caimán, ninguna
  marca da comisiones interesantes. Esto rinde en fase avanzada (≈ Fase 5), no al
  arranque.

### Vía B — Producto propio (APARCADA, abierta para el futuro)

Fabricar/comprar el accesorio (ej. el espejo) y venderlo nosotros, quedándonos
todo el margen. Implica logística real: stock, envíos, devoluciones, atención al
cliente (o dropshipping, que quita el stock pero baja margen y control). **No se
construye ahora.** Se retomaría solo si la afiliación demuestra que un accesorio
concreto se vende mucho — entonces compensa fabricarlo y quedarse el margen.

**Orden correcto:** afiliación primero (riesgo cero, valida demanda) → producto
propio después (solo si los datos lo justifican).

---

---

## 5-quater. El ciclo completo de creación de contenido (mapa de referencia)

Análisis del proceso real (agosto 2026, contrastado con creadores y agencias). El
objetivo de la app: cubrir de la idea al vídeo publicado, TODO. El ciclo no es una
línea, es un círculo que empieza y acaba en los datos.

Leyenda: ✅ ya existe · 🆕 añadido · ❌ pendiente · ⏸ aparcado

1. Análisis de datos previos ✅ (analista) — el ciclo arranca aquí
2. Idea / ideación ✅ (director + investigador)
3. **Definir el público** ❌ — a quién le hablas (ver 5-quater-A)
4. **Packaging: título + gancho + portada** ❌ — por definir (ver 5-quater-B)
5. Guión ✅ (guionista)
6. Formatos de grabación 🆕 (5-bis-A)
7. Presencia en cámara 🆕 (5-bis-B)
8. Grabación: teleprompter + modulación 🆕 (5-bis-C)
9. Edición ⏸ (5-bis-D, aparcada)
10. **Optimización de publicación** ❌ — copy, hashtags, hora (ver 5-quater-C)
11. **Publicación / programación** ❌ (ver 5-quater-C)
12. **Repurposing** ❌ — un vídeo → varios (ver 5-quater-D)
    → y vuelta al paso 1.

**CORAZÓN vs SATÉLITES (importante para no dispersarse).** El corazón, el
diferencial que nadie más tiene, son los agentes + guión + grabación (pasos 1, 2,
5, 6, 7, 8). Lo demás son satélites que completan el círculo pero no son lo que te
distingue de Metricool/CapCut. Regla: abarcarlo todo en el PLANO sí; construirlo
todo a la vez, no. Primero el corazón funcionando, luego los satélites.

### 5-quater-A. Definir el público

Antes incluso de la idea: a quién le habla el usuario, qué le preocupa. La biblia
de marca actual tiene la personalidad pero no el público objetivo. Es poca cosa de
construir (unas preguntas guiadas → se guarda en la biblia de marca) pero cambia
todo lo demás. Lo puede llevar el mismo onboarding de identidad.

### 5-quater-B. Packaging (título + gancho + portada) — POR DEFINIR CÓMO

El hueco de más impacto y el que está totalmente descubierto. Packaging = el
sistema de promesa que hace que alguien pare el scroll y haga clic: título/gancho
+ el primer frame del vídeo. Dato del mercado: la mayoría de vídeos no fracasan por
mal tema, sino por packaging roto (título dice una cosa, portada otra, gancho
empieza en otro sitio). Y va ANTES del guión: obliga a que la idea se vuelva clara.

- **Encaja de forma natural con el guionista** (que ya hace ganchos). El título/
  gancho puede salir de ahí.
- **La portada / primer frame es lo que hay que decidir cómo se hace**, y toca los
  mismos temas de antes: generar imágenes cuesta tokens, y no se pueden coger de
  internet por derechos de autor. Opciones a valorar cuando se retome: guiar al
  usuario a elegir bien su primer frame, plantillas propias, o generación con IA.
- **Estado: idea guardada, forma por definir.** No construir hasta decidir el cómo.

### 5-quater-C. Optimización y publicación

- **Optimización:** copy del post, hashtags, descripción, hora óptima (las 20:00
  de Roger por defecto). El copy y los hashtags los puede generar el guionista/
  director con la marca ya puesta.
- **Publicación / programación:** dejar el contenido listo y programado. Publicar
  directamente en Instagram/TikTok depende de conectar sus APIs (Fase 4, la
  difícil). Hasta entonces: la app deja todo preparado y el usuario publica a mano.

### 5-quater-D. Repurposing (reaprovechar un vídeo en varios)

Un vídeo publicado no es el final, es materia prima: de uno salen cortes, otro
formato, un post para otra red, sin grabar más. Multiplica el trabajo hecho.
En modo guía/estrategia (qué sacar de cada vídeo y para dónde), no como editor que
trocea vídeo real — eso vuelve a ser CapCut. Lo puede orquestar el director/planner.

---

## 6. Arquitectura técnica (qué piezas necesita la app real)

El prototipo actual es una maqueta: simula todo, no hay nada real por detrás.
Para ser producto necesita estas capas. **No hace falta construirlas todas de
golpe** — ver el orden en la sección 7.

- **Frontend** (lo que ve el usuario): la app en sí. React/React Native o similar.
  Base: el prototipo ya hecho.
- **Backend** (el servidor): recibe peticiones, habla con la IA, guarda datos.
- **Base de datos:** cuentas de usuario, biblia de marca de cada uno, sus
  calendarios, guiones, métricas. (Sustituye a los archivos .md compartidos.)
- **Autenticación:** login, cada usuario su espacio privado.
- **Integración con la IA (los tokens):** el backend llama a la API de Claude con
  el prompt del agente correspondiente. **Aquí es donde se gasta dinero por uso**
  → por eso hace falta el sistema de créditos.
- **Sistema de créditos / límites de uso:** para que un usuario no dispare la
  factura. Cada acción de IA consume créditos; se reponen según el plan.
- **Cobro:** pasarela de pago (Stripe), suscripciones, facturas.
- **Conexión con Instagram/TikTok:** para leer métricas reales y/o publicar.
  ⚠️ La parte más difícil y lenta: las APIs de Meta y TikTok exigen permisos y
  procesos de aprobación largos. Metricool tiene un equipo entero solo para esto.
  **Dejar para el final; al principio, el usuario mete las métricas a mano.**
- **Cumplimiento legal (RGPD):** datos de usuarios europeos. Necesario antes de
  cobrar de verdad.

---

## 7. Orden de construcción, paso a paso

Regla: cada paso funciona antes de pasar al siguiente. No adelantar los tokens
ni el cobro ni Instagram hasta que toque.

**FASE 0 — Planos (aquí, sin código real). ✅ casi hecho.**
- [x] Prototipo funcional de la interfaz.
- [x] Este informe maestro.
- [ ] Afinar textos y pantallas del prototipo (opcional, se puede hacer en el chat).

**FASE 1 — App que funciona sola, con IA real, para UN usuario (tú).**
- [ ] Montar el proyecto en Claude Code sobre el repo.
- [ ] Convertir el prototipo en app funcionando de verdad.
- [ ] Conectar la API de Claude por detrás: que los agentes generen de verdad
      (guión real, plan real) en vez de mostrar datos de ejemplo.
- [ ] Cargar tu biblia de marca real (la de `caiman-proyecto`).
- [ ] Que las métricas se metan a mano (aún sin conectar Instagram).
- **Meta de fase:** tú usas la app y te genera contenido real. Aún no hay
  usuarios, ni login, ni cobro. Es tu herramienta personal funcionando.

**FASE 2 — Multiusuario.**
- [ ] Login y cuentas.
- [ ] Base de datos: cada usuario su biblia, su calendario, sus datos.
- [ ] La grabación de audio → biblia de marca funcionando de verdad.
- **Meta de fase:** un amigo puede crearse una cuenta y usarla con SU marca.

**FASE 3 — Sostenible y cobrable.**
- [ ] Sistema de créditos / límites de uso (para controlar el gasto de tokens).
- [ ] Pasarela de pago (Stripe) + planes de suscripción.
- [ ] RGPD y textos legales.
- **Meta de fase:** puedes cobrar sin perder dinero por usuario.

**FASE 4 — Conexiones reales (la difícil).**
- [ ] Conectar Instagram/TikTok para leer métricas automáticamente.
- [ ] (Opcional) publicar desde la app.
- **Meta de fase:** el analista lee las métricas solo, sin que el usuario las meta.

**BLOQUES DE PRODUCCIÓN (guía, no editores) — encajar cuando la app base funcione.**
No dependen de las fases de arriba; se pueden empezar en cuanto la Fase 1/2 ande,
porque son galerías y guías, no piezas técnicas duras.
- [ ] Biblioteca de formatos de grabación (5-bis-A). Arrancar con pocos formatos
      propios grabados por Roger. Estructura ampliable.
- [ ] Presencia en cámara (5-bis-B). Rama independiente.
- [ ] Teleprompter (5-bis-C).
- [ ] Edición de vídeo (5-bis-D): APARCADA. No construir hasta decidir la forma.

**FASE 5 — Pulir y crecer.**
- [ ] Iterar según feedback, añadir pilares/formatos, mejorar los agentes.
- [ ] Ampliar la biblioteca de formatos y la guía de presencia en cámara.
- [ ] Definir público en el onboarding (5-quater-A).
- [ ] Optimización y publicación: copy, hashtags, hora (5-quater-C).
- [ ] Repurposing en modo guía (5-quater-D).
- [ ] Packaging (5-quater-B): APARCADO hasta decidir cómo se hace la portada.
- [ ] Tienda de accesorios por afiliación (5-ter, vía A). Rinde aquí, cuando ya
      hay audiencia. Vía B (producto propio) sigue aparcada.

---

## 8. Decisión pendiente: ¿quién pone los ladrillos?

Dos caminos para construir de la Fase 1 en adelante:

- **A) Tú con Claude Code.** Ya lo usas. Puede escribir el código real, guardarlo
  en el repo, e ir puliendo día a día. Más barato, más control, curva de
  aprendizaje. Es la opción por defecto dado que ya tienes el sistema ahí.
- **B) Un desarrollador.** Más rápido y sólido para las partes delicadas (cobro,
  seguridad, APIs de Meta), pero cuesta dinero. Se puede combinar: tú avanzas con
  Claude Code y contratas puntualmente para las piezas duras (Fase 3 y 4).

**Recomendación:** empezar con A (Claude Code) hasta la Fase 2. Reevaluar en
Fase 3, porque cobro y seguridad son donde un error sale caro.

---

## 9. Instrucciones directas para Claude Code (pegar al empezar el proyecto)

> Estás ayudando a construir una app web/móvil llamada (provisional) "Tu Equipo".
> Es la versión-producto del sistema de cinco agentes de El Caimán que ya existe
> en este repo. Lee este informe entero antes de escribir código.
>
> Estamos en la FASE 1: convertir el prototipo de interfaz en una app real que,
> para un solo usuario (yo), genere contenido de verdad llamando a la API de Claude.
>
> No adelantes trabajo de fases posteriores (login, cobro, créditos, Instagram)
> hasta que te lo pida. Una cosa a la vez, y cada paso tiene que funcionar antes
> de seguir. Cuando termines un paso, dime exactamente qué has hecho, cómo
> probarlo, y cuál es el siguiente paso.
>
> Reutiliza el prototipo de interfaz existente como base visual (verde pantano +
> ámbar). Reutiliza los prompts de los cinco agentes que ya están en el repo.
>
> Cuando algo tenga coste (tokens de la API) o riesgo (seguridad, datos, pagos),
> avísame antes de hacerlo y explícame el porqué en lenguaje sencillo.

---

## 10. Recordatorio final

La app no es lo que te da los seguidores. El Caimán te da los seguidores, y los
seguidores le dan valor a la app. Constrúyela en paralelo a publicar a diario, no
en lugar de. El día que tengas audiencia, esto se vende solo.
