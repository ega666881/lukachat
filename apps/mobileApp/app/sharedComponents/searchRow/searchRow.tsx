import { observer } from "mobx-react-lite";
import { TextInput, View } from "react-native";
import { useStore } from "../../stores";
import searchRowStyle from "./searchRow.style";

function SearchRow() {
  const { searchStore } = useStore();

  const onChange = (text: string) => {
    searchStore.setSearchEmail(text);
    searchStore.search();
  };

  return (
    <View style={searchRowStyle.inputContainer}>
      <TextInput
        style={searchRowStyle.input}
        placeholder="Введите email"
        onChangeText={onChange}
      />
    </View>
  );
}

export default observer(SearchRow);
