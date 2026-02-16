import { View } from "react-native";
import ChatCard from "./components/chatCard";

export default function ChatsScreen() {
  return (
    <View>
      {["fsdfs", "132sdfsfsd", "dfsf222"].map((text, key) => (
        <ChatCard text={text} key={key} />
      ))}
    </View>
  );
}
