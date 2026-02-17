import { observer } from "mobx-react-lite";
import { Button, View } from "react-native";
import { authService } from "../../../services/authService";
import ChatCard from "./components/chatCard";

function ChatsScreen() {
  return (
    <View>
      {["fsdfs", "132sdfsfsd", "dfsf222"].map((text, key) => (
        <ChatCard text={text} key={key} />
      ))}
      <Button title="Выход" onPress={authService.logout} />
    </View>
  );
}

export default observer(ChatsScreen);
