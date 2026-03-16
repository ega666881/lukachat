import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
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
