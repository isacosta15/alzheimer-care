import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [sleep, setSleep] = useState(null);
  const [food, setFood] = useState(null);
  const [medications, setMedications] = useState(null);
  const [daySummary, setDaySummary] = useState('');

  const handlePress = (type, value) => {
    if (type === 'sleep') {
      setSleep(value);
    } else if (type === 'food') {
      setFood(value);
    } else if (type === 'medications') {
      setMedications(value);
    }
  };

  const generateReport = async () => {
    const reportContent = `
      Sono: ${sleep}
      Alimentação: ${food}
      Medicamentos: ${medications}
      Resumo do Dia: ${daySummary}
    `;

    const filePath = `${FileSystem.documentDirectory}report.txt`;

    try {
      await FileSystem.writeAsStringAsync(filePath, reportContent);
      Alert.alert('Relatório Gerado', 'O relatório foi salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o relatório:', error);
    }
  };

  const viewReport = async () => {
    const filePath = `${FileSystem.documentDirectory}report.txt`;

    try {
      const reportContent = await FileSystem.readAsStringAsync(filePath);
      Alert.alert('Relatório', reportContent);
    } catch (error) {
      console.error('Erro ao visualizar o relatório:', error);
      Alert.alert('Erro', 'Não foi possível acessar o relatório.');
    }
  };

  const deleteReport = async () => {
    const filePath = `${FileSystem.documentDirectory}report.txt`;

    try {
      await FileSystem.deleteAsync(filePath);
      Alert.alert('Relatório Deletado', 'O relatório foi deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o relatório:', error);
      Alert.alert('Erro', 'Não foi possível deletar o relatório.');
    }
  };

  const shareReport = async () => {
    const filePath = `${FileSystem.documentDirectory}report.txt`;

    try {
      await Sharing.shareAsync(filePath);
    } catch (error) {
      console.error('Erro ao compartilhar o relatório:', error);
      Alert.alert('Erro', 'Não foi possível compartilhar o relatório.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alzheimer Care</Text>
        <MaterialIcons name="menu" size={30} color="black" />
      </View>

      <Text style={styles.title}>Monitoramento Bem-Estar</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Sono</Text>
        <View style={styles.emojis}>
          {renderEmojis('sleep', sleep, handlePress)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Alimentação</Text>
        <View style={styles.emojis}>
          {renderEmojis('food', food, handlePress)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Medicamentos</Text>
        <View style={styles.emojis}>
          {renderEmojis('medications', medications, handlePress)}
        </View>
      </View>

      <Text style={styles.label}>Fale sobre o seu dia</Text>
      <TextInput
        style={styles.input}
        placeholder="Value"
        value={daySummary}
        onChangeText={setDaySummary}
      />

      <TouchableOpacity style={styles.button} onPress={generateReport}>
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={viewReport}>
        <Text style={styles.buttonText}>Ver Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteReport}>
        <Text style={styles.buttonText}>Deletar Relatório</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={shareReport}>
        <Text style={styles.buttonText}>Compartilhar Relatório</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const renderEmojis = (type, selectedValue, handlePress) => {
  const emojis = [
    { value: 1, emoji: '😡' },
    { value: 2, emoji: '😠' },
    { value: 3, emoji: '😐' },
    { value: 4, emoji: '🙂' },
    { value: 5, emoji: '😁' },
  ];

  return emojis.map(({ value, emoji }) => (
    <TouchableOpacity key={value} onPress={() => handlePress(type, value)}>
      <Text style={[styles.emoji, selectedValue === value && styles.selectedEmoji]}>
        {emoji}
      </Text>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#B2E0FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  emojis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emoji: {
    fontSize: 30,
  },
  selectedEmoji: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

export default App;
