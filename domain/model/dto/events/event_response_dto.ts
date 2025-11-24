import { InterestTag } from "../../enums/interest_tag";
import { UserProfileResponseDTO } from "../user/user_profile_response_dto";

export interface EventResponseDTO {
    eventId: string;
    name: string;
    eventBio: {
        id: string;
        description: string;
        image: string; // Spring serializes byte[] as a Base64 string
        interestTags: InterestTag[]; // Enums come as strings
    };
    organiser: {
        id: string;
        name: string;
        profile: UserProfileResponseDTO;
    };
    location: {
        city: string;
        placeName: string;
    };
    chat: {
        id: string;
    };
    participantCount: number; 
    startDate: string;
    endDate: string;
}