import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { AGENTES } from "../data/mockData";
import { colors, fonts } from "../theme/theme";

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
    setTimeout(() => setPaso("desplegando"), 1400);
  }

  return (
    <View style={styles.container}>
      {paso === "grabar" && (
        <PasoGrabar
          grabando={grabando}
          grabacionLista={grabacionLista}
          onAlternar={alternarGrabacion}
          onContinuar={continuar}
        />
      )}
      {paso === "generando" && <PasoGenerando />}
      {paso === "desplegando" && <PasoDesplegando onCompletar={onCompletar} />}
    </View>
  );
}

function PasoGrabar({
  grabando,
  grabacionLista,
  onAlternar,
  onContinuar,
}: {
  grabando: boolean;
  grabacionLista: boolean;
  onAlternar: () => void;
  onContinuar: () => void;
}) {
  const pulso = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!grabando) {
      pulso.setValue(1);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, { toValue: 0.6, duration: 500, useNativeDriver: true }),
        Animated.timing(pulso, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [grabando, pulso]);

  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>Cuéntanos quién eres</Text>
      <Text style={styles.parrafo}>
        Graba un audio corto contando tu marca: quién eres, de qué hablas y a
        quién le hablas. Con eso tu equipo arma tu biblia de marca.
      </Text>

      <Pressable onPress={onAlternar}>
        <Animated.View
          style={[
            styles.botonGrabar,
            { backgroundColor: grabando ? "#ef4444" : colors.ambar, opacity: pulso },
          ]}
        >
          <Text style={[styles.botonGrabarTexto, { color: grabando ? "#fff" : colors.pantano }]}>
            {grabando ? "Grabando…" : "Grabar"}
          </Text>
        </Animated.View>
      </Pressable>

      {grabacionLista && !grabando && <Text style={styles.avisoListo}>Grabación lista.</Text>}

      <Pressable
        onPress={onContinuar}
        disabled={!grabacionLista}
        style={[styles.botonSecundario, !grabacionLista && styles.botonSecundarioDisabled]}
      >
        <Text style={styles.botonSecundarioTexto}>Continuar</Text>
      </Pressable>
    </View>
  );
}

function PasoGenerando() {
  const rotacion = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotacion, { toValue: 1, duration: 900, useNativeDriver: true })
    );
    anim.start();
    return () => anim.stop();
  }, [rotacion]);

  const rotate = rotacion.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={styles.centro}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]} />
      <Text style={styles.tituloMedio}>Extrayendo tu biblia de marca…</Text>
    </View>
  );
}

function PasoDesplegando({ onCompletar }: { onCompletar: () => void }) {
  return (
    <View style={styles.centro}>
      <Text style={styles.titulo}>
        Desplegando tu <Text style={{ color: colors.ambar }}>equipo</Text>
      </Text>
      <View style={styles.listaAgentes}>
        {AGENTES.map((agente, i) => (
          <AgenteFila key={agente.nombre} nombre={agente.nombre} delay={i * 150} />
        ))}
      </View>
      <Pressable style={styles.boton} onPress={onCompletar}>
        <Text style={styles.botonTexto}>Entrar al panel</Text>
      </Pressable>
    </View>
  );
}

function AgenteFila({ nombre, delay }: { nombre: string; delay: number }) {
  const opacidad = useRef(new Animated.Value(0)).current;
  const traslado = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacidad, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(traslado, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, [opacidad, traslado, delay]);

  return (
    <Animated.View
      style={[
        styles.filaAgente,
        { opacity: opacidad, transform: [{ translateY: traslado }] },
      ]}
    >
      <Text style={styles.check}>✓</Text>
      <Text style={styles.nombreAgente}>{nombre}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pantano,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  centro: {
    alignItems: "center",
    gap: 24,
    maxWidth: 420,
  },
  titulo: {
    fontFamily: fonts.rotuloBold,
    fontSize: 26,
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.texto,
  },
  tituloMedio: {
    fontFamily: fonts.rotulo,
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.textoTenue,
  },
  parrafo: {
    fontFamily: fonts.cuerpo,
    fontSize: 14,
    textAlign: "center",
    color: colors.textoTenue,
    lineHeight: 20,
  },
  botonGrabar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  botonGrabarTexto: {
    fontFamily: fonts.rotulo,
    fontSize: 13,
    textTransform: "uppercase",
  },
  avisoListo: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.ambar,
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  botonSecundarioDisabled: {
    opacity: 0.3,
  },
  botonSecundarioTexto: {
    fontFamily: fonts.rotulo,
    fontSize: 14,
    textTransform: "uppercase",
    color: colors.texto,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.ambar,
    borderTopColor: "transparent",
  },
  listaAgentes: {
    width: "100%",
    gap: 12,
  },
  filaAgente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.pantanoLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  check: {
    color: colors.ambar,
  },
  nombreAgente: {
    fontFamily: fonts.cuerpoMedio,
    fontSize: 14,
    color: colors.texto,
  },
  boton: {
    backgroundColor: colors.ambar,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  botonTexto: {
    fontFamily: fonts.rotulo,
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.pantano,
    letterSpacing: 0.5,
  },
});
