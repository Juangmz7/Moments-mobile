import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  /** The strings to be displayed in the chip list */
  data: string[];
  /** The list orientation. Defaults to 'horizontal'. */
  orientation?: "horizontal" | "vertical";
  /** The main color for the chips (e.g., '#007AFF'). If not provided, uses the default gray style. */
  color?: string;
};

/**
 * A read-only component that displays a list of "chips"
 * horizontally or vertically, with an optional theme color.
 */
export default function ScrollableChipList({
  data,
  orientation = "horizontal",
  color,
}: Props) {
  const isHorizontal = orientation === "horizontal";
  const isThemed = color != null; // If a color was passed

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item}-${index}`}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        isHorizontal ? styles.containerHorizontal : styles.containerVertical,
      ]}
      renderItem={({ item }) => {
        // Dynamic styles based on the 'color' prop
        const chipStyle = [
          styles.chip,
          isThemed
            ? { backgroundColor: color, borderColor: color } // Themed style
            : styles.chipDefault, // Default style (gray)
        ];
        
        const labelStyle = [
          styles.label,
          isThemed 
            ? styles.labelThemed // White text
            : styles.labelDefault, // Dark text
        ];

        return (
          <View style={chipStyle}>
            <Text style={labelStyle}>{item}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  containerHorizontal: {
    gap: 8, // Gap between horizontal chips
    paddingHorizontal: 16,
  },
  containerVertical: {
    gap: 8, // Gap between vertical chips
    paddingHorizontal: 0, // Vertical padding is handled by the parent
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipDefault: {
    backgroundColor: "#F2F4F7", // Gray (like your inactive chip)
    borderColor: "#E5E7EB",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  labelDefault: {
    color: "#344054", // Dark text
  },
  labelThemed: {
    color: "#FFFFFF", // White text (for colored backgrounds)
  },
});