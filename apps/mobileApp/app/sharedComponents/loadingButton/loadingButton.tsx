import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import styles from "./loadingButton.style";

interface LoadingButtonProps {
  title: string;
  onPress: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const LoadingButton = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: LoadingButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (isLoading || disabled) && styles.buttonDisabled,
        isLoading && styles.loadingButton,
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <View style={styles.loadingContent}>
          <ActivityIndicator color="#fff" size="small" />
          <Text style={styles.loadingText}>Отправка...</Text>
        </View>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
