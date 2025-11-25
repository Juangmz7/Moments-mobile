import { create } from "zustand";
import { EventItem } from "@/domain/model/entities/events/event_item";
import { getErrorMessage } from "@/shared/utils/error_utils";
import { FilterTag } from "@/domain/model/enums/filter_tag";
import { EventRepository } from "@/domain/repository/events/event_repository";
import { container } from "@/dependency_injection/container";
import { EventListRestult } from "@/domain/model/dto/events/event_list_result";

export interface EventsStore {
  events: EventItem[];
  currentPage: number;
  hasMore: boolean;
  actualFilter: FilterTag;
  repository: EventRepository
  
  // --- Granular Loading States ---
  loading: boolean;
  
  // --- Granular Error States ---
  error: string | null;

  // --- Actions ---
  // fetchCallback is now passed here
  loadNextPage: (fetchCallback: (repo: EventRepository, page: number) => Promise<EventListRestult>) => Promise<void>;
  refreshState: () => void; 
  setFilter: (newFilter: FilterTag) => void
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: [],
  currentPage: 0,
  hasMore: true,
  loading: false,
  error: null,
  actualFilter: FilterTag.Location,
  repository: container.eventRepository,

  /**
   * Fetch other users' events (for discovery).
   */
  loadNextPage: async (fetchCallback) => {
    const state = get();

    // Avoid fetch more time while loading & when there are no more events
    if (state.loading || !state.hasMore) return;

    // Set loading/error specific to this action
    set({ loading: true, error: null });
    try {
      const callback = await fetchCallback(state.repository, state.currentPage);

      set({
        events: [...state.events, ...callback.events],
        loading: false,
        currentPage: ++state.currentPage,
        hasMore: callback.hasMore,
      });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err),
        loading: false,
      });
    }
  },

  refreshState: () => {
    set({
      events: [],
      currentPage: 0,
      hasMore: true,
      loading: false,
      error: null
    });
  },

  setFilter: async (newFilter: FilterTag) => {
    const state = get()

    if (state.actualFilter == newFilter) return

    // If filter has changed
    state.refreshState()
  }
}));