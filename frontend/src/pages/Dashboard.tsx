import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SEMANA, GUION_DEL_DIA, ANALISIS_VIDEOS } from "../data/mockData";
import { colors, fonts } from "../theme/theme";

type Pestana = "semana" | "guion" | "analisis";

const PESTANAS: { id: Pestana; etiqueta: string }[] = [
  { id: "semana", etiqueta: "Semana" },
  { id: "guion", etiqueta: "Guión" },
  { id: "analisis", etiqueta: "Análisis" },
];

export function Dashboard() {
  const [pestana, setPestana] = useState<Pestana>("semana");

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Tu panel</Text>
        <Text style={styles.subtitulo}>Datos de ejemplo — Fase 1, aún sin conectar a tus redes</Text>
      </View>

      <View style={styles.tabs}>
        {PESTANAS.map((t) => {
          const activa = pestana === t.id;
          return (
            <Pressable
              key={t.id}
              onPress={() => setPestana(t.id)}
              style={[styles.tab, activa ? styles.tabActiva : styles.tabInactiva]}
            >
              <Text style={[styles.tabTexto, { color: activa ? colors.pantano : colors.textoTenue }]}>
                {t.etiqueta}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {pestana === "semana" && <PestanaSemana />}
      {pestana === "guion" && <PestanaGuion />}
      {pestana === "analisis" && <PestanaAnalisis />}
    </ScrollView>
  );
}

function PestanaSemana() {
  return (
    <View style={styles.lista}>
      {SEMANA.map((d) => (
        <View key={d.dia} style={styles.tarjeta}>
          <View style={styles.filaEntreDia}>
            <Text style={styles.diaTitulo}>{d.dia}</Text>
            {d.tendencia && (
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>Tendencia</Text>
              </View>
            )}
          </View>
          <Text style={styles.diaPilar}>
            {d.pilar} · <Text style={{ color: colors.textoTenue }}>{d.tipo}</Text>
          </Text>
          <Text style={styles.diaNota}>{d.notaDirector}</Text>
        </View>
      ))}
    </View>
  );
}

function PestanaGuion() {
  return (
    <View style={styles.lista}>
      <View style={{ alignItems: "center", gap: 4 }}>
        <Text style={styles.diaEtiqueta}>{GUION_DEL_DIA.dia}</Text>
        <Text style={styles.guionTema}>{GUION_DEL_DIA.tema}</Text>
      </View>

      {GUION_DEL_DIA.bloques.map((b) => (
        <View key={b.rango} style={[styles.tarjeta, styles.filaBloque]}>
          <Text style={styles.bloqueRango}>{b.rango}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.bloqueNombre}>{b.nombre}</Text>
            <Text style={styles.bloqueFuncion}>{b.funcion}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.subtituloSeccion}>4 opciones de gancho</Text>
      {GUION_DEL_DIA.ganchos.map((g, i) => (
        <OpcionGancho key={i} indice={i + 1} texto={g} />
      ))}
    </View>
  );
}

function OpcionGancho({ indice, texto }: { indice: number; texto: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <Pressable style={styles.tarjeta} onPress={() => setAbierto((v) => !v)}>
      <Text style={styles.opcionTitulo}>{abierto ? "▾" : "▸"} Opción {indice}</Text>
      {abierto && <Text style={styles.opcionTexto}>{texto}</Text>}
    </Pressable>
  );
}

function PestanaAnalisis() {
  return (
    <View style={styles.lista}>
      {ANALISIS_VIDEOS.map((v) => (
        <View key={v.titulo} style={styles.tarjeta}>
          <View style={styles.filaEntreDia}>
            <Text style={styles.videoTitulo}>{v.titulo}</Text>
            <Text style={styles.videoRetencion}>{v.retencion}% retención</Text>
          </View>
          <Text style={styles.videoViews}>{v.views.toLocaleString("es-ES")} views</Text>
          <Text style={styles.videoBloque}>
            <Text style={{ fontFamily: fonts.cuerpoMedio, color: colors.texto }}>Bloque que falló: </Text>
            {v.bloqueFallo}
          </Text>
          <Text style={styles.videoOrden}>{v.ordenAnalista}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.pantano,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 20,
    alignItems: "stretch",
  },
  header: {
    alignItems: "center",
    gap: 4,
  },
  titulo: {
    fontFamily: fonts.rotuloBold,
    fontSize: 22,
    textTransform: "uppercase",
    color: colors.texto,
  },
  subtitulo: {
    fontFamily: fonts.cuerpo,
    fontSize: 11,
    textTransform: "uppercase",
    color: colors.textoMuyTenue,
    letterSpacing: 0.3,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  tab: {
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  tabActiva: {
    backgroundColor: colors.ambar,
  },
  tabInactiva: {
    backgroundColor: colors.pantanoLight,
  },
  tabTexto: {
    fontFamily: fonts.rotulo,
    fontSize: 13,
    textTransform: "uppercase",
  },
  lista: {
    gap: 12,
  },
  tarjeta: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borde,
    backgroundColor: colors.pantanoLight,
    padding: 14,
    gap: 4,
  },
  filaEntreDia: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  diaTitulo: {
    fontFamily: fonts.rotulo,
    fontSize: 13,
    textTransform: "uppercase",
    color: colors.ambar,
    letterSpacing: 0.3,
  },
  badge: {
    backgroundColor: "rgba(224, 168, 46, 0.2)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeTexto: {
    fontFamily: fonts.cuerpo,
    fontSize: 10,
    color: colors.ambarSoft,
  },
  diaPilar: {
    fontFamily: fonts.cuerpo,
    fontSize: 14,
    color: colors.texto,
  },
  diaNota: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.textoTenue,
    lineHeight: 18,
  },
  diaEtiqueta: {
    fontFamily: fonts.cuerpo,
    fontSize: 11,
    textTransform: "uppercase",
    color: colors.textoMuyTenue,
  },
  guionTema: {
    fontFamily: fonts.rotulo,
    fontSize: 16,
    color: colors.texto,
    textAlign: "center",
  },
  filaBloque: {
    flexDirection: "row",
    gap: 14,
  },
  bloqueRango: {
    fontFamily: fonts.rotuloBold,
    fontSize: 13,
    color: colors.ambar,
    width: 56,
  },
  bloqueNombre: {
    fontFamily: fonts.cuerpoMedio,
    fontSize: 14,
    color: colors.texto,
  },
  bloqueFuncion: {
    fontFamily: fonts.cuerpo,
    fontSize: 12,
    color: colors.textoTenue,
  },
  subtituloSeccion: {
    fontFamily: fonts.rotulo,
    fontSize: 13,
    textTransform: "uppercase",
    color: colors.textoTenue,
    marginTop: 8,
  },
  opcionTitulo: {
    fontFamily: fonts.cuerpoMedio,
    fontSize: 14,
    color: colors.texto,
  },
  opcionTexto: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.textoTenue,
    marginTop: 6,
  },
  videoTitulo: {
    fontFamily: fonts.cuerpoMedio,
    fontSize: 14,
    color: colors.texto,
    flexShrink: 1,
  },
  videoRetencion: {
    fontFamily: fonts.rotuloBold,
    fontSize: 13,
    color: colors.ambar,
  },
  videoViews: {
    fontFamily: fonts.cuerpo,
    fontSize: 11,
    color: colors.textoMuyTenue,
  },
  videoBloque: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.textoTenue,
    marginTop: 4,
  },
  videoOrden: {
    fontFamily: fonts.cuerpo,
    fontSize: 13,
    color: colors.textoTenue,
  },
});
