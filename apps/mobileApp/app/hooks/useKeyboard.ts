import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventListener } from "react-native";

export const useKeyboard = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShow: KeyboardEventListener = (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    };

    const keyboardWillHide: KeyboardEventListener = () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      keyboardWillShow,
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardWillHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
};
