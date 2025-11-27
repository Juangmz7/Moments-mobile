import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface GoogleLoginButtonProps {
  onPress?: () => void;
  isLoading?: boolean;
}

export default function GoogleLoginButton({
  onPress,
  isLoading = false,
}: GoogleLoginButtonProps) {
  // When loading, render a container with the spinner to maintain layout stability
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#2e64e5" />
      </View>
    );
  }

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light} // Use .Dark if you prefer the blue background
      onPress={onPress}
      disabled={isLoading}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48, // Standard height for the native button
  },
  loadingContainer: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 4, 
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});