import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Signup = () => {
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className=" px-4">
        {/* Logo Section */}
        <View className="flex justify-center items-center">
          <Image
            source={require("../assets/images/sahbti.png")} 
            className="w-[60%]"
            resizeMode="contain"
          />
          <Text className="text-lg font-bold">Take Control of your Life</Text>
          <Text className="text-lg font-medium">Sign up</Text>
        </View>

        {/* Input Section */}
        <View className="mt-6 w-full">
          <Text className="text-base">Create your account</Text>
          <TextInput
            className="border border-gray-300 rounded-md mt-2 px-4 py-3"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity className="bg-[#8083BF] w-full mt-4 py-[0.85rem] rounded-md items-center">
          <Link href="/emailverification">
            <Text className="text-white">NEXT</Text>
          </Link>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row gap-3 justify-between items-center my-6">
          <Text className="h-[1px] bg-gray-400 w-[45%]"></Text>
          <Text className="text-lg text-gray-800">or</Text>
          <Text className="h-[1px] bg-gray-400 w-[45%]"></Text>
        </View>

        {/* Social Media Login */}
        <View>
          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row items-center justify-center">
            <Image
              source={require("../assets/images/Apple.png")}
              className="mr-2 h-6 w-5"
            />
            <Text className="text-[#65005C]">Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row items-center justify-center">
            <Image
              source={require("../assets/images/Google.png")}
              className="mr-2 h-5 w-5"
            />
            <Text className="text-[#65005C]">Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="border border-[#F1DAEB] w-full mt-4 py-3 rounded-md flex-row items-center justify-center">
            <Image
              source={require("../assets/images/Facebook.png")}
              className="mr-2 h-6 w-6"
            />
            <Text className="text-[#65005C]">Continue with Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Already Have an Account */}
        <View className="flex justify-center items-center pt-6">
          <Text>
            Already have an account?{" "}
            <Link href="/signin">
              <Text className="text-[#8083BF] font-bold text-lg">Sign In</Text>
            </Link>
          </Text>
        </View>
      </View>

      {/* Bottom Shape and Logo */}
      <View className="relative w-full h-[200px]">
        <Image
          source={require("../assets/images/Vector.png")}
          className="absolute bottom-0 right-0 w-[200px] h-[200px]"
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/logo.png")}
          className="absolute bottom-4 left-[40%] -translate-x-1/2 w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

export default Signup;
