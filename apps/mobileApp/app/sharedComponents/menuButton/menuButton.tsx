import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./menuButton.style";

interface MenuButtonProps {
  onPress?: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = () => {
  const onPress = () => {
    router.navigate("/screens/menu/menuScreen");
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Ionicons name="menu-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );
};
