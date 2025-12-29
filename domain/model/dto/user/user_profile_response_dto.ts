// user_profile_response_dto.ts
export interface UserProfileResponseDTO {
    id: string;
    userName: string;
    age: number;
    
    bio: string | null;
    nationality: string | null;
    
    languages: string[];
    interests: string[]; 
        userLocation: {
        city: string;
        country: string;
    } | null;
    
    profilePicture: string | null;
    socialMedia: Record<string, string> | null; 
}