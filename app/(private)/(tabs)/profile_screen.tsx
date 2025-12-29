import { useProfilePage } from "@/hooks/user/use_profile_page";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Section = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
};

export default function ProfileScreen() {
  const {
    displayName,
    subtitle,
    interests,
    isEditOpen,
    editUserName,
    editNationality,
    editLanguages,
    editAge,
    editCity,
    editCountry,
    editInterests,
    setEditUserName,
    setEditNationality,
    setEditLanguages,
    setEditAge,
    setEditCity,
    setEditCountry,
    setEditInterests,
    handleCloseEdit,
    handleSubmitEdit,
    languagesText,
    nationalityText,
    bioText,
    handleEditProfile,
    handleLogout,
  } = useProfilePage();

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
        </View>

        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Interests</Text>
        <View style={styles.chipsRow}>
          {interests.map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
            </View>
          ))}
        </View>

        <Section title="Bio" defaultOpen={false}>
          <Text>{bioText}</Text>
        </Section>

        <Section title="Languages" defaultOpen={false}>
          <Text>{languagesText}</Text>
        </Section>

        <Section title="Nationality" defaultOpen={false}>
          <Text>{nationalityText}</Text>
        </Section>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={isEditOpen} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.editOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <View style={styles.editContainer}>
            <Text style={styles.editTitle}>Edit Profile</Text>
            <ScrollView
              style={styles.editScroll}
              contentContainerStyle={styles.editScrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.fieldLabel}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={editUserName}
                onChangeText={setEditUserName}
              />

              <Text style={styles.fieldLabel}>Nationality</Text>
              <TextInput
                style={styles.input}
                placeholder="Nationality"
                value={Array.isArray(editNationality) ? editNationality.join(", ") : editNationality}
                onChangeText={setEditNationality}
              />

              <Text style={styles.fieldLabel}>Languages</Text>
              <TextInput
                style={styles.input}
                placeholder="Languages (comma separated)"
                value={editLanguages}
                onChangeText={setEditLanguages}
              />

              <Text style={styles.fieldLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={editAge}
                onChangeText={setEditAge}
              />

              <Text style={styles.fieldLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                value={editCity}
                onChangeText={setEditCity}
              />

              <Text style={styles.fieldLabel}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={editCountry}
                onChangeText={setEditCountry}
              />

              <Text style={styles.fieldLabel}>Interests</Text>
              <TextInput
                style={styles.input}
                placeholder="Interests (comma separated, e.g. SPORTS)"
                value={editInterests}
                onChangeText={setEditInterests}
              />
            </ScrollView>

            <View style={styles.editFooter}>
              <View style={styles.editButtonsRow}>
                <TouchableOpacity
                  style={[styles.editButton, styles.editCancelButton]}
                  onPress={handleCloseEdit}
                >
                  <Text style={styles.editButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editButton, styles.editSaveButton]}
                  onPress={handleSubmitEdit}
                >
                  <Text style={[styles.editButtonText, styles.editSaveButtonText]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { padding: 20, paddingBottom: 40 },
  name: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#0066cc",
    marginRight: 8,
  },
  buttonText: { textAlign: "center", color: "#fff" },
  label: { fontWeight: "600", marginTop: 8, marginBottom: 8 },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e3edf7",
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { color: "#0066cc" },
  section: {
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#e3edf7",
  },
  sectionTitle: { fontWeight: "600" },
  sectionBody: { padding: 16 },
  avatarWrapper: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  // Modified avatar styles
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
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#d9534f",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  editOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  editContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  editTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  editScroll: {
    flex: 1,
  },
  editScrollContent: {
    paddingBottom: 16,
  },
  editFooter: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  editButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  editCancelButton: {
    backgroundColor: "#e5e7eb",
  },
  editSaveButton: {
    backgroundColor: "#0066cc",
  },
  editButtonText: {
    color: "#111827",
    fontWeight: "600",
    textAlign: "center",
  },
  editSaveButtonText: {
    color: "#ffffff",
  },
});