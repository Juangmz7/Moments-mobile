import { EventRequestDTO } from "@/domain/dto/event_request_dto";
import { EventItem } from "@/domain/entities/event_item";
import { create } from "zustand";

// This store manages events data and actions 
// It interacts with a backend API to fetch and manipulate event data

interface EventStore {
  myEvents: EventItem[];
  otherEvents: EventItem[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchMyEvents: () => Promise<void>;
  fetchOtherEvents: () => Promise<void>;
  createEvent: (data: EventRequestDTO) => Promise<void>; 
  deleteMyEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    myEvents: [],
    otherEvents: [],
    loading: false,
    error: null,

    fetchMyEvents: async () => {
        // TODO
    },

    fetchOtherEvents: async () => {
        // TODO
    },

    createEvent: async (data) => {
        // TODO
        console.log("Nuevo evento creado:", data);
    },
        
    deleteMyEvent: async (id) => {
        // TODO
    },

    // TODO: Additional actions like updateEvent, joinEvent, leaveEvent can be added here
}));
