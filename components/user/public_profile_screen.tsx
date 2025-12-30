import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Interfaz para los datos que esperamos recibir de un usuario desconocido
export interface PublicUserProps {
  displayName: string;
  username: string; // subtitle
  interests: string[];
  bio?: string;
  languages?: string[];
  nationality?: string[];
  city?: string;
  country?: string;
}

// Sub-componente para las secciones estáticas (siempre visibles)
const ReadOnlySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  if (!children) return null; // Si no hay info, no renderizamos la cajita

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
};

export default function PublicProfileScreen({ user }: { user: PublicUserProps }) {
  // Inicial para el avatar
  const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : "?";

  // Formatear ubicación si existe
  const locationText = [user.city, user.country].filter(Boolean).join(", ");

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Avatar Area */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>

        {/* Basic Info */}
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.subtitle}>{user.username}</Text>
        {locationText ? <Text style={styles.location}>{locationText}</Text> : null}

        {/* Interests Chips */}
        {user.interests && user.interests.length > 0 && (
          <>
            <Text style={styles.label}>Interests</Text>
            <View style={styles.chipsRow}>
              {user.interests.map((tag) => (
                <View key={tag} style={styles.chip}>
                  <Text style={styles.chipText}>{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Info Sections (Always Expanded) */}
        <ReadOnlySection title="Bio">
          <Text style={styles.bodyText}>
            {user.bio || "This user hasn't written a bio yet."}
          </Text>
        </ReadOnlySection>

        <ReadOnlySection title="Languages">
          <Text style={styles.bodyText}>
            {user.languages || "Not specified"}
          </Text>
        </ReadOnlySection>

        <ReadOnlySection title="Nationality">
          <Text style={styles.bodyText}>
            {user.nationality || "Not specified"}
          </Text>
        </ReadOnlySection>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { padding: 20, paddingBottom: 40 },
  
  // Avatar
  avatarWrapper: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
  },

  // Text Info
  name: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280", // Gray 500
    textAlign: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },

  // Interests
  label: { 
    fontWeight: "600", 
    marginTop: 8, 
    marginBottom: 8, 
    color: "#374151",
    fontSize: 16 
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 24 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e3edf7",
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { 
    color: "#0066cc",
    fontWeight: "500"
  },

  // Sections (Static Cards)
  section: {
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    overflow: "hidden",
    // Sombra suave para dar efecto de tarjeta
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f3f4f6", // Un gris muy claro para diferenciar el header
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: { 
    fontWeight: "600",
    fontSize: 15,
    color: "#374151"
  },
  sectionBody: { 
    padding: 16 
  },
  bodyText: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
  }
});