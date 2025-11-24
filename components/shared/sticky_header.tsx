import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EventItem } from "@/domain/model/entities/events/event_item";

type StickyHeaderProps = {
  event: EventItem
  topInset: number;
  opacity: Animated.AnimatedInterpolation<string | number>;
};

/**
 * An animated sticky header that fades in on scroll.
 * @param event - The event object (requires 'title').
 * @param topInset - Safe area top inset value for correct padding.
 * @param opacity - Animated value to control header opacity.
 */
export default function StickyHeader({
  event,
  topInset,
  opacity,
}: StickyHeaderProps) {
  return (
    <Animated.View
      style={[
        styles.stickyHeader,
        // Apply dynamic styles for height, padding, and opacity
        { height: topInset + 60, paddingTop: topInset, opacity: opacity },
      ]}
    >
      <View style={styles.stickyHeaderContent}>
        <View style={styles.stickyIconCircle}>
          <Ionicons name="tennisball-outline" size={24} color="#007AFF" />
        </View>
        <Text style={styles.stickyTitle}>{event.title}</Text>
      </View>
    </Animated.View>
  );
}

// Styles for this component
const styles = StyleSheet.create({
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
  },
  stickyHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stickyIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stickyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});