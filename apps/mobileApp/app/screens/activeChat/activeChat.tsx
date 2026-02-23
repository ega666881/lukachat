/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect } from "react";
import { ScrollView, View } from "react-native";
import { useStore } from "../../../stores";
import activeChatStyle from "./activeChat.style";
import ChatHeader from "./components/chatHeader/chatHeader";
import MessageCard from "./components/messageCard/messageCard";

function ActiveChat() {
  const { activeChatStore } = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    activeChatStore.getChat();
  }, []);

  useLayoutEffect(() => {
    if (activeChatStore.opponentUser && activeChatStore.opponentUser.email) {
      navigation.setOptions({
        headerTitle: () => (
          <ChatHeader
            email={activeChatStore.opponentUser!.email!}
            avatarUrl={activeChatStore.opponentUser?.avatarUrl ?? null}
          />
        ),
      });
    }
  }, [activeChatStore.activeChat]);

  return (
    <View style={{ height: 300, flex: 1, padding: 10 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={activeChatStyle.container}
        showsVerticalScrollIndicator={false}
      >
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
      </ScrollView>
    </View>
  );
}

export default observer(ActiveChat);
