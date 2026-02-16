import { Text, View } from "react-native";
import chatCardStyle from "./chatCard.style";

interface ChatCardProps {
  text: string;
}

export default function ChatCard({ text }: ChatCardProps) {
  return (
    <View style={chatCardStyle.container}>
      <Text style={chatCardStyle.messageText}>{text}</Text>
    </View>
  );
}
