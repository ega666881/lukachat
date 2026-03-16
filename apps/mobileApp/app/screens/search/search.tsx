import { observer } from "mobx-react-lite";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useStore } from "../../stores";
import FindedUser from "./components/findedUser";
import searchStyle from "./search.style";

function SearchScreen() {
  const { searchStore } = useStore();
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        padding: 10,
        marginBottom: 10,
        height: "100%",
      }}
      contentContainerStyle={searchStyle.container}
      keyboardShouldPersistTaps="handled"
    >
      {searchStore.findedUsers.map((user, key) => (
        <FindedUser user={user} key={key} />
      ))}
    </KeyboardAwareScrollView>
  );
}

export default observer(SearchScreen);
