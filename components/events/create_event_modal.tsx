import { Modal, View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import EventForm, { EventFormData } from "./event_form";

export default function CreateEventModal(
{
    visible,
    onClose,
    onFormSubmitted,
    initialValues
}:
{
    visible: boolean;
    onClose: () => void;
    onFormSubmitted: (data: EventFormData) => void;
    initialValues?: EventFormData; // Optional initial values for editing existing event
}
 ) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        // Safe area for iOS devices
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContainer}>
            <EventForm
                initialValues={initialValues}
                onFormSubmitted={(data: EventFormData) => onFormSubmitted(data)}
                onClose={onClose}
                visible={visible}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  modalContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    maxHeight: "85%",
  },
});

