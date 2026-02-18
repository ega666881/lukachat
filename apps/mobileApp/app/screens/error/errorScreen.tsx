import { router } from "expo-router";

import { observer } from "mobx-react-lite";
import { Button, Image, Text, View } from "react-native";
import { useStore } from "../../../stores";
import { errorImages } from "./assets";
import errorScreenStyle from "./errorScreen.style";

function ErrorScreen() {
  const { errorStore } = useStore();
  return (
    <View style={errorScreenStyle.container}>
      <View style={{ ...errorScreenStyle.container, gap: 20 }}>
        <Image
          source={errorImages.errorPageImage}
          style={{
            width: 150,
            height: 150,
            borderRadius: 40,
            borderWidth: 2,
            borderColor: "#fff",
          }}
        />
        <Text style={errorScreenStyle.text}>Произошла ошибка</Text>
        <Text style={errorScreenStyle.text}>
          CODE: {errorStore.error.status}
        </Text>
        <Text style={errorScreenStyle.text}>Text: {errorStore.error.text}</Text>
      </View>
      <Button
        title="Вернуться на главную"
        onPress={() => router.navigate("/")}
      />
    </View>
  );
}

export default observer(ErrorScreen);
