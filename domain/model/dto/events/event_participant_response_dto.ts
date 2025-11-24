import { UserProfileResponseDTO } from "../user/user_profile_response_dto";

export interface EventParticipantResponseDTO {
    id: string;
    userProfile: UserProfileResponseDTO;
    eventId: string;
}