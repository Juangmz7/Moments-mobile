import { UserProfileDataSource } from "@/domain/datasources/user/user_profile_datasource";
import { mapProfileToFrontend } from "@/domain/infrastructure/mappers/user_profile_mapper";
import { UserProfileResponseDTO } from "@/domain/model/dto/user/user_profile_response_dto";
import { UserProfileUpdateRequest } from "@/domain/model/dto/user/user_profile_update_request";
import { UserProfile } from "@/domain/model/entities/events/user_profile";
import { ApiService } from "@/domain/services/api_service";
import { useUserAuthStore } from "@/store/auth/use_auth_store";

/**
 * Remote implementation of UserProfileDataSource using ApiService.
 */
export class UserProfileDataSourceImpl implements UserProfileDataSource {
  constructor(private readonly api: ApiService) {}

  private getCurrentUsername(): string {
    const user = useUserAuthStore.getState().user;
    if (!user?.username) {
      throw new Error("No username found for current user");
    }
    return user.username;
  }

  async getMyProfile(): Promise<UserProfile> {
    const username = this.getCurrentUsername();
    const dto = await this.api.get<UserProfileResponseDTO>(`/user/username/${username}`);
    return mapProfileToFrontend(dto);
  }

  async updateMyProfile(userProfileId: string, payload: UserProfileUpdateRequest): Promise<UserProfile> {
    const dto = await this.api.put<UserProfileResponseDTO>(
      `/user/${userProfileId}`,
      payload,
      true
    );
    return mapProfileToFrontend(dto);
  }
}

