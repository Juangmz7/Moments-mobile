// Auth store with minimal, professional comments.
// - UI passes primitives (email, code, token)
// - Store builds DTOs, calls repository, and persists tokens
// - Errors are captured in-store (no rethrow) and exposed via `error`

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { container } from "@/dependency_injection/container";
import { getErrorMessage } from "@/shared/error_utils";

import { User } from "@/domain/model/entities/users/user";
import { UserAuthRequest } from "@/domain/model/dto/auth/user_auth_request";
import { RefreshTokenRequest } from "@/domain/model/dto/auth/refresh_token_auth_request";
import { AuthRepository } from "@/domain/repository/auth/auth_repository";
import { UserAuthResponse } from "@/domain/model/dto/auth/user_auth_response";

interface UserAuthStore {
  /** Authenticated user entity (null when logged out). */
  user: User | null;

  /** True if the session is valid and tokens are present. */
  isAuthenticated: boolean;

  /** Last error message for UI feedback; null when no error. */
  error: string | null;

  /** Repository for remote auth operations. */
  authRepository: AuthRepository;

  /** Assigns user entity in state. */
  setUser: (user: User) => void;

  /** Toggles authenticated flag. */
  setUserAuthenticated: (isAuthenticated: boolean) => void;

  /** Sets/clears last error. */
  setError: (message: string | null) => void;

  /** Clears local tokens and resets state. */
  clearUser: () => Promise<void>;

  /** Starts email login flow (server sends verification code). */
  requestLoginEmail: (email: string) => Promise<void>;

  /** Verifies code, persists tokens, and authenticates user. */
  verifyEmailCode: (code: string, email: string) => Promise<void>;

  /** Registers a user (no tokens yet). */
  register: (email: string) => Promise<void>;

  /** Activates account via token + email. */
  activateAccount: (token: string, email: string) => Promise<void>;

  /** Refreshes tokens using the stored refresh token. */
  refreshToken: () => Promise<void>;

  /** Logs out (server + local cleanup). */
  logout: () => Promise<void>;
}

export const useUserAuthStore = create<UserAuthStore>((set, get) => ({
  // --- state ---
  user: null,
  isAuthenticated: false,
  error: null,

  // Single shared repository instance from DI container
  authRepository: container.authRepository,

  setUser: (user: User) => set({ user }),

  setUserAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  setError: (message: string | null) => set({ error: message }),

  /**
   * Removes persisted tokens and resets in-memory auth state.
   * Call this on logout or when refresh fails.
   */
  clearUser: async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
    set({ user: null, isAuthenticated: false, error: null });
  },

  /**
   * Step 1: Request a verification code to be emailed to the user.
   * Only clears/sets `error`; does not change auth state.
   */
  requestLoginEmail: async (email: string) => {
    const { authRepository } = get();
    try {
      set({ error: null });
      const request: UserAuthRequest = { email };
      await authRepository.requestLoginEmail(request);
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
    }
  },

  /**
   * Step 2: Verify the code. On success:
   * - Persist tokens to AsyncStorage
   * - Set minimal `user` entity
   * - Mark `isAuthenticated` = true
   */
  verifyEmailCode: async (code: string, email: string) => {
    const { authRepository } = get();
    try {
      set({ error: null });

      const request: UserAuthRequest = { email };
      const resp: UserAuthResponse = await authRepository.verifyEmailCode(
        code,
        request
      );

      await AsyncStorage.multiSet([
        ["accessToken", resp.accessToken],
        ["refreshToken", resp.refreshToken],
      ]);

      // Build a minimal user model; extend if your backend returns more fields
      const user = new User(email, resp.email.split("@")[0]);

      set({ user, isAuthenticated: true, error: null });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
    }
  },

  /**
   * Registers a new account (no tokens issued here).
   * Server sends activation link via email.
   */
  register: async (email: string) => {
    const { authRepository } = get();
    try {
      set({ error: null });
      const request: UserAuthRequest = { email };
      await authRepository.register(request);
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
    }
  },

  /**
   * Activates an existing account using a token + email.
   * No local state changes beyond error handling.
   */
  activateAccount: async (token: string, email: string) => {
    const { authRepository } = get();
    try {
      set({ error: null });
      await authRepository.activateAccount(token, email);
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
    }
  },

  /**
   * Refreshes tokens silently using the stored refresh token.
   * If no refresh token/email is present or the call fails, session is cleared.
   */
  refreshToken: async () => {
    const { authRepository } = get();
    try {
      set({ error: null });

      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const email = get().user?.email;

      if (!refreshToken || !email) {
        set({ error: "Missing refresh token or email." });
        await get().clearUser();
        return;
      }

      const request: RefreshTokenRequest = { refreshToken, email };
      const resp = await authRepository.refreshToken(request);

      await AsyncStorage.multiSet([
        ["accessToken", resp.accessToken],
        ["refreshToken", resp.refreshToken],
      ]);

      set({ isAuthenticated: true, error: null });
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
      await get().clearUser();
    }
  },

  /**
   * Logs out from the backend and always clears local session.
   * Even if the server call fails, local cleanup is guaranteed.
   */
  logout: async () => {
    const { authRepository } = get();
    try {
      set({ error: null });
      await authRepository.logout();
    } catch (e: unknown) {
      set({ error: getErrorMessage(e) });
    } finally {
      await get().clearUser();
    }
  },
}));
