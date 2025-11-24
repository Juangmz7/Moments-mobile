import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dateParser } from "@/shared/utils/date_parser_util";

// This component currently displays static data as the 'date' prop was unused.
// It can be refactored to accept props if dynamic data is needed.

/**
 * Displays formatted date, time, and location info for an event.
 */
export default function EventDateInfo({
  startDate,
  endDate,
  city,
  location
} : {
  startDate: string
  endDate: string
  city: string
  location: string
} ) { 
  const formattedStartDate = dateParser(startDate)
  const formattedEndDate = dateParser(endDate)

  return (
    <View style={styles.dateBox}>
      <View style={styles.dateRow}>
        <Ionicons name="calendar-outline" size={16} color="#666" />
        <Text style={styles.dateBoxText}>
          {formattedStartDate.dayName.substring(0, 3)},{' '}
          {formattedStartDate.month.substring(0, 3)} {formattedStartDate.day},{' '} 
          {formattedStartDate.year}
        </Text>
      </View>
      <View style={styles.dateRow}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.dateBoxText}>{formattedStartDate.time} — {formattedEndDate.time}</Text>
      </View>
      <View style={styles.dateRow}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.dateBoxText}>{location}, {city}</Text>
      </View>
    </View>
  );
};

// Styles for this component
const styles = StyleSheet.create({
  dateBox: {
    width: "65%", // Consider using a more flexible width
    backgroundColor: "#F7F8FA",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
    gap: 5,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateBoxText: {
    fontSize: 14,
    color: "#666",
  },
});

