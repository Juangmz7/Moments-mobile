import Toast from "react-native-root-toast";

/**
 * Displays an error toast message with a consistent style.
 * Use this for API errors, validation issues, or failed actions.
 */
export function showErrorMessage(message: string) {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM - 80, // slightly higher for visibility
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: "#ef4444", // Tailwind red-500
    textColor: "#ffffff",
    opacity: 0.95,
  });
}
