import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "I'm feeling overwhelmed today. I just need to vent. Everything seems so heavy, and I don't even know where to begin.",
      sender: "user",
    },
    {
      text: "I hear you, and it’s okay to feel this way. Life can get overwhelming, but remember that even in difficulty, there is ease. Allah says in the Quran: 'Indeed, with hardship comes ease.' (Surah Ash-Sharh, 94:6) Take your time to share what’s on your mind; I’m here to listen.",
      sender: "AI",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "How can I stay motivated?",
    "What does the Quran say about patience?",
    "Can you share a comforting dua?",
    "How do I trust Allah's plan?",
    "What are tips for overcoming stress?",
  ];

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");
    setLoading(true);

    try {
      // Make a POST request to the FastAPI backend
      const response = await fetch("https://sahbti.onrender.com/ai-chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "user", message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response;

      // Add AI's response to the chat
      setMessages((prev) => [...prev, { text: aiResponse, sender: "AI" }]);
    } catch (error) {
      console.error("Error in chatbot communication:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
    sendMessage();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#8183BD" }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 16,
            color: "black",
          }}
        >
          SAHBTI
        </Text>

        <ScrollView
          style={{ flex: 1, marginBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={{
                padding: 16,
                borderRadius: 8,
                margin: 8,
                backgroundColor: msg.sender === "user" ? "#F1DAEB" : "white",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <Text style={{ fontSize: 16, color: "#4B4A4A" }}>{msg.text}</Text>
            </View>
          ))}
          {loading && (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
              style={{ marginLeft: 8, alignSelf: "flex-start" }}
            />
          )}
        </ScrollView>

        <View style={{ marginBottom: 16 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {suggestions.map((suggestion, id) => (
              <TouchableOpacity
                key={id}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  backgroundColor: "#F1DAEB",
                  borderRadius: 50,
                  marginRight: 16,
                }}
                onPress={() => handleSuggestion(suggestion)}
              >
                <Text style={{ fontSize: 14, color: "#4B4A4A" }}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 8,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Send a message to Sahbti Chat"
            style={{
              flex: 1,
              paddingHorizontal: 8,
              fontSize: 16,
              color: "#4B4A4A",
            }}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{ paddingHorizontal: 8 }}
            disabled={loading}
          >
            <FontAwesome
              name="send"               
              size={24}
              color={loading ? "#A8A8A8" : "#8183BD"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
