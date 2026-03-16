import * as ImagePicker from "expo-image-picker";
import { observer } from "mobx-react-lite";
import { Button, View } from "react-native";
import { authService } from "../../services/authService";

const pickImage = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
  // Запрашиваем разрешения
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Нужен доступ к галерее!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1], // Опционально: квадратное кадрирование
    quality: 0.8, // Сжатие (0-1)
  });

  if (!result.canceled && result.assets?.[0]) {
    return result.assets[0];
  }
  return null;
};

function MenuScreen() {
  return (
    <View style={{ flex: 1, gap: 30 }}>
      <Button title="Поменять аватарку" onPress={pickImage} />
      <Button title="Выход" onPress={authService.logout} />
    </View>
  );
}

export default observer(MenuScreen);
