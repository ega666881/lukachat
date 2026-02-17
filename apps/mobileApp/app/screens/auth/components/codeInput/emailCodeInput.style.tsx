import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  cellsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8, // Для новых версий RN, иначе используйте marginRight в ячейке
  },
  cell: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cellFilled: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F9FF",
  },
  cellFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    textAlign: "center",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    top: -100, // Чтобы не перекрывал ячейки
  },
  clearButton: {
    position: "absolute",
    right: -24,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  clearButtonText: {
    fontSize: 24,
    color: "#888",
    lineHeight: 24,
  },
});
