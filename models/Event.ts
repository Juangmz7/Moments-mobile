import { EventOrganiser } from "./EventOrganiser";

export interface Event {
    id: string
    title: string
    bio: string
    organiser: EventOrganiser
    location?: string
    chatId: string
    startDate: string
    endDate: string
}