// import { StatusBar } from "expo-status-bar";
// import { Text, View } from "react-native";
// import { Link } from "expo-router";
// import "../global.css"

// export default function App() {
//   return (
//     <View className="flex-1 justify-center items-center bg-white">
//       <Link href="/signup">
//         <View
//           className="bg-[#BA68C8] rounded-full justify-center items-center"
//           style={{ width: 200, height: 200 }}
//         >
//           <Text className="text-3xl text-[#76038A]">Sahbti</Text>
//         </View>
//       </Link>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Link } from "expo-router";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1  relative bg-[#FCF7FA]">
    
      <View className="absolute top-20 w-full items-center justify-center py-40 ">
        {/* Arabic Logo */}

        <Image
          source={require("../assets/images/logo.png")} 
          className="w-24 h-24 mb-8"
          resizeMode="contain"
        />

        {/* "Sahbti" Text with Link */}
        <Link href="/signup">
          
          <Image
            source={require("../assets/images/sahbti.png")}
            className=""
            resizeMode="contain"
          />
        </Link>
      </View>

    
      <Image
        source={require("../assets/images/shape1.png")} 
        className="absolute top-0 left-0 w-[75%] h-[40%] "
        resizeMode="contain"
      />

      <Image
        source={require("../assets/images/shape2.png")} 
        className="absolute bottom-0 right-0 w-[75%] h-[40%]"
        resizeMode="contain"
      />

           <StatusBar style="auto" />
    </View>
  );
}
