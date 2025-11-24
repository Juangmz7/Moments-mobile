

export interface UserProfileResponseDTO {
    id: string;
    userName: string;
    age: number;
    nationality: string;
    languages: string[];
    interests: string[];
    userLocation: {
        city: string;
        country: string;
    }
    profilePicture: string | null; 
}