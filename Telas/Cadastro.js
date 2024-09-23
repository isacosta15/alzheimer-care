import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [patientName, setPatientName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [contact, setContact] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!patientName || !responsibleName || !contact || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Erro', 'Você deve aceitar os termos de uso.');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem(email);
      
      if (storedUser) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      } else {
        const user = {
          patientName,
          responsibleName,
          contact,
          email,
          password,
        };
        
        await AsyncStorage.setItem(email, JSON.stringify(user));
        Alert.alert(
          'Sucesso',
          'Conta criada com sucesso!',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100x100.png?text=Logo' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Alzheimer Care</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Paciente"
          value={patientName}
          onChangeText={setPatientName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do Responsável"
          value={responsibleName}
          onChangeText={setResponsibleName}
        />
        <TextInput
          style={styles.input}
          placeholder="Contato"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.checkboxContainer}>
          <Switch
            value={isChecked}
            onValueChange={setIsChecked}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isChecked ? '#f5dd4b' : '#f4f3f4'}
          />
          <Text style={styles.checkboxLabel}>Termos de uso</Text>
        </View>
        <Text style={styles.termsText}>Eu concordo com os termos desse APP</Text>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  termsText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  signupButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
