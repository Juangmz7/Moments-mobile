import Toast from "react-native-root-toast";

export function showMessage(message: string) {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: "#2e64e5",
    textColor: "#fff",
  });
}
