import { Stack } from "expo-router";
import { MenuButton } from "./sharedComponents/menuButton/menuButton";
import SearchButton from "./sharedComponents/searchButton/searchButton";
import SearchRow from "./sharedComponents/searchRow/searchRow";
import { rootStore, StoreProvider } from "./stores";
import { ThemeProvider } from "./theme/themeProvider";

function RootLayout() {
  return (
    <ThemeProvider>
      <StoreProvider value={rootStore}>
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
            name="screens/profile/profileScreen"
            options={{
              title: "Профиль",
              headerShown: false,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/menu/menuScreen"
            options={{
              title: "Меню",
              headerShown: true,
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
              headerRight: () => {
                return <SearchButton />;
              },
              title: "Чаты",
              headerBackVisible: false,
              headerStyle: { backgroundColor: "#121212" },
              headerTintColor: "#fff",
              contentStyle: { backgroundColor: "#1E1E1E" },
            }}
          />
          <Stack.Screen
            name="screens/search/search"
            options={{
              headerRight: () => {
                return <SearchRow />;
              },
              title: "Поиск",
              headerBackVisible: true,
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
