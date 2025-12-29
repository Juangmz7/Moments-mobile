import { InterestTag } from "@/domain/model/enums/interest_tag";
import { useUserAuthStore } from "@/store/auth/use_auth_store";
import { useUserProfileStore } from "@/store/user/use_user_profile_store";
import { useEffect, useState } from "react";

export const useProfilePage = () => {
  const user = useUserAuthStore((state) => state.user);
  const logout = useUserAuthStore((state) => state.logout);

  const { profile, isLoading, error, fetchProfile, updateProfile } =
    useUserProfileStore();

  useEffect(() => {
    if (!profile && !isLoading) {
      fetchProfile();
    }
  }, [profile, isLoading, fetchProfile]);

  const displayName =
    profile?.name || user?.username || user?.email || "Your Name";

  const subtitle =
    profile && (profile.city || profile.country)
      ? [profile.city, profile.country].filter(Boolean).join(", ")
      : profile?.nationality || "Add your location";

  const interests =
    profile?.interests && profile.interests.length > 0
      ? profile.interests
      : ["Add your interests"]; 

  const languagesText =
    profile && profile.languages.length > 0
      ? profile.languages.join(", ")
      : "Add your languages";

  const nationalityText = profile?.nationality || "Add your nationality";

  const bioText = profile
    ? `${displayName}, ${profile.age} years old`
    : "Tell others a bit about yourself.";

  // --- Edit form state ---
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUserName, setEditUserName] = useState(profile?.name ?? "");
  const [editNationality, setEditNationality] = useState(
    profile?.nationality ?? ""
  );
  const [editLanguages, setEditLanguages] = useState(
    profile?.languages.join(", ") ?? ""
  );
  const [editAge, setEditAge] = useState(
    profile?.age ? String(profile.age) : ""
  );
  const [editCity, setEditCity] = useState(profile?.city ?? "");
  const [editCountry, setEditCountry] = useState(profile?.country ?? "");
  const [editInterests, setEditInterests] = useState(
    profile?.interests.join(", ") ?? ""
  );

  useEffect(() => {
    if (profile) {
      setEditUserName(profile.name ?? "");
      setEditNationality(profile.nationality ?? "");
      setEditLanguages(profile.languages.join(", ") ?? "");
      setEditAge(profile.age ? String(profile.age) : "");
      setEditCity(profile.city ?? "");
      setEditCountry(profile.country ?? "");
      setEditInterests(profile.interests.join(", ") ?? "");
    }
  }, [profile]);

  const handleEditProfile = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleSubmitEdit = async () => {
    if (!profile) return;

    const languages = editLanguages
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    const interests = editInterests
      .split(",")
      .map((i) => i.trim().toUpperCase())
      .filter(Boolean) as InterestTag[];

    const ageNumber = Number(editAge) || 0;

    await updateProfile({
      userName: editUserName,
      nationality: Array.isArray(editNationality)
        ? editNationality.join(", ")
        : editNationality,
      languages,
      age: ageNumber,
      interests,
      userLocation: { city: editCity, country: editCountry },
      profilePicture: null,
    });

    setIsEditOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return {
    user,
    profile,
    isLoading,
    error,
    displayName,
    subtitle,
    interests,
    // edit state & actions
    isEditOpen,
    editUserName,
    editNationality,
    editLanguages,
    editAge,
    editCity,
    editCountry,
    editInterests,
    setEditUserName,
    setEditNationality,
    setEditLanguages,
    setEditAge,
    setEditCity,
    setEditCountry,
    setEditInterests,
    handleCloseEdit,
    handleSubmitEdit,
    languagesText,
    nationalityText,
    bioText,
    handleEditProfile,
    handleLogout,
  };
};

