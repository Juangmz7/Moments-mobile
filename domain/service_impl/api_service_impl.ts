import { ApiService } from "../services/api_service";

import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.campusconnect.com/api";

export class ApiServiceImpl implements ApiService {

    // Helper to get auth headers & extract token from storage
  private async getAuthHeaders(): Promise<Record<string, string>> {
    const accessToken = await AsyncStorage.getItem("access_token");
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) return {} as T;

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Error] ${response.status} - ${errorText}`);
      throw new Error(errorText || `HTTP error ${response.status}`);
    }

    return (await response.json()) as T;
  }

  // Token refresh logic whenever a token expires
  private async refreshToken(): Promise<void> {
    const refreshToken = await AsyncStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("Missing refresh token");

    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Token refresh failed");

    const data = await res.json();
    await AsyncStorage.setItem("access_token", data.accessToken);
    await AsyncStorage.setItem("refresh_token", data.refreshToken);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
    auth = false
  ): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : "";
    const url = `${BASE_URL}${endpoint}${queryString}`;

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (auth) {
      headers = { ...headers, ...(await this.getAuthHeaders()) };
    }

    let response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Auto-refresh token on 401 Unauthorized
    if (response.status === 401 && auth) {
      console.warn("Access token expired — refreshing...");
      await this.refreshToken();
      headers = { ...headers, ...(await this.getAuthHeaders()) };

      response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    }

    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string, params?: Record<string, any>, auth = false): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, params, auth);
  }

  async post<T>(endpoint: string, body?: Record<string, any>, auth = false): Promise<T> {
    return this.request<T>("POST", endpoint, body, undefined, auth);
  }

  async put<T>(endpoint: string, body?: Record<string, any>, auth = false): Promise<T> {
    return this.request<T>("PUT", endpoint, body, undefined, auth);
  }

  async delete<T>(endpoint: string, auth = false): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, undefined, auth);
  }
}
