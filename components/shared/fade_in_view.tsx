import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  index?: number;
  style?: StyleProp<ViewStyle>;
}

export const FadeInView: React.FC<Props> = ({ children, index = 0, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // 0.3 seconds
      delay: (index % 10) * 100, // Simple stagger delay
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, index]);

  return (
    <Animated.View
      style={[
        style, // Apply external styles first
        {
          opacity: fadeAnim, // Bind opacity
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};