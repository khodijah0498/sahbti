import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.log("Failed to load credentials:", error);
      }
    };

    loadCredentials();
  }, []);

  const handleLogin = async () => {
    const loginSuccessful =
      email === "user@example.com" && password === "password";

    if (loginSuccessful) {
      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }
      Alert.alert("Login Successful", "Welcome back!");
    } else {
      Alert.alert("Login Failed", "Invalid email or password.");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* Main Content */}
      <View className="py-8 px-4">
        {/* Sign-in Content */}
        <View className="flex justify-center items-center">
          
          <Image
            source={require("../assets/images/sahbti.png")} 
            className="w-[60%]"
            resizeMode="contain"
          />
          <Text className="text-lg font-bold">Welcome Back Habibti !</Text>
          <Text className="text-lg font-medium">Sign in</Text>
        </View>

        <View className="mt-6 w-full">
          <Text className="text-base">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-md mt-2 px-4 py-3"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mt-6 w-full">
          <Text className="text-base">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-md mt-2 px-4 py-3"
            placeholder="Enter your password"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <View className="flex-row justify-between items-center mt-3">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                className={`w-5 h-5 mr-2 border border-gray-300 rounded-sm ${
                  rememberMe ? "bg-[#8183BD]" : "bg-transparent"
                }`}
              />
              <Text className="text-gray-600">Remember Me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-[#8183BD]">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#8183BD] w-full mt-4 py-[0.85rem] rounded-md items-center"
          onPress={handleLogin}
        >
          <Link href="/dashboard">
            <Text className="text-white">LOGIN</Text>
          </Link>
        </TouchableOpacity>

        <View className="flex-row gap-3 justify-between items-center my-1">
          <Text className="h-[1px] bg-gray-400 w-[45%]"></Text>
          <Text className="text-lg text-gray-800">or</Text>
          <Text className="h-[1px] bg-gray-400 w-[45%]"></Text>
        </View>

        {/* Social Login */}
        <View>
          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row justify-center items-center">
            <Image
              source={require("../assets/images/Apple.png")}
              style={{ marginRight: 8, height: 24, width: 20 }}
            />
            <Text style={{ color: "#65005C" }}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row justify-center items-center">
            <Image
              source={require("../assets/images/Google.png")}
              style={{ marginRight: 8, height: 20, width: 20 }}
            />
            <Text style={{ color: "#65005C" }}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row justify-center items-center">
            <Image
              source={require("../assets/images/Facebook.png")}
              style={{ marginRight: 8, height: 24, width: 24 }}
            />
            <Text style={{ color: "#65005C" }}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="relative w-full h-[200px]">
        {/* Shape at bottom-right */}
        <Image
          source={require("../assets/images/Vector.png")}
          className="absolute bottom-0 right-0 w-[200px] h-[200px]"
          resizeMode="contain"
        />
        {/* "Don't have an account?" */}
        <View className="absolute top-4 left-1/2 -translate-x-1/2 items-center">
          <Text className="text-gray-700">
            Don't have an account?
            <Link href="/signup">
              <Text className="text-[#8183BD] font-bold text-lg">Sign Up</Text>
            </Link>
          </Text>
        </View>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")}
          className="absolute bottom-4 left-[40%] -translate-x-1/2 w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

export default signin;
