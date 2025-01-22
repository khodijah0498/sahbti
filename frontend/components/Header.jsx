
import { View, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
    
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginRight: 16, marginLeft: 24}}>
          <FontAwesome name="bell" size={24} color="#F9D64B" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <MaterialIcons name="settings" size={24} color="#8183BD" />
      </TouchableOpacity>

    </View>
  );
}

