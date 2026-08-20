import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Oswald_600SemiBold, Oswald_700Bold } from "@expo-google-fonts/oswald";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { Portada } from "./src/pages/Portada";
import { Onboarding } from "./src/pages/Onboarding";
import { Dashboard } from "./src/pages/Dashboard";
import { colors } from "./src/theme/theme";

type Pantalla = "portada" | "onboarding" | "dashboard";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [pantalla, setPantalla] = useState<Pantalla>("portada");
  const [fontsLoaded] = useFonts({
    Oswald_600SemiBold,
    Oswald_700Bold,
    Inter_400Regular,
    Inter_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      {pantalla === "portada" && <Portada onEmpezar={() => setPantalla("onboarding")} />}
      {pantalla === "onboarding" && <Onboarding onCompletar={() => setPantalla("dashboard")} />}
      {pantalla === "dashboard" && <Dashboard />}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pantano,
  },
});
