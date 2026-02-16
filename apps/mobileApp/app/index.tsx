import { Redirect } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";

function HomeScreen() {
  const { clientStore } = useStore();

  return clientStore.isLogin ? (
    <Redirect href="/screens/chats/chatsScreen" />
  ) : (
    <Redirect href="/screens/auth/authScreen" />
  );
}

export default observer(HomeScreen);
