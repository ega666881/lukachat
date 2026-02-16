import { observer } from "mobx-react-lite";
import { Text, TextInput, View } from "react-native";
import { useStore } from "../../../stores";
import authStyles from "./authScreen.style";

function AuthScreen() {
  const { authFormStore } = useStore();
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Авторизация</Text>
      <View style={authStyles.formContainer}>
        <Text style={authStyles.formText}>Введите ваш Email</Text>
        <TextInput
          style={authStyles.input}
          placeholder="Email"
          value={authFormStore.email}
          onChangeText={authFormStore.setEmail}
        ></TextInput>
      </View>
    </View>
  );
}

export default observer(AuthScreen);
