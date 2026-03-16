import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { View } from "react-native";
import { useStore } from "../../stores";
import chatListStyles from "./chatsScreen.style";
import ChatCard from "./components/chatCard";

function ChatsScreen() {
  const { chatsListStore, clientStore, activeChatStore } = useStore();

  useEffect(() => {
    clientStore.getUser();
    chatsListStore.getChats();
    if (activeChatStore.activeChat) {
      activeChatStore.setActiveChat(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={chatListStyles.container}>
      {chatsListStore.chatsList.map((chat, key) => (
        <ChatCard chat={chat} key={key} />
      ))}
    </View>
  );
}

export default observer(ChatsScreen);
