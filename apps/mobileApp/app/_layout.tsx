import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // ← Скрывает заголовок полностью
      }}
    >
      <Stack.Screen name="index" options={{ title: "Главная" }} />
      <Stack.Screen name="settings" options={{ title: "Настройки" }} />
    </Stack>
  );
}
