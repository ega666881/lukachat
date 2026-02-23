import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import Chat from "../../../../models/chat.model";
import { useStore } from "../../../../stores";
import Avatar from "../../../sharedComponents/avatar/avatar";
import chatCardStyle from "./chatCard.style";

interface ChatCardProps {
  chat: Chat;
}

export default function ChatCard({ chat }: ChatCardProps) {
  const { activeChatStore } = useStore();
  const { chatUsers, messages } = chat;
  const text = messages[0]?.text;
  const onPress = () => {
    activeChatStore.setActiveChat(chat);
    router.navigate("/screens/activeChat/activeChat");
  };

  if (!text || !chatUsers) {
    return <></>;
  }
  const renderUser = chatUsers.find((chatUser) => {
    if (chatUser.isSelf === false) {
      return chatUser;
    }
  });
  if (!renderUser) {
    return <></>;
  }
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
      style={({ pressed }) => [
        chatCardStyle.container,
        { opacity: pressed ? 0.7 : 1 }, // Легкое затемнение при нажатии
      ]}
    >
      <View style={chatCardStyle.container}>
        <Avatar imageUrl={renderUser.avatarUrl || ""} />
        <View style={chatCardStyle.chatInfoContainer}>
          <Text style={chatCardStyle.userNameText}>{renderUser.email}</Text>
          <Text style={chatCardStyle.messageText}>{text}</Text>
        </View>
      </View>
    </Pressable>
  );
}
