import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <View style={styles.brain}>
          {/* Desenhe um cérebro aqui!*/}
        </View>
      </View>
      <Text style={styles.title}>Bem-Vindo ao</Text>
      <Text style={styles.title}>Alzheimer Care</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42a5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 30,
  },
  brain: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00bcd4', // Cor do cérebro
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    color: '#42a5f5',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
