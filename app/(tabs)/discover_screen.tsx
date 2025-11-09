import { EventFormData } from "@/components/events/event_form";
import EventList from "@/components/events/event_list";
import EventModalFormWrapper from "@/components/events/event_modal_form_wrapper";
import FilterDropdownButton from "@/components/shared/FilterDropdownButton";
import { EventMapper } from "@/domain/infrastructure/mappers/event_mapper";
import { useEventStore } from "@/store/use_event_store";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function DiscoverPage() {
    // Access to events goblal state
  const eventState = useEventStore;
  const events = eventState((state) => state.otherEvents);
  const [showForm, setShowForm] = useState(false);
    
  function handleFormSubmit(data: EventFormData) {
    eventState.getState()
        .createEvent(EventMapper.fromForm(data))
    setShowForm(false)
  }

  const filterOptions: [string, () => void][] = [
        ["Location", () => {}],
        ["Interests", () => {}],
        ["Date", () => {}],
    ]
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Discover new events</Text>
                <FilterDropdownButton
                options={filterOptions}
                />
            </View>
           <EventList
                events={events}
                paddingBottom={0}
                paddingTop={0}
                emptyComponentLabel="No events yet"
            />

            {/* Floating Add Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => {setShowForm(true)}}>
                <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>

            {/* Create Event Modal */}
            <EventModalFormWrapper
                visible={showForm}
                formLabel={"Create a Moment"}
                onClose={() => setShowForm(false)}
                onFormSubmitted={handleFormSubmit}
            />
        </View>
    );
}

// Styles for events page
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 12, marginTop: 15 },
    emptyText: { color: "#999", textAlign: "center", marginTop: 40 },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "#007AFF",
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },
    addButtonText: { color: "white", fontSize: 36, lineHeight: 36 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 12,
    },  
});
