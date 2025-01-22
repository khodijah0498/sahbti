import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Link } from "expo-router";

export default function GoalList() {
  const goals = [
    "Reading 10 pages of Quran daily",
    "30 minutes of exercising daily",
    "Journaling",
    "Listening to Lectures",
    "Word of Affirmation",
    "Morning and Evening Adhkar",
    "Reflect and Repent",
    "Perform a Good Deed",
    "Seek Knowledge",
  ];

  const [completedGoals, setCompletedGoals] = useState(
    Array(goals.length).fill(false) // One completion status for each goal
  );

  // Function to toggle completion of a goal
  const toggleGoalCompletion = (index) => {
    const updatedGoals = [...completedGoals];
    updatedGoals[index] = !updatedGoals[index]; // Toggle completion status
    setCompletedGoals(updatedGoals); // Update the state
  };

  return (
    <View className="mx-4 mb-4">
      <Text className="text-lg font-bold text-[#8183BD] mb-2">TUESDAY</Text>
      <View className="flex-col">
        {/* Daily Goals Section */}
        <View className="w-full p-4 bg-[#F1DAEB] text-white rounded-md">
          <Link href="/dailypage">
            <Text className="text-lg font-bold text-[#8183BD] mb-2">
              DAILY GOALS
            </Text>
          </Link>

          {goals.map((goal, index) => (
            <View key={index} className="flex-row items-center my-2">
              <TouchableOpacity onPress={() => toggleGoalCompletion(index)}>
                <FontAwesome
                  name={completedGoals[index] ? "check-square" : "square-o"} // Toggle icon
                  size={16}
                  color="white"
                />
              </TouchableOpacity>
              <Text
                className={`ml-2 ${
                  completedGoals[index]
                    ? "line-through text-[#8183BD]"
                    : "text-[]"
                }`}
              >
                {goal}
              </Text>
            </View>
          ))}
        </View>

        {/* Personal Section */}
        <View className="p-4 border border-[#F1DAEB] w-full rounded-md">
          <Link href="/dailypage">
            <Text className="font-bold text-center text-[1.98rem] text-[#8183BD]">
              PERSONAL
            </Text>
          </Link>
        </View>

        {/* Spiritual Section */}
        <View className="p-4 border border-[#F1DAEB] w-full rounded-md">
          <Link href="/dailypage">
            <Text className="font-bold text-center text-[1.98rem] text-[#8183BD]">
              SPIRITUAL
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
