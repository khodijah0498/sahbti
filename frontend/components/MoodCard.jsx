import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import backgroundImage from "../assets/images/line.png";
import { Picker } from "@react-native-picker/picker";


export default function MoodCard() {
  const [mood, setMood] = useState("Happy");
  const [source, setSource] = useState("Quran");

  const moodData = {
    Sad: {
      source: "Quran",
      verse: "Indeed, with hardship comes ease. (Surah Ash-Sharh, 94:6)",
    },
    Happy: {
      source: "Hadith",
      verse:
        "The Prophet (ﷺ) said: 'The most beloved of deeds to Allah are those that are most consistent, even if small.' (Bukhari, 6464)",
    },
    Overwhelmed: {
      source: "Prophetic Story",
      verse:
        "The Prophet (ﷺ) endured great challenges and yet continued to trust in Allah's wisdom. Trust and patience lead to relief.",
    },
  };

  const currentMood = moodData[mood];

  return (
    <View>
      <Text className="text-2xl font-bold pl-4 text-gray-800 text-center">
        As salamu alaykum Habibti!
      </Text>

      <Text className="text-base font-medium text-gray-800 pl-4 pb-4 text-center
      ">
        It’s time to take control of your life
      </Text>

      {/* Picker for Mood */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Mood:</Text>
        <Picker
          selectedValue={mood}
          onValueChange={(value) => setMood(value)}
          style={styles.picker}
        >
          <Picker.Item label="Happy" value="Happy" />
          <Picker.Item label="Sad" value="Sad" />
          <Picker.Item label="Overwhelmed" value="Overwhelmed" />
        </Picker>
      </View>

      {/* Card with Dynamic Content */}
      <View style={styles.cardContainer}>
        {/* Image Background */}
        <Image source={backgroundImage} style={styles.backgroundImage} />

        {/* Centered Text Overlay */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{mood.toUpperCase()}</Text>
          <Text style={styles.sourceText}>Source: {currentMood.source}</Text>
          <Text style={styles.description}>{currentMood.verse}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    marginHorizontal: 2,
    marginVertical: 4,
  },
  overlay: {
    position: "absolute",
    top: 80,
    left: 60,
    right: 60,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF7FA",
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "#8183BD",
  },
  sourceText: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: "black",
    marginTop: 8,
    textAlign: "center",
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pickerLabel: {
    fontSize: 16,
    color: "#8183BD",
    fontWeight: "bold",
  },
  picker: {
    height: 55,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
});
