import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <>
        <StatusBar hidden={true} />

        <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                statusBarHidden: true,
              }}
          />
          <Stack.Screen
              name="movies/[id]"
              options={{
                headerShown: false,
                statusBarHidden: false,
              }}
          />
        </Stack>
      </>
    </SafeAreaView>
  );
}
