import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ui/ThemedButton";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) {
    return null;
  }

  async function signInTest() {
    const attempt = await signIn?.create({
      strategy: "password",
      identifier: "0@example.com",
      password: "convextest",
    });

    if (attempt?.createdSessionId) {
      setActive?.({ session: attempt.createdSessionId });
    }
  }

  const handleGetCode = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await signIn?.create({
        strategy: "email_code",
        identifier: email,
      });
      Alert.alert("Success", "Verification code sent to your email");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Please contact us to get access");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setIsLoading(true);
    try {
      const attempt = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (attempt?.status === "complete" && attempt.createdSessionId) {
        setActive({ session: attempt.createdSessionId });
        router.replace("/");
        Alert.alert("Success", "Code verified successfully!");
      } else {
        Alert.alert("Error", "Invalid verification code");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
            paddingHorizontal: 16,
          }}
        >
          <ThemedText type="title">Sign In</ThemedText>

          <ThemedText type="default">Contact us to get access</ThemedText>

          <TextInput
            style={{
              height: 48,
              borderWidth: 1,
              alignSelf: "stretch",
              borderColor: "#ccc",
              borderRadius: 8,
              paddingHorizontal: 16,
              fontSize: 16,
              backgroundColor: "#fff",
            }}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ThemedButton
            style={{
              alignSelf: "stretch",
            }}
            title={isLoading ? "Loading..." : "Get Code"}
            onPress={handleGetCode}
            disabled={isLoading}
          />

          <ThemedText type="default">Enter the verification code</ThemedText>

          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 48,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingHorizontal: 16,
                fontSize: 16,
                backgroundColor: "#fff",
              }}
              placeholder="Enter verification code"
              placeholderTextColor="#666"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />

            <ThemedButton
              title={isLoading ? "Loading..." : "Verify Code"}
              onPress={handleVerifyCode}
              disabled={isLoading}
            />
          </ThemedView>

          {process.env.NODE_ENV === "development" && (
            <ThemedButton
              title={isLoading ? "Loading..." : "Test Sign In"}
              onPress={signInTest}
              disabled={isLoading}
            />
          )}
        </ThemedView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
