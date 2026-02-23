import { Stack } from "expo-router";
import { rootStore, StoreProvider } from "../stores";
import { MenuButton } from "./sharedComponents/menuButton/menuButton";
import { ThemeProvider } from "./theme/themeProvider";

function RootLayout() {
  return (
    <ThemeProvider>
      <StoreProvider value={rootStore}>
        {/* <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? "#000000" : "#FFFFFF"}
      /> */}

        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Главная",
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/auth/authScreen"
            options={{
              title: "Авторизация",
              headerShown: false,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/chats/chatsScreen"
            options={{
              headerLeft: () => {
                return <MenuButton />;
              },
              title: "Чаты",
              headerBackVisible: false,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/activeChat/activeChat"
            options={{
              title: "Переписка",
              headerBackVisible: true,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/error/errorScreen"
            options={{
              title: "Ошибка",
              headerBackVisible: false,
              headerShown: false,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
        </Stack>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
