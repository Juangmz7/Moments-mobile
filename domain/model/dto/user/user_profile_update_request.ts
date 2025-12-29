import { InterestTag } from "@/domain/model/enums/interest_tag";

export interface UserProfileUpdateRequest {
  userName: string;
  nationality: string;
  languages: string[];
  age: number;
  interests: InterestTag[];
  bio?: string;
  userLocation: {
    city: string;
    country: string;
  };
  profilePicture: string | null;
}
