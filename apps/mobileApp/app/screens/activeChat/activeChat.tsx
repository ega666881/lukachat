/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../../../stores";
import activeChatStyle from "./activeChat.style";
import ChatHeader from "./components/chatHeader/chatHeader";
import MessageCard from "./components/messageCard/messageCard";

function ActiveChat() {
  const { activeChatStore } = useStore();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    //@ts-ignore
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

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
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10, marginBottom: 10 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      enabled={true}
    >
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={activeChatStyle.container}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={scrollToBottom}
      >
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
        {/* {activeChatStore.activeChat?.messages.map((message, key) => (
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
        ))} */}
      </ScrollView>
      <View style={activeChatStyle.inputContainer}>
        <TextInput
          style={activeChatStyle.input}
          placeholder="Введите сообщение..."
          multiline
        />
        <TouchableOpacity style={activeChatStyle.sendButton}>
          <Text style={activeChatStyle.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default observer(ActiveChat);
