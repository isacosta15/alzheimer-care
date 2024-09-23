import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [disease, setDisease] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carregar dados ao iniciar o componente
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedAge = await AsyncStorage.getItem('age');
        const savedDisease = await AsyncStorage.getItem('disease');
        const savedAddress = await AsyncStorage.getItem('address');
        const savedEmail = await AsyncStorage.getItem('email');

        if (savedName !== null) setName(savedName);
        if (savedAge !== null) setAge(savedAge);
        if (savedDisease !== null) setDisease(savedDisease);
        if (savedAddress !== null) setAddress(savedAddress);
        if (savedEmail !== null) setEmail(savedEmail);
      } catch (error) {
        console.error('Erro ao carregar dados: ', error);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('age', age);
      await AsyncStorage.setItem('disease', disease);
      await AsyncStorage.setItem('address', address);
      await AsyncStorage.setItem('email', email);
      Alert.alert('Dados Salvos', 'As informações foram salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alzheimer Care</Text>
        <MaterialIcons name="menu" size={30} color="black" />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/bubbles/2x/user.png' }} // Ícone de usuário
          style={styles.profileImage}
          accessibilityLabel="Imagem de perfil"
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          accessibilityLabel="Nome"
          accessibilityHint="Digite seu nome"
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
          keyboardType="numeric"
          accessibilityLabel="Idade"
          accessibilityHint="Digite sua idade"
        />

        <Text style={styles.label}>Doença</Text>
        <TextInput
          style={styles.input}
          value={disease}
          onChangeText={text => setDisease(text)}
          accessibilityLabel="Doença"
          accessibilityHint="Digite o nome da doença"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={text => setAddress(text)}
          accessibilityLabel="Endereço"
          accessibilityHint="Digite seu endereço"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          accessibilityLabel="Email"
          accessibilityHint="Digite seu email"
        />

        <TouchableOpacity 
          style={[styles.saveButton, loading && { opacity: 0.6 }]} 
          onPress={handleSave}
          disabled={loading}
          accessibilityLabel="Salvar dados do perfil"
          accessibilityHint="Toque para salvar as informações do perfil"
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#7EBBD6',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
