import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import MicrophoneButton from '../components/MicrophoneButton';

export default function DailyGoalsPage() {
  // Sample data with task completion state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Reading 10 pages of Quran daily.",
      completed: false,
    },
    {
      id: 2,
      text: "30 minutes of exercising daily.",
      completed: true,
    },
    {
      id: 3,
      text: "Listening to Lectures.",
      completed: true,
    },
    {
      id: 4,
      text: "Morning and Evening Adhkar.",
      completed: true,
    },
    {
      id: 5,
      text: "Perform a Good Deed.",
      completed: true,
    },
  ]);

  // Toggle completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View className="p-6 justify-between flex items-center flex-col h-full">
      <View>
        <Text className="text-lg font-bold mb-4 text-[#8183BD]">
          LET'S TAKE CONTROL OF YOUR LIFE
        </Text>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => toggleTaskCompletion(task.id)}
            className="flex-row items-center mb-2"
          >
            <FontAwesome name="th-large" size={16} color="black" />
            <FontAwesome
              name={task.completed ? "check-square" : "square-o"}
              size={16}
              color="#8183BD"
              className="ml-2"
            />
            <Text
              className={`ml-2 ${
                task.completed ? "line-through text-[#8183BD]" : "text-black"
              }`}
            >
              {task.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <MicrophoneButton />
      </View>
    </View>
  );
}
