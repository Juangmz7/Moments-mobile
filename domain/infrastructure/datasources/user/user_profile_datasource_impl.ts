import { UserProfileDataSource } from "@/domain/datasources/user/user_profile_datasource";
import { mapProfileToFrontend } from "@/domain/infrastructure/mappers/user_profile_mapper";
import { UserProfileResponseDTO } from "@/domain/model/dto/user/user_profile_response_dto";
import { UserProfileUpdateRequest } from "@/domain/model/dto/user/user_profile_update_request";
import { UserProfile } from "@/domain/model/entities/events/user_profile";
import { ApiService } from "@/domain/services/api_service";

/**
 * Remote implementation of UserProfileDataSource using ApiService.
 */
export class UserProfileDataSourceImpl implements UserProfileDataSource {
  constructor(private readonly api: ApiService) {}

  async getMyProfile(): Promise<UserProfile> {
    // NOTE: Adjust the endpoint string if your backend uses a different route.
    const dto = await this.api.get<UserProfileResponseDTO>("/user/me");
    return mapProfileToFrontend(dto);
  }

  async updateMyProfile(payload: UserProfileUpdateRequest): Promise<UserProfile> {
    const dto = await this.api.put<UserProfileResponseDTO>("/user/me", payload, true);
    return mapProfileToFrontend(dto);
  }
}

