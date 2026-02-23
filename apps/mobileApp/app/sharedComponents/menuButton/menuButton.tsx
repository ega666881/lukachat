import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./menuButton.style";

interface MenuButtonProps {
  onPress?: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => {
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
