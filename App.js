import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from "react-native";
import { useState } from "react";
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    ['C', 'DEL'],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0, '.', '=']
  ];

  const operators = ['/', '*', '-', '+'];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  function handleInput(buttonPressed) {
    if (operators.includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + '=');
        calculator();
        return;
      default:
        setCurrentNumber(currentNumber + buttonPressed);
        Vibration.vibrate(35);
        return;
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
    },
    result: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      width: '100%',
      minHeight: '35%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    resultText: {
      color: '#000000',
      margin: 10,
      fontSize: 40,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttonsContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    numbersContainer: {
      flex: 3,
      padding: 10,
    },
    operatorsContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingRight: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: darkMode ? '#303946' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 85, 
      height: 85,
      margin: 2,  
    },
    operatorButton: {
      backgroundColor: '#00b9d6',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 85,  
      height: 85,
      margin: 2,  
    },
    textButton: {
      color: darkMode ? 'white' : '#000000',
      fontSize: 30,  
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.numbersContainer}>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((button) => (
                <TouchableOpacity
                  key={button}
                  style={styles.button}
                  onPress={() => handleInput(button)}
                >
                  <Text style={styles.textButton}>{button}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.operatorsContainer}>
          {operators.map((operator) => (
            <TouchableOpacity
              key={operator}
              style={styles.operatorButton}
              onPress={() => handleInput(operator)}
            >
              <Text style={styles.textButton}>{operator}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
