import {
  type GestureResponderEvent,
  type StyleProp,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

interface ThemedButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  lightColor?: string;
  darkColor?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ThemedButton = ({
  title = "Click me",
  onPress = () => {},
  disabled = false,
  style,
  lightColor,
  darkColor,
}: ThemedButtonProps) => {
  // Get themed colors, allowing override
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "button",
  );
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: `#${backgroundColor}` }, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <ThemedText style={[styles.text, { color: textColor }]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ThemedButton;
