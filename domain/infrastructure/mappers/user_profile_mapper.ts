import { UserProfileResponseDTO } from "@/domain/model/dto/user/user_profile_response_dto";
import { UserProfile } from "@/domain/model/entities/events/user_profile";
import { InterestTag } from "@/domain/model/enums/interest_tag";

/**
 * Checks if the prefix exists, otherwise adds it.
 */
export const processImage = (base64Image: string | null | undefined): string | null => {
    if (!base64Image || base64Image === "null") return null;
    return base64Image.startsWith('data:') 
        ? base64Image 
        : `data:image/jpeg;base64,${base64Image}`;
};

// Objeto por defecto actualizado con los nuevos campos
const DEFAULT_PROFILE: UserProfile = {
    id: "no-profile-id",
    name: "Unknown profile",
    age: 0,
    bio: "",            
    nationality: "",
    languages: [],
    interests: [],
    city: "",
    country: "",
    profileImage: null,
    socialMedia: new Map() 
};

/**
 * Helper to map the generic UserProfileDTO to the Frontend UserProfile interface.
 * Used for both Organisers and Participants.
 */
export function mapProfileToFrontend(dto: UserProfileResponseDTO): UserProfile {
    if (!dto) return DEFAULT_PROFILE;

    return {
        id: dto.id,
        name: dto.userName ?? "Anonymous", 
        
        age: dto.age ?? 0,
        
        // Mapeo seguro para Bio
        bio: dto.bio ?? "", 

        nationality: dto.nationality ?? "Unknown",
        languages: dto.languages ?? [],
        
        interests: (dto.interests ?? []) as InterestTag[], 
        
        city: dto.userLocation?.city ?? "",     
        country: dto.userLocation?.country ?? "",
        
        profileImage: processImage(dto.profilePicture),
        
        socialMedia: dto.socialMedia 
            ? new Map<string, string>(Object.entries(dto.socialMedia)) 
            : new Map()
    };
};