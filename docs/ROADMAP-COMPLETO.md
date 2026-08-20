# ROADMAP COMPLETO — Anexo técnico al Informe Maestro

> Este documento **no sustituye** a `INFORME-MAESTRO.md`, lo complementa. Ahí
> está el qué y el porqué del producto; aquí está **todo lo operativo que hay
> que tocar para que la app llegue a existir y se pueda cobrar por ella**,
> desglosado en tareas concretas, con las cuentas/servicios a dar de alta en
> cada fase y los "no se nos pase" que se olvidan en casi todos los proyectos.
>
> Es el checklist oficial del proyecto: nada de lo que necesita la app para
> estar completa se queda fuera de aquí.
>
> Fecha: agosto 2026. Revisado y reorganizado en las 6 fases de trabajo
> acordadas (+ una 7ª para redes sociales, que no encajaba en ninguna de las
> seis — ver nota en la sección 0).

---

## 0. Cómo leer este documento

- Trabajamos por fases, en este orden, **sin pasar a la siguiente sin
  aprobación explícita**:
  1. **Maqueta y diseño** — pantallas y flujos, con datos de ejemplo.
  2. **Funciones reales** — conectar la IA de verdad, que los botones hagan
     cosas de verdad.
  3. **Cuentas y accesos** — login, usuarios, **y el paquete legal mínimo**
     (ver nota abajo).
  4. **Cobro** — créditos/suscripción, pasarela de pago.
  5. **Legal** — el resto del trabajo legal, el pesado y formal.
  6. **Lanzamiento** — dominio, hosting, publicar.
  7. **Conexiones sociales** (Instagram/TikTok) — fuera del camino
     crítico, no bloquea el lanzamiento (ver nota abajo).
- Cada fase tiene tres bloques: **Construir**, **Cuentas/servicios a crear**
  y **No se nos pase**.
- No hace falta crear una cuenta o servicio antes de que su fase lo pida.
  Dar de alta Stripe en la Fase 1, por ejemplo, es tiempo perdido.
- Aviso: las partes legales y fiscales de este documento son un **mapa de
  qué mirar**, no asesoría legal ni fiscal. Antes de cobrar de verdad,
  confírmalo con un gestor/abogado — sale más barato que un error.

**Dos decisiones ya tomadas (agosto 2026), aplicadas en todo el documento:**

1. **Paquete legal mínimo adelantado a la Fase 3.** Cosas como firmar el DPA
   de Anthropic, publicar un aviso de privacidad básico, el aviso de "esto
   lo genera una IA" y el flujo de borrar/exportar datos no esperan a la
   Fase 5 — tienen que existir en cuanto haya una sola persona real usando
   la app que no seas tú. La Fase 5 sigue existiendo para el trabajo legal
   completo y formal (textos definitivos, IVA/OSS, fichas de las tiendas,
   seguros).
2. **Instagram/TikTok tiene fase propia y no bloquea nada.** Se mueve fuera
   del camino crítico, a una Fase 7 después del lanzamiento. Mientras tanto
   —y para siempre, si hiciera falta— la app funciona con métricas metidas
   a mano (ya construido en la Fase 2).

---

## 1. Stack técnico recomendado

Pediste una recomendación, así que aquí va una concreta (se puede discutir,
pero es un punto de partida sólido y barato para una sola persona construyendo
con Claude Code):

| Pieza | Recomendación | Por qué |
|---|---|---|
| **Frontend móvil** | React Native + Expo (TypeScript) | El prototipo ya es `.jsx`/React → migración natural. Expo da compilación en la nube (EAS Build) sin pelearte con Xcode/Android Studio, y un único código para iOS y Android. |
| **Backend** | Node.js + TypeScript (Fastify o Express) | Mismo lenguaje que el frontend → un solo cerebro mental. Fácil de alojar barato. |
| **Base de datos + Auth + Storage** | Supabase (Postgres) | Te da base de datos, login y almacenamiento de archivos en un solo sitio, con opción de región UE (bueno para RGPD), y tiene plan gratuito para la Fase 1-2. |
| **IA** | API de Claude (Anthropic), directa | Es lo que ya usan tus agentes. Mirar Zero Data Retention / Bedrock Frankfurt cuando llegue el RGPD real (ver Fase 3/5). |
| **Pagos** | RevenueCat por encima de StoreKit (iOS) + Google Play Billing (Android) + Stripe (web) | Unifica las tres pasarelas de pago de suscripción en un solo sitio; evita reconstruir la lógica de suscripciones tres veces. Investigarlo bien antes de decidir (ver Fase 4, es la pieza con más matices legales). |
| **Hosting backend** | Railway o Render | Despliegue simple desde Git, barato para empezar, escala si hace falta. |
| **Build y publicación móvil** | EAS Build + EAS Submit (Expo) | Compila y sube a App Store/Play Store sin máquina Mac propia. |
| **Email transaccional** | Resend, Postmark o similar, con dominio propio | Confirmaciones de cuenta, recibos, recuperación de contraseña. Sin esto, los emails automáticos de Supabase caen fácilmente en spam. |
| **Errores en producción** | Sentry | Gratis para volumen bajo, imprescindible en cuanto haya un usuario real que no seas tú. |
| **Analítica de producto** | PostHog (self-host o cloud EU) | Para saber qué pantallas se usan y dónde se atasca la gente. Con opción de hosting en la UE. |
| **CI/CD** | GitHub Actions | Tests y build automáticos en cada cambio. |

Nada de esto es definitivo ni caro: casi todo tiene capa gratuita suficiente
para la Fase 1 y 2.

> **Nota de estado (agosto 2026):** la maqueta de la Fase 1 ya arrancada en
> este repo (`frontend/`) está montada en **web con Vite + React**, no en
> Expo/React Native como recomienda esta tabla. Es una decisión pendiente de
> confirmar contigo: seguir en web (más rápido de iterar, pero sin tiendas de
> apps) o migrar a Expo antes de entrar en la Fase 2, ya que cambiar de stack
> a mitad de la Fase 2 (con backend real ya conectado) sale más caro que
> decidirlo ahora.

---

## 2. FASE 1 — Maqueta y diseño

Pantallas y flujos, con datos de ejemplo. Sin backend real, sin llamadas a
la API de Claude todavía. **Es donde estamos.**

**Construir**
- [ ] Revisar el prototipo (`prototipo-caiman.jsx`) y decidir qué pantallas se
      llevan tal cual y cuáles se rediseñan (los componentes web no son 1:1
      con los de móvil si se migra a React Native).
- [ ] Elegir nombre definitivo de la app y comprobar que el dominio y el
      handle de redes están libres (evita descubrirlo en la Fase 4).
- [ ] Bocetar (aunque sea en texto) las pantallas nuevas de 5-bis
      (formatos de grabación, presencia en cámara, teleprompter).
- [x] Portada, Onboarding (simulado) y Dashboard (Semana/Guión/Análisis) con
      datos de ejemplo — hecho en `frontend/` (web, Vite + React).
- [ ] Decidir si se mantiene web o se migra a Expo/React Native (ver nota de
      la sección 1) antes de pasar a la Fase 2.

**Cuentas/servicios a crear**
- [x] Repositorio Git (`rogermesas7/app`).
- [ ] Cuenta de Anthropic Console + método de pago, para tener ya la API key
      lista en cuanto arranque la Fase 2.
- [ ] Cuenta Expo/EAS (gratis para empezar) — solo si se confirma migración
      a React Native.

**No se nos pase**
- [ ] Comprobar que el nombre elegido no choca con una marca registrada
      (búsqueda rápida en la OEPM/EUIPO si se va a registrar marca más adelante).

---

## 3. FASE 2 — Funciones reales

Conectar la IA de verdad: que los botones hagan cosas de verdad. Sigue
siendo para un solo usuario (tú) — todavía sin login ni multiusuario.

**Construir**
- [ ] Backend mínimo: un endpoint por agente (`/director`, `/investigador`,
      `/guionista`, `/planner`, `/analista`) que reciba el contexto y llame a
      la API de Claude con el prompt correspondiente.
- [ ] Portar los 5 prompts de sistema desde `caiman-proyecto` al backend.
- [ ] Portar tu `marca.md`, `banco-ideas.md`, `calendario.md`, `learnings.md`
      reales como contexto fijo (aún sin base de datos multiusuario).
- [ ] Pantalla para meter métricas a mano (sustituye a la conexión con
      Instagram/TikTok, que es Fase 7, y no bloquea nada mientras tanto).
- [ ] Variables de entorno para la API key de Claude (nunca hardcodeada, nunca
      en el frontend — todas las llamadas a la IA pasan por tu backend).
- [ ] Manejo de errores básico: qué ve el usuario si la API de Claude falla o
      tarda (spinner, reintento, mensaje claro — nada de pantalla en blanco).

**Cuentas/servicios a crear**
- [ ] Servicio de hosting del backend (Railway/Render), plan gratuito o el
      más barato.

**No se nos pase**
- [ ] Un `.env.example` en el repo (sin secretos reales) para no perder la
      lista de variables necesarias.
- [ ] Límite manual "duro" en el código a la cantidad de llamadas a la API
      mientras seas el único usuario — un bug en un bucle puede disparar el
      gasto de tokens en minutos, y aquí todavía no hay sistema de créditos
      que lo frene.
- [ ] Protección básica contra prompt injection: separar bien la instrucción
      de sistema de cada agente de lo que mete el usuario como entrada libre.

---

## 4. FASE 3 — Cuentas y accesos (+ paquete legal mínimo)

Aquí es donde la app pasa de "solo tú" a tener usuarios reales — por eso
entra también el paquete legal mínimo: en cuanto hay una persona real
distinta de ti usando la app, ya aplica el RGPD, así que no puede esperar a
la Fase 5.

**Construir**
- [ ] Login (email/contraseña +, si quieres, Google/Apple Sign-In — Apple
      *exige* ofrecer "Sign in with Apple" si ofreces otros logins sociales
      en una app de iOS).
- [ ] Modelo de datos por usuario: tabla de biblia de marca, calendario,
      banco de ideas, guiones, métricas, learnings.
- [ ] Migrar los 4 `.md` compartidos a filas de base de datos por usuario.
- [ ] Onboarding real: grabación de audio → transcripción → extracción de
      biblia de marca (aquí decides si la transcripción la hace Claude
      directamente con audio o pasas por un servicio de speech-to-text antes).
- [ ] Aislamiento de datos entre usuarios (que el usuario A nunca pueda leer
      nada del usuario B — revisar las reglas de acceso a la base de datos,
      no solo el frontend).
- [ ] **Borrado de cuenta autoservicio, dentro de la propia app.** No es solo
      buena práctica RGPD: es un requisito de la App Store desde 2022
      (guideline 5.1.1(v)) — el usuario tiene que poder borrar su cuenta él
      mismo, borrado real (no "desactivar"), y si usas Sign in with Apple hay
      que revocar el token vía su API al borrar.
      [Fuente (Apple Developer)](https://developer.apple.com/support/offering-account-deletion-in-your-app)
- [ ] Protección anti-bot en el registro (captcha o equivalente) — sin esto,
      el sistema de créditos gratuitos (Fase 4) es un imán para abuso.

**Paquete legal mínimo (adelantado desde la Fase 5)**
- [ ] Firmar el DPA (Acuerdo de Tratamiento de Datos) de Anthropic desde la
      Consola antes de procesar datos personales de usuarios reales.
      [Fuente (compound.law, 2026)](https://compound.law/en-DE/tools/anthropic-api/)
- [ ] Publicar una Política de Privacidad básica (aunque se amplíe en la
      Fase 5) y un Aviso Legal mínimo.
- [ ] Aviso claro de "esto lo genera una IA" en el producto — adelanto de la
      obligación de transparencia del Reglamento de IA de la UE (ver Fase 5).
- [ ] Flujo real de "borra mis datos" y "descárgame mis datos" (derechos
      RGPD), no solo una frase en la política de privacidad.
- [ ] Tratar el audio de la biblia de marca con cuidado extra: documentar
      cuánto tiempo se guarda y por qué, aunque el objetivo no sea identificar
      a la persona.

**Cuentas/servicios a crear**
- [ ] Proyecto Supabase (o el gestor de base de datos que elijas) en
      producción, idealmente con región UE.
- [ ] Sentry, para empezar a ver errores reales de gente que no eres tú.

**No se nos pase**
- [ ] Copias de seguridad de la base de datos activadas desde el primer día
      con usuarios reales (Supabase las ofrece, pero hay que confirmarlas).
- [ ] Rate limiting por usuario (que uno no pueda saturar tu backend/factura
      de IA aunque aún no haya créditos de pago).

---

## 5. FASE 4 — Cobro

**Antes de nada en esta fase: alta como autónomo o sociedad ante Hacienda.**
Facturar sin estar dado de alta solo es legal si la actividad es esporádica
y por debajo del SMI — una suscripción recurrente no cumple ninguna de las
dos condiciones. Además, no se puede abrir cuenta de empresa en Stripe,
RevenueCat, ni el Apple Developer Program de pago sin este trámite hecho
antes. [Fuente (nnespana.es, 2026)](https://www.nnespana.es/blog/negocios-empresas/autonomos/puedo-emitir-una-factura-sin-antes-darme-de-alta-como-autonomo-esto-es-lo-que-dice-la-ley)

### 5.1 Sistema de créditos

**Construir**
- [ ] Definir cuánto "cuesta" en créditos cada acción de IA (un guión, un
      análisis, una investigación de tendencias) en función del coste real
      en tokens de cada agente.
- [ ] Contador de créditos por usuario + reposición según plan.
- [ ] Aviso al usuario cuando se queda sin créditos, con opción clara de
      ampliar/esperar a la reposición.

### 5.2 Pagos y tiendas de apps — **la pieza más delicada, léela entera**

Esto cambió de forma importante en 2026 y afecta directamente a tu decisión
de "Stripe sí o no":

- **Apple (App Store, UE):** desde 2026 Apple permite dirigir a los usuarios
  de la UE a un cobro externo (Stripe, por ejemplo) en vez de su compra
  dentro de la app, pero con condiciones: es una decisión de todo o nada (si
  usas pago externo, no puedes también ofrecer compra dentro de la app en la
  misma app), exige firmar un anexo específico de Apple, pedir un permiso
  técnico especial (`external-purchase-link`), mostrar una pantalla de aviso
  que impone Apple sin poder personalizarla, y aun así Apple se queda una
  comisión (12% si renuncias a sus servicios adicionales, 20% si los
  mantienes) sobre lo que factures fuera. A eso se suma la comisión de
  Stripe. Es decir: **usar Stripe en iOS no es gratis ni sencillo**, solo es
  posible. [Fuente (ecorpit.com, 2026)](https://ecorpit.com/ios-eu-external-purchase-links-storekit-guide-2026/)
- **Google Play:** desde el 30 de junio de 2026, tanto la compra dentro de la
  app como el pago externo para suscripciones se quedan en general en torno
  al 10% + una comisión de facturación adicional si usas el sistema de pago
  de Google (sobre un ~15% total), con trato igual para desarrolladores de la
  UE, EEUU y Reino Unido. [Fuente (Play Console Help, 2026)](https://support.google.com/googleplay/android-developer/answer/16954621?hl=en)
- **Conclusión práctica:** para no reconstruir la lógica de suscripciones
  tres veces (iOS, Android, web) y no meterte en el lío del "todo o nada" de
  Apple sin necesidad, la ruta más simple para empezar suele ser: compra
  nativa dentro de la app en iOS y Android (vía un gestor tipo RevenueCat que
  unifica StoreKit + Google Play Billing), y Stripe solo si en algún momento
  añades una versión web de pago fuera de las tiendas. **Esto hay que
  decidirlo cuando llegue esta fase, no antes** — las reglas de las tiendas
  cambian con frecuencia, así que reconfirmar en ese momento en vez de fiarte
  de esta nota.

**Construir**
- [ ] Definir los planes (qué incluye cada nivel de suscripción, cuántos
      créditos, precio).
- [ ] Integrar el gestor de pagos elegido (RevenueCat/StoreKit/Play Billing
      y/o Stripe).
- [ ] Pantalla de facturación: ver plan actual, cambiar de plan, cancelar.
- [ ] **Cancelación tan fácil como la contratación** — en la UE es
      obligatorio (Directiva de derechos del consumidor): si te suscribes con
      un clic, cancelar también debe ser un proceso simple, no una llamada o
      un email escondido.
- [ ] Email transaccional con dominio propio funcionando (recibos,
      confirmaciones de pago) — ver stack, sección 1.

**Cuentas/servicios a crear**
- [ ] Alta como autónomo o sociedad (ver aviso al inicio de esta fase).
- [ ] Cuenta de desarrollador de Apple (Apple Developer Program, de pago
      anual).
- [ ] Cuenta de desarrollador de Google Play (pago único).
- [ ] Cuenta de Stripe y/o RevenueCat, según lo decidido en 5.2.
- [ ] Gestoría/asesoría fiscal si aún no la tienes.

**No se nos pase**
- [ ] Email de soporte real y monitorizado (no un buzón que nadie mira) —
      Apple y Google lo piden visible en la ficha de la app.
- [ ] Política de reembolsos clara antes de la primera venta.

---

## 6. FASE 5 — Legal

El resto del trabajo legal: lo que no era urgente para la Fase 3 pero sí
para vender de verdad y publicar en las tiendas.

**Construir**
- [ ] Ampliar a versión definitiva la Política de Privacidad, Términos y
      Condiciones, y Aviso Legal (obligatorio en España por la LSSI si hay
      actividad comercial) — que los revise alguien con criterio legal antes
      de publicarlos.
- [ ] Cláusula específica sobre el contenido generado por IA en los
      Términos: quién es dueño del guión que genera el guionista, y que el
      usuario asume la responsabilidad de verificar antes de publicar (esto
      conecta directo con la Regla de Oro 0-bis del Informe Maestro: si la
      app avisa de que puede haber errores, los Términos tienen que decir lo
      mismo por escrito).
- [ ] Decidir si la API de Claude se llama en directo (EEUU, exige
      documentar la transferencia internacional con las cláusulas contractuales
      tipo que ya incluye el DPA) o vía una región UE si lo necesitas por
      volumen/cliente sensible.
- [ ] Revisar la política de uso comercial de Anthropic (branding, límites de
      reventa) al pasar a facturar de verdad, no solo el DPA firmado en Fase 3.
- [ ] Base legal del tratamiento de datos documentada (registro de
      actividades de tratamiento completo, aunque con menos de 250 empleados
      no siempre sea obligatorio, es buena práctica y te cubre).
- [ ] Auditar/completar el cumplimiento del Reglamento de IA de la UE
      (empieza a aplicarse en agosto de 2026): como "proveedor" de un sistema
      de IA que envuelve un modelo de terceros, tu obligación principal es de
      **transparencia** (ya adelantada en la Fase 3) — aquí se revisa que
      esté completa. No es previsible que la app entre en la categoría de
      "alto riesgo".
      [Fuente (dev.to/disclos, 2026)](https://dev.to/disclos/what-the-eu-ai-act-actually-requires-from-saas-startups-before-2-august-2026-pia)
- [ ] **Accesibilidad (Reglamento Europeo de Accesibilidad, EAA):** en vigor
      desde junio de 2025, con supervisión activa desde 2026. No tengo
      certeza total de si esta app entra en su alcance obligatorio estricto
      (los sectores que lista de forma explícita son más concretos: banca,
      e-commerce, transporte, telecos, ebooks), pero en cuanto exista la
      tienda de accesorios por afiliación (e-commerce), el argumento de que
      aplique se refuerza. Confírmalo con un abogado; mientras tanto, apuntar
      a WCAG 2.1 AA es buena práctica de todos modos.
      [Fuente (accessible.org, 2026)](https://accessible.org/saas-companies-europe-eaa-prepare/)
- [ ] IVA de servicios digitales a consumidores UE (régimen OSS/One Stop
      Shop): al vender suscripciones digitales a particulares de la UE hay
      que aplicar el IVA del país del cliente y declararlo. **Esto
      confírmalo con un gestor** — es de las cosas que más dinero cuestan si
      se hacen mal y no se arregla con un commit.
- [ ] Valorar un seguro de responsabilidad civil/cyber antes del lanzamiento
      público (opcional, pero habitual en cuanto hay cobro real).

**No se nos pase**
- [ ] Ficha de privacidad de la app ("App Privacy" de Apple / sección de
      seguridad de datos de Google Play): hay que rellenarla con precisión,
      es un motivo frecuente de rechazo si no coincide con lo que la app
      realmente hace.

---

## 7. FASE 6 — Lanzamiento

**Construir**
- [ ] Beta cerrada antes del lanzamiento público (TestFlight en iOS, canal
      de pruebas internas en Google Play) para pillar fallos con gente real
      antes de publicar de verdad.
- [ ] Ficha de tienda (ASO): icono, capturas de pantalla, descripción,
      palabras clave.
- [ ] Dominio propio, DNS, hosting de producción (subir de plan gratuito si
      hace falta por tráfico real).
- [ ] Publicación en App Store y Google Play.

**Cuentas/servicios a crear**
- [ ] PostHog (o la analítica elegida) para saber qué pantallas se usan y
      dónde abandona la gente.

**No se nos pase**
- [ ] Confirmar que todo lo de la Fase 5 (fichas de privacidad, textos
      legales, IVA) está publicado y no solo escrito, antes de enviar a
      revisión de las tiendas.

---

## 8. FASE 7 — Conexiones sociales (Instagram/TikTok)

**No bloquea el lanzamiento.** Se puede trabajar en paralelo si sobra tiempo,
pero no impide pasar a la Fase 6 ni publicar la app: mientras tanto (y para
siempre, si hace falta) la app funciona con métricas metidas a mano, ya
construido en la Fase 2.

Confirmado con fuentes de 2026, y es tan largo como avisa el Informe Maestro:

- **Instagram (Meta Graph API):** hace falta pasar primero la Verificación
  de Empresa de Meta (documentación de empresa), y solo después se puede
  pedir la revisión de la app ("App Review") — pedirla antes es el error más
  común. Hay que publicar política de privacidad en tu propio dominio,
  añadir URL de borrado de datos, justificar por escrito cada permiso (por
  ejemplo `instagram_manage_insights`) y grabar vídeos de demostración con
  una cuenta Instagram Business/Creator real (no de prueba) mostrando el
  flujo completo. Una vez aprobado, ya no hay límite por cliente.
  [Fuente (singhamandeep.com, 2026)](https://singhamandeep.com/instagram-api-advanced-access-approval/)
- **TikTok (Content Posting API):** se puede registrar la app y probar en
  modo privado desde el principio, pero **publicar en público requiere pasar
  la auditoría de TikTok** — hasta entonces, todo lo que publiques por API
  queda en modo privado/solo-tú. Hay que incluir un aviso de contenido
  comercial (toggle de "contenido de marca/patrocinado").
  [Fuente (netrows.com, 2026)](https://www.netrows.com/blog/tiktok-content-posting-api-guide-2026)

**Construir**
- [ ] Flujo de conexión de cuentas (OAuth) de Instagram y TikTok desde el
      perfil del usuario.
- [ ] Lectura de métricas reales para alimentar al analista.
- [ ] (Opcional, más adelante) publicación directa desde la app.

**Cuentas/servicios a crear**
- [ ] Meta Developer Account + Verificación de Empresa.
- [ ] TikTok for Developers Account.

**No se nos pase**
- [ ] Presupuestar tiempo de espera real de aprobación en el plan del
      proyecto — no depende de ti, depende de Meta/TikTok.

---

## 9. Bloques de producción (5-bis) — checklist técnico

No dependen de una fase concreta del cobro/legal — son galerías y guías, no
piezas técnicas duras. Se pueden empezar en cuanto la Fase 1/2 ande.

- [ ] **Biblioteca de formatos:** modelo de datos simple (formato → lista de
      imágenes/clips + texto guía), panel para que Roger suba/gestione el
      contenido sin tocar código (aunque sea un panel muy básico).
- [ ] **Presencia en cámara:** mismo patrón de datos que la biblioteca,
      contenido independiente.
- [ ] **Teleprompter:** componente de scroll de texto a velocidad ajustable +
      capa de marcado de interpretación (pausas, énfasis) generada por el
      guionista — decidir el formato de esas marcas (ej. una sintaxis simple
      tipo `[pausa]`, `[+energía]`) para que el guionista las genere y el
      teleprompter las pinte.
- [ ] Confirmar origen legal de cada imagen/clip de referencia antes de
      subirla (grabado por Roger / stock con licencia / generado por IA) —
      revisar uno por uno, no en bloque.

---

## 10. Después del lanzamiento — pulir y crecer

Trabajo continuo, no una fase con final:

- [ ] Canal de feedback de usuarios (aunque sea un formulario o un email).
- [ ] Panel propio (aunque sea interno) para ver uso real: qué agente se usa
      más, dónde abandona la gente el onboarding, tasa de cancelación.
- [ ] Ampliar formatos y guías de presencia en cámara con datos de qué pide
      la gente.
- [ ] Definir público objetivo en onboarding (5-quater-A del informe).
- [ ] Packaging (5-quater-B): retomar solo cuando se decida el "cómo" de la
      portada/primer frame.
- [ ] Repurposing en modo guía (5-quater-D).
- [ ] Tienda de accesorios por afiliación (5-ter vía A): pantalla de
      recomendaciones + enlaces de afiliado, con etiqueta visible de
      "publicidad" o "enlace de afiliado" (obligación legal en España/UE) —
      y en cuanto exista, revisar si activa la aplicación estricta del EAA
      (ver Fase 5).

---

## 11. Checklist "que no se nos pase" — seguridad y calidad transversal

Cosas que no pertenecen a una fase concreta sino que hay que vigilar siempre:

- [ ] **Prompt injection:** el usuario mete texto/audio libre (identidad de
      marca, ideas). Un usuario malicioso podría intentar manipular el
      prompt para que el agente ignore sus instrucciones. Vale la pena
      revisar cómo se separa la instrucción del sistema de la entrada del
      usuario en cada llamada.
- [ ] **Moderación de contenido generado:** aunque el riesgo es bajo (guiones
      de marketing, no chat abierto), conviene un filtro básico para que
      ningún agente genere contenido ilegal u ofensivo si alguien lo fuerza.
- [ ] **Gestión de secretos:** API keys nunca en el repo ni en el frontend;
      variables de entorno en el servicio de hosting, rotarlas si se filtran.
- [ ] **Tests automáticos mínimos** antes de cada fase nueva, al menos en lo
      crítico (login, cobro, generación de contenido).
- [ ] **Accesibilidad básica** en la app (tamaños de texto, contraste —
      el verde muy oscuro + ámbar hay que revisarlo con un chequeo de
      contraste real; ver también EAA en Fase 5).
- [ ] **Plan de qué pasa si Anthropic tiene una caída** — mensaje de error
      claro al usuario, no una app que parece rota.
- [ ] **Versión y registro de cambios** del repo, aunque sea informal, para
      poder rastrear qué cambió cuando algo se rompe.

---

## 12. Resumen: qué cuenta/servicio se crea en cada fase

| Fase | Cuentas/servicios nuevos |
|---|---|
| 1 — Maqueta y diseño | Repo Git (hecho), Anthropic Console, Expo/EAS (si se confirma React Native) |
| 2 — Funciones reales | Hosting backend (Railway/Render) |
| 3 — Cuentas y accesos | Supabase (o BD elegida), Sentry |
| 4 — Cobro | Alta autónomo/sociedad, Apple Developer Program, Google Play Developer, Stripe y/o RevenueCat, gestoría fiscal |
| 5 — Legal | (mayormente ya cubiertas en Fase 3-4; aquí se cierra el DPA/textos definitivos, posible seguro) |
| 6 — Lanzamiento | PostHog u otra analítica, dominio |
| 7 — Conexiones sociales | Meta Developer Account + Verificación de Empresa, TikTok for Developers |

---

## 13. Recordatorio

Este roadmap es una foto de agosto de 2026: las reglas de las tiendas de
apps y la normativa (RGPD, Reglamento de IA de la UE, EAA) cambian. Antes de
ejecutar cualquier punto de la Fase 4 (cobro), la Fase 5 (legal) o la Fase 7
(Instagram/TikTok), vale la pena una comprobación rápida de que sigue
vigente tal cual está escrito aquí.
