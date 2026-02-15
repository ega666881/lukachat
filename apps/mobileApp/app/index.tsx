import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const handleClick = () => {
    router.push("/screens/authScreen/authScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <Button title="Авторизация" onPress={() => handleClick()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
