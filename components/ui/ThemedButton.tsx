import {
  type GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ThemedButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  lightColor?: string;
  darkColor?: string;
}

const ThemedButton = ({
  title = "Click me",
  onPress = () => {},
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
      style={[styles.button, { backgroundColor: `#${backgroundColor}` }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
