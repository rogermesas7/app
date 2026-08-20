import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AgentCard } from "../components/AgentCard";
import { AGENTES } from "../data/mockData";
import { colors, fonts } from "../theme/theme";

type PortadaProps = {
  onEmpezar: () => void;
};

export function Portada({ onEmpezar }: PortadaProps) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.titulo}>
          No contrates a nadie.{"\n"}
          <Text style={styles.tituloAmbar}>Aquí tienes tu equipo.</Text>
        </Text>
        <Text style={styles.subtitulo}>
          Cinco agentes de IA que conocen tu marca y trabajan coordinados:
          estrategia, tendencias, guiones, calendario y análisis.
        </Text>
      </View>

      <View style={styles.grid}>
        {AGENTES.map((agente) => (
          <AgentCard key={agente.nombre} nombre={agente.nombre} funcion={agente.funcion} />
        ))}
      </View>

      <Pressable style={styles.boton} onPress={onEmpezar}>
        <Text style={styles.botonTexto}>Empezar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.pantano,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
    gap: 40,
  },
  header: {
    maxWidth: 480,
    alignItems: "center",
    gap: 12,
  },
  titulo: {
    fontFamily: fonts.rotuloBold,
    fontSize: 32,
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.texto,
    lineHeight: 40,
  },
  tituloAmbar: {
    color: colors.ambar,
  },
  subtitulo: {
    fontFamily: fonts.cuerpo,
    fontSize: 15,
    textAlign: "center",
    color: colors.textoTenue,
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    maxWidth: 640,
    width: "100%",
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
