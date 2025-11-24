import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import EventDateInfo from "./event_date_info";

type EventHeaderCardProps = {
  event: {
    title: string;
    description: string;
    eventImage?: string
  };
  startDate: string
  endDate: string
  city: string
  location: string
};

/**
 * Displays the main event details card at the top of the scroll view.
 */
export default function EventHeaderCard({
  event,
  startDate,
  endDate, 
  city,
  location
}: EventHeaderCardProps) {
  return (
    <View style={[styles.card, styles.headerCard]}>
        {/* Wrapper View for the image */}
      {/* <View style={styles.imageContainer}> */}
        <Image 
          source={
            event.eventImage 
            ? {uri: event.eventImage} 
            : require("@/assets/images/no_event_image.jpg")
          } 
          style={styles.roundImage} 
        />
      {/* </View> */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Event date info component */}
      <EventDateInfo
        city={city}
        location={location}
        startDate={startDate} 
        endDate={endDate}
      />

      <View style={styles.divider} />

      {/* Fixed: Added missing 'style' prop */}
      <Text style={styles.description}>{event.description}</Text>
    </View>
  );
}

// Styles for this component
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerCard: {
    marginTop: 60, // Provides space for the floating back button
    alignItems: "center",
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "90%",
    marginVertical: 15,
    alignSelf: "center",
  },

  roundImage: {
    width: '80%',       // Ocupa todo el ancho de la tarjeta
    height: 180,         // Altura fija para buen aspecto
    borderRadius: 80,    // Bordes redondeados suaves
    resizeMode: 'cover', // La imagen llena el espacio sin deformarse
    marginBottom: 20,
  },
});