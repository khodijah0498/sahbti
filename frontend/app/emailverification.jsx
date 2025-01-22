import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

const EmailVerification = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center px-5 relative">
      {/* Email Icon */}
      <View className="bg-[#F1DAEB] p-4 rounded-lg mb-5">
        <Icon name="email" size={48} color="#8183BD" />
      </View>

      {/* Title and Subtitle */}
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        Check your Email
      </Text>
      <Text className="text-center text-base text-gray-600 mb-8">
        We sent a code to yourname@gmail.com
      </Text>

      {/* Code Input Fields */}
      <View className="flex-row justify-between w-[80%] mb-10">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <TextInput
              key={index}
              className="w-12 h-12 border border-[#8083BF] rounded-lg text-center text-lg text-gray-800"
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity className="bg-[#8083BF] py-4 px-10 rounded-lg">
        <Link href="/dashboard">
          <Text className="text-white text-base font-bold">SUBMIT</Text>
        </Link>
      </TouchableOpacity>

      {/* Bottom Shape and Logo */}
      <View className="absolute bottom-0 w-full h-[200px]">
        {/* Shape */}
        <Image
          source={require("../assets/images/Vector.png")}
          className="absolute bottom-0 right-0 w-[200px] h-[200px]"
          resizeMode="contain"
        />
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")}
          className="absolute bottom-4 left-[40%] -translate-x-1/2 w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default EmailVerification;
