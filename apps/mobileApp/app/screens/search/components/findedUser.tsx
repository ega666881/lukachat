import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import User from "../../../models/user.model";
import Avatar from "../../../sharedComponents/avatar/avatar";
import { useStore } from "../../../stores";
import findedUserStyle from "./findedUser.style";

interface IFindedUserProps {
  user: User;
}

function FindedUser({ user }: IFindedUserProps) {
  const { searchStore } = useStore();
  return (
    <Pressable
      onPress={() => searchStore.createChat(user.id)}
      android_ripple={{ color: "rgba(255, 255, 255, 0.1)" }}
      style={({ pressed }) => [
        findedUserStyle.container,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={findedUserStyle.container}>
        <Avatar imageUrl={user.avatarUrl || ""} />
        <View style={findedUserStyle.chatInfoContainer}>
          <Text style={findedUserStyle.userNameText}>{user.email}</Text>
          <Text style={findedUserStyle.messageText}>Начните общение</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default observer(FindedUser);
