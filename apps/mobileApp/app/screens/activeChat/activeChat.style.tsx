import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    gap: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#79848f",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 21,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#121212",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    color: "white",
    textAlignVertical: "center",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
