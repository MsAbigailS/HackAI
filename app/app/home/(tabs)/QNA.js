import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable, TextInput, Button, KeyboardAvoidingView, Platform, ActivityIndicator, ImageBackground, Keyboard } from 'react-native';
import mavericksTeamImage from '../../images/dallas_mavericks_team_logo.png';
import miamiHeatImage from '../../images/miami_heat_team_logo.png';
import profile_picture from '../../images/profile_picture.png'
import heroImage from '../../images/basketball_hero_image.jpg'
import { API_URL } from './secrets';

export default function QNA() {
  const [question, setQuestion] = useState('Here is an example question!');
  const [answer, setAnswer] = useState('This is where the answer will be!');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
        // Call your API here with the question and update the answer state with the response
        const formData = new FormData();
        formData.append('question', question);
        const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
        });
        const data = await response.text();
        setAnswer(data);
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={styles.answerContainerWrapper}>
      <View style={styles.answerContainer}>
        {loading ? (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" />
        </View>
        ) : (
        <Text style={styles.answer}>{answer}</Text>
        )}
      </View>
    </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={question}
          onChangeText={setQuestion}
          placeholder="What is a three pointer?"
        />
        <Button title="Send" onPress={handleAskQuestion} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
answerContainerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%",
},
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
answerContainer: {
    height: '60%',
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  answer: {
    marginTop: 16,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
