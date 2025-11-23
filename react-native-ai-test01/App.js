import "./global.css";
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { MLCEngine, mlc } from '@react-native-ai/mlc';
import { streamText } from 'ai';

// Using a smaller model for faster download/inference testing if possible, 
// but sticking to the requested Llama 3.2 3B which is standard for on-device.
const MODEL_ID = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [modelStatus, setModelStatus] = useState('idle'); // idle, downloading, ready, error
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [generating, setGenerating] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const sub = MLCEngine.onDownloadProgress.addListener((progress) => {
      setDownloadProgress(progress.percentage);
    });
    return () => sub.remove();
  }, []);

  const handleLoadModel = async () => {
    try {
      setModelStatus('downloading');

      // Start download
      await MLCEngine.downloadModel(MODEL_ID);

      setModelStatus('loading_engine');
      // Prepare the model
      await MLCEngine.prepareModel(MODEL_ID);

      setModelStatus('ready');
    } catch (e) {
      console.error("Error loading model:", e);
      setModelStatus('error');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || generating) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setGenerating(true);

    try {
      // Create a placeholder for the assistant's response
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const result = await streamText({
        model: mlc(MODEL_ID),
        messages: newMessages,
      });

      let fullContent = '';
      for await (const part of result.textStream) {
        fullContent += part;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          // Update the last message if it's the assistant's
          if (last.role === 'assistant') {
            const updated = [...prev];
            updated[updated.length - 1] = { ...last, content: fullContent };
            return updated;
          }
          return prev;
        });
      }
    } catch (e) {
      console.error("Generation error:", e);
      setMessages(prev => [...prev, { role: 'system', content: 'Error generating response.' }]);
    } finally {
      setGenerating(false);
    }
  };

  const renderItem = ({ item }) => (
    <View className={`my-2 p-3 rounded-2xl max-w-[85%] ${item.role === 'user' ? 'self-end bg-blue-500' : item.role === 'system' ? 'self-center bg-gray-200' : 'self-start bg-gray-100 dark:bg-gray-800'}`}>
      <Text className={`text-base ${item.role === 'user' ? 'text-white' : 'text-black dark:text-white'}`}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          React Native AI Chat
        </Text>

        {modelStatus !== 'ready' ? (
          <View className="flex-1 justify-center items-center">
            {modelStatus === 'idle' && (
              <TouchableOpacity
                onPress={handleLoadModel}
                className="bg-blue-600 px-6 py-3 rounded-full"
              >
                <Text className="text-white font-semibold text-lg">Load Model ({MODEL_ID})</Text>
              </TouchableOpacity>
            )}

            {modelStatus === 'downloading' && (
              <View className="items-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="mt-4 text-gray-600 dark:text-gray-300">Downloading Model... {downloadProgress.toFixed(1)}%</Text>
              </View>
            )}

            {modelStatus === 'loading_engine' && (
              <View className="items-center">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="mt-4 text-gray-600 dark:text-gray-300">Initializing Engine...</Text>
              </View>
            )}

            {modelStatus === 'error' && (
              <View className="items-center">
                <Text className="text-red-500 mb-4">Failed to load model.</Text>
                <TouchableOpacity
                  onPress={handleLoadModel}
                  className="bg-blue-600 px-6 py-3 rounded-full"
                >
                  <Text className="text-white font-semibold">Retry</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1"
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
          >
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <View className="flex-row items-center mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
              <TextInput
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-3 rounded-xl mr-2 text-base"
                placeholder="Type a message..."
                placeholderTextColor="#9CA3AF"
                value={input}
                onChangeText={setInput}
                editable={!generating}
              />
              <TouchableOpacity
                onPress={handleSend}
                disabled={generating || !input.trim()}
                className={`p-3 rounded-xl ${generating || !input.trim() ? 'bg-gray-300 dark:bg-gray-700' : 'bg-blue-600'}`}
              >
                {generating ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-bold">Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
}
