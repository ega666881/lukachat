import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, View } from "react-native";
import { authService } from "../../../services/authService";
import { useStore } from "../../../stores";
import ChatCard from "./components/chatCard";

function ChatsScreen() {
  const { chatsListStore, errorStore } = useStore();

  useEffect(() => {
    chatsListStore.getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      {chatsListStore.chatsList.map((chat, key) => (
        <ChatCard text={chat.messages[0].text} key={key} />
      ))}
      <Button title="Выход" onPress={authService.logout} />
      <Button
        title="Ошибка"
        onPress={() => {
          errorStore.setError({ status: 502, text: "fdsfsdfsd" });
          router.navigate("/screens/error/errorScreen");
        }}
      />
    </View>
  );
}

export default observer(ChatsScreen);
