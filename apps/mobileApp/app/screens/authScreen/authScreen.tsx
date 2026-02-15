import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { authStyles } from "./authScreen.style";

export default function AuthScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Авторизация", // ← Ваш заголовок
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />
      <View style={authStyles.container}>
        <Text style={authStyles.title}>Авторизация</Text>
        <View style={authStyles.formContainer}>
          <Text>Форма</Text>
        </View>
      </View>
    </>
  );
}
