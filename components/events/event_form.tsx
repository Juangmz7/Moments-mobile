import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, StyleSheet } from "react-native";

// Define the structure of the event form data
export interface EventFormData {
  title: string;
  description: string;
  image?: string;
  interests?: string;
  city: string;
  placeName: string;
  startDate: string;
  endDate: string;
}

// Form component for creating a new event
export default function EventForm({
  visible,
  onClose,
  onFormSubmitted,
  initialValues
}:
{
  visible: boolean,                          
  onClose: () => void,                       
  onFormSubmitted: (data: EventFormData) => void
  initialValues?: EventFormData;                 
}
) {
    // Local state for form fields
  const [form, setForm] = useState<EventFormData>(
    initialValues ?? // Use initial values if provided for editing an event that already exists
    {
      title: "",
      description: "",
      image: "",
      interests: "",
      city: "",
      placeName: "",  
      startDate: "",
      endDate: "",
  });

  // Handle form submission received from the parent
  const handleSave = () => {
    if (!form.title.trim()) return; 
    onFormSubmitted(form);          
    setForm({                       
      title: "",
      description: "",
      image: "",
      interests: "",
      city: "",
      placeName: "",
      startDate: "",
      endDate: "",
    });
    onClose();                      
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Create a Moment</Text>

          <TextInput
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Image (optional)"
            value={form.image}
            onChangeText={(text) => setForm({ ...form, image: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Interests"
            value={form.interests}
            onChangeText={(text) => setForm({ ...form, interests: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={form.city}
            onChangeText={(text) => setForm({ ...form, city: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Place Name"
            value={form.placeName}
            onChangeText={(text) => setForm({ ...form, placeName: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Start Date"
            value={form.startDate}
            onChangeText={(text) => setForm({ ...form, startDate: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="End Date"
            value={form.endDate}
            onChangeText={(text) => setForm({ ...form, endDate: text })}
            style={styles.input}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!form.title.trim()}
            >
              <Text
                style={[
                  styles.saveButton,
                  !form.title.trim() && { color: "#aaa" },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Styles for the modal and form
const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        width: "85%",
        borderRadius: 16,
        padding: 20,
        marginBottom: 100,
    },
    modalHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    formButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    cancelButton: { color: "#555", fontSize: 16 },
    saveButton: { color: "#007AFF", fontWeight: "bold", fontSize: 16 },
});
