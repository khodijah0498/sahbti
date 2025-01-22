import React from "react";
import { TouchableOpacity , View} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 

const MicrophoneButton = () => {
  const router = useRouter();

  
  const handlePress = () => {
    router.push("/chat");
  };

  return (
    <View className="justify-center items-center">
      <TouchableOpacity onPress={handlePress}>
        <View
          className="bg-[#F1DAEB] rounded-full justify-center items-center"
          style={{ width: 70, height: 70 }}
        >
          <MaterialIcons name="mic" size={40} color="#8183BD" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MicrophoneButton;
