
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";


const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <ScrollView>
        <Image source={image} style={styles.image} />
        <Text>{label}</Text>
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
        />
      </ScrollView>
  );
};

const MyApp = () => {
  const Question = [
    {
      label: 'What animal is this?',
      image: require('./img/bee.jpg'),
      options: ['Elephant', 'Bee', 'Zebra','Monkey'],
      correctAnswer: 'Bee',
    },
    {
      label: 'What animal is this?',
      image: require('./img/crocodile.jpg'),
      options: ['Giraffe', 'Crocodile', 'Deer','Gorilla'],
      correctAnswer: 'Crocodile',
    },
    {
      label: 'What animal is this?',
      image: require('./img/deer.jpg'),
      options: ['Hummingbird', 'Deer', 'Peacock','Dog'],
      correctAnswer: 'Deer',
    },
    {
      label: 'What animal is this?',
      image: require('./img/elephant.jpg'),
      options: ['Hummingbird', 'Elephant', 'Peacock','Cat'],
      correctAnswer: 'Elephant',
    },
  ];

  const [answers, setAnswers] = useState(Array(Question.length).fill(null));

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === Question[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    let message = '';

    // Customize the feedback message based on the score
    if (score === Question.length) {
      message = 'Well done!';
    } else if (score >= Question.length / 2) {
      message = `Good job! You got ${score} out of ${Question.length} correct.`;
    } else {
      message = `You can do better next time. You got ${score} out of ${Question.length} correct.`;
    }

    // Show the alert with the score and feedback message
    Alert.alert(message);
  };

  return (
      <ScrollView>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Icon name="paw" size={24} color="black" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Animal Quiz</Text>
        </View>

        {Question.map((question, index) => (
            <QuestionBox
                key={index}
                label={question.label}
                image={question.image}
                options={question.options}
                selectedValue={answers[index]}
                onValueChange={(value) => handleAnswerChange(value, index)}
            />
        ))}
        <Button title="Submit Answers test" onPress={handleSubmit} />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 300,
  },
  touchableText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcon: {
    marginRight: 8,
  },
  header: {
    flexDirection: 'row', // Aligns items vertically in the center
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyApp;
