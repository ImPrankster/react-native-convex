import { useMutation } from "convex/react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { api } from "@/convex/_generated/api";
import ThemedButton from "./ui/ThemedButton";

export default function SendMessage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = useMutation(api.message.sendMessage);

  const handleSend = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await sendMessage({ content });
      setContent("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Type your message..."
        editable={!loading}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <ThemedButton
        title={loading ? "Sending..." : "Send"}
        onPress={handleSend}
        disabled={loading || !content.trim()}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    minWidth: 80,
    marginLeft: 8,
  },
});
