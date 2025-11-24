import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ParticipantCardProps = {
  participantName: string;
  participantImage?: string;
  onPress: () => void;
};

/**
 * A pressable card component to display a single participant's info.
 * @param participant - The participant object (requires at least a 'name').
 * @param onPress - Function to execute when the card is pressed.
 */
export default function ParticipantCard ({
  participantName,
  onPress,
  participantImage 
}: ParticipantCardProps) {
    return (
        <TouchableOpacity style={styles.participantCard} onPress={onPress}>
            <Image 
              source={
                participantImage 
                ? {uri: participantImage} 
                : require("@/assets/images/no_user_image.jpg")
              } 
              style={styles.image} 
            />
            <Text style={styles.participantName}>{participantName}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
    );
}

// Styles for this component
const styles = StyleSheet.create({
  participantCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  participantIcon: {
    marginRight: 15,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    flex: 1, // Ensures name takes available space and pushes chevron to the end
  },
  image: {
    width: 40,         // Fixed width (small)
    height: 40,        // Fixed height (small)
    borderRadius: 20,  // Exactly half of width/height -> Circle
    marginRight: 15,   // Space between image and name
    resizeMode: 'cover', 
  }, 
});

