import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#808080",
    minHeight: 100,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  chatInfoContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  userNameText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  messageText: {
    color: "#6F806B",
    fontSize: 13,
  },
});
