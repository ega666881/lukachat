/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useStore } from "../../stores";
import activeChatStyle from "./activeChat.style";
import ChatHeader from "./components/chatHeader/chatHeader";
import MessageCard from "./components/messageCard/messageCard";

function ActiveChat() {
  const { activeChatStore } = useStore();
  const navigation = useNavigation();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const inputRef = useRef<TextInput>(null);

  const { isKeyboardVisible, keyboardHeight } = useKeyboard();

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd(true);
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
    <View
      style={{
        flex: 1,
        paddingBottom: 10,
        padding: 10,
        marginBottom: isKeyboardVisible ? keyboardHeight : 10,
      }}
    >
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          padding: 10,
          marginBottom: 10,
          height: "100%",
        }}
        contentContainerStyle={activeChatStyle.container}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={scrollToBottom}
      >
        {activeChatStore.activeChat?.messages.map((message, key) => (
          <MessageCard message={message} key={key} />
        ))}
      </KeyboardAwareScrollView>
      <View style={activeChatStyle.inputContainer}>
        <TextInput
          value={activeChatStore.messageInputText}
          style={activeChatStyle.input}
          placeholder="Введите сообщение..."
          onChangeText={activeChatStore.setMessageInputText}
          multiline
          ref={inputRef}
        />
        <TouchableOpacity
          style={activeChatStyle.sendButton}
          onPress={() => {
            activeChatStore.sendMessage();
          }}
        >
          <Text style={activeChatStyle.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default observer(ActiveChat);
