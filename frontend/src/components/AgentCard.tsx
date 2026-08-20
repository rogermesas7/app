import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme/theme";

type AgentCardProps = {
  nombre: string;
  funcion: string;
};

export function AgentCard({ nombre, funcion }: AgentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.funcion}>{funcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    flexGrow: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.pantanoLight,
    padding: 16,
  },
  nombre: {
    fontFamily: fonts.rotulo,
    fontSize: 16,
    color: colors.ambar,
    letterSpacing: 0.3,
  },
  funcion: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.textoTenue,
    marginTop: 4,
    lineHeight: 18,
  },
});
