import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, View } from "react-native";
import { authService } from "../../../services/authService";
import { useStore } from "../../../stores";
import chatListStyles from "./chatsScreen.style";
import ChatCard from "./components/chatCard";

function ChatsScreen() {
  const { chatsListStore, clientStore } = useStore();

  useEffect(() => {
    chatsListStore.getChats();
    clientStore.getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={chatListStyles.container}>
      {chatsListStore.chatsList.map((chat, key) => (
        <ChatCard chat={chat} key={key} />
      ))}
      <Button title="Выход" onPress={authService.logout} />
    </View>
  );
}

export default observer(ChatsScreen);
