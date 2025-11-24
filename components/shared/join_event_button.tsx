import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type JoinButtonProps = {
  onPress: () => void;
};

/**
 * A floating action button (FAB) for joining an event.
 * @param onPress - Function to execute when pressed.
 */
export default function JoinEventButton({ onPress }: JoinButtonProps) {
  return (
    <TouchableOpacity style={styles.joinButton} onPress={onPress}>
      <Text style={styles.joinButtonText}>Join</Text>
    </TouchableOpacity>
  );
}

// Styles for this component
const styles = StyleSheet.create({
  joinButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007AFF",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  joinButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});