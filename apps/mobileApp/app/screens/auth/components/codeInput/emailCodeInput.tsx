import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./emailCodeInput.style";

interface CodeInputProps {
  length?: number;
  onComplete: (code: string) => void;
  containerStyle?: object;
  code: string;
  setCode: (newValue: string) => void;
  cellStyle?: object;
  cellStyleFocused?: object;
  cellStyleFilled?: object;
  textStyle?: object;
  autoFocus?: boolean;
  disabled?: boolean;
  testID?: string;
}

const CodeInput: React.FC<CodeInputProps> = ({
  length = 6,
  onComplete,
  code,
  setCode,
  containerStyle,
  cellStyle,
  cellStyleFocused,
  cellStyleFilled,
  textStyle,
  autoFocus = true,
  disabled = false,
  testID = "code-input",
}) => {
  const [isFocused, setIsFocused] = useState(autoFocus);
  const inputRef = useRef<TextInput>(null);
  const animations = useRef<Animated.Value[]>([]);

  useEffect(() => {
    animations.current = Array.from({ length }, () => new Animated.Value(0));
  }, [length]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus, disabled]);

  const animateCell = useCallback((index: number, isActive: boolean) => {
    if (animations.current[index]) {
      Animated.timing(animations.current[index], {
        toValue: isActive ? 1 : 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, []);

  const handleTextChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/\D/g, "").slice(0, length);
      setCode(cleaned);

      animateCell(cleaned.length, true);

      if (cleaned.length === length) {
        onComplete(cleaned);
        setIsFocused(false);
        inputRef.current?.blur();
      } else if (cleaned.length < code.length) {
        animateCell(cleaned.length, true);
      }
    },
    [length, setCode, animateCell, code.length, onComplete],
  );

  const handleFocus = () => {
    setIsFocused(true);
    animateCell(code.length, true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    animateCell(code.length, false);
  };

  const clearCode = () => {
    console.log("");
    setCode("");
    console.log(code);
    setIsFocused(true);
    inputRef.current?.focus();
    animations.current.forEach((anim) => anim.setValue(0));
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < length; i++) {
      const digit = code[i] || "";
      const isCurrent = i === code.length && isFocused;
      const isFilled = !!digit;

      const animatedStyle = {
        borderColor: animations.current[i]?.interpolate({
          inputRange: [0, 1],
          outputRange: ["#E0E0E0", "#007AFF"],
        }),
      };

      cells.push(
        <Animated.View
          key={i}
          style={[
            styles.cell,
            cellStyle,
            isFilled && { ...styles.cellFilled, ...(cellStyleFilled || {}) },
            isCurrent && { ...styles.cellFocused, ...(cellStyleFocused || {}) },
            animatedStyle,
          ]}
        >
          <Text style={[styles.text, textStyle]}>{isFilled ? digit : ""}</Text>
        </Animated.View>,
      );
    }
    return cells;
  };

  return (
    <View testID={testID} style={[styles.container, containerStyle]}>
      <View style={styles.cellsContainer}>{renderCells()}</View>

      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType="number-pad"
        maxLength={length}
        editable={!disabled}
        style={styles.hiddenInput}
        autoFocus={autoFocus}
        contextMenuHidden={false}
        selectTextOnFocus
        accessibilityLabel={`Введите ${length}-значный код подтверждения`}
        accessibilityHint="Вводится автоматически при получении SMS или вручную"
      />

      {code.length > 0 && !disabled && (
        <TouchableOpacity
          onPress={clearCode}
          style={styles.clearButton}
          accessibilityLabel="Очистить код"
        >
          <Text style={styles.clearButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default observer(CodeInput);
