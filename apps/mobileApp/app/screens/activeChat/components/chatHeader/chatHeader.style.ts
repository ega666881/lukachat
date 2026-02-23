import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    maxWidth: 200,
  },
});
