import { observer } from "mobx-react-lite";
import { Text, View } from "react-native";
import Message from "../../../../../models/message.model";
import { useStore } from "../../../../../stores";
import messageCardStyle from "./messageCard.style";

interface MessageCardProps {
  message: Message;
}

function MessageCard({ message }: MessageCardProps) {
  const { clientStore } = useStore();
  const messagePositionStyle =
    message.userId === clientStore.user?.id
      ? messageCardStyle.containerRight
      : messageCardStyle.containerLeft;

  return (
    <View style={{ ...messageCardStyle.container, ...messagePositionStyle }}>
      <Text>{message.text}</Text>
    </View>
  );
}

export default observer(MessageCard);
