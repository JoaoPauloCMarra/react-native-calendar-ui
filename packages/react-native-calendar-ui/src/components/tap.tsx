import React, { ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { View } from "react-native";

export interface TapProps {
  onPress?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export function Tap({ onPress, children, disabled = false }: TapProps) {
  const tap = Gesture.Tap()
    .enabled(!disabled)
    .onEnd(() => {
      if (onPress) {
        onPress();
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <View>{children}</View>
    </GestureDetector>
  );
}
