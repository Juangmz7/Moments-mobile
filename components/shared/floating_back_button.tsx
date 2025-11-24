import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type FloatingBackButtonProps = {
  onPress: () => void;
  top: number; // Safe area top inset
};

/**
 * A floating back button positioned absolutely at the top-left.
 * @param onPress - Function to execute when pressed.
 * @param top - Safe area top inset for correct positioning.
 */
export default function FloatingBackButton({
  onPress,
  top,
}: FloatingBackButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.floatingBackButton, { top: top }]}
      onPress={onPress}
    >
      <Ionicons name="arrow-back-outline" size={28} color="#333" />
    </TouchableOpacity>
  );
}

// Styles for this component
const styles = StyleSheet.create({
  floatingBackButton: {
    position: "absolute",
    left: 0,
    height: 60, // Standard header height
    justifyContent: "center",
    paddingLeft: 15,
    zIndex: 20, // Must be above sticky header
  },
});