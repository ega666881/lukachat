import { EvilIcons } from "@expo/vector-icons";

import { router } from "expo-router";
import { observer } from "mobx-react-lite";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./searchButton.style";

const SearchButton: React.FC = () => {
  return (
    <TouchableOpacity
      onPress={() => router.navigate("/screens/search/search")}
      style={styles.container}
      activeOpacity={0.7}
    >
      <EvilIcons name="search" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default observer(SearchButton);
