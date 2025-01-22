import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function DailyGoal() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


  const [completedDays, setCompletedDays] = useState(Array(7).fill(false));

  
  const toggleDayCompletion = (index) => {
    const updatedDays = [...completedDays];
    updatedDays[index] = !updatedDays[index]; // Toggle completion status
    setCompletedDays(updatedDays);
  };

  return (
    <View className="mx-2 mb-4 p-4 bg-[#F1DAEB] rounded-lg">
      <Text className="font-bold text-center bg-[#8183BD] text-white py-1 rounded">
        YOUR DAILY GOAL
      </Text>
      <View className="flex-row justify-around mt-2">
        {days.map((day, index) => (
          <View key={index} className="items-center">
            <TouchableOpacity onPress={() => toggleDayCompletion(index)}>
              <View
                className={`w-8 h-8 rounded-full mb-1 ${
                  completedDays[index] ? "bg-[#8183BD]" : "bg-white"
                }`}
              ></View>
            </TouchableOpacity>
            <Text className="text-xs">{day.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
