import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdicionarMemoria = ({ navigation, route }) => {
  const [memoryName, setMemoryName] = useState(route.params?.memory?.name || '');
  const [memoryDescription, setMemoryDescription] = useState(route.params?.memory?.description || '');
  const [memoryDate, setMemoryDate] = useState(route.params?.memory?.date ? new Date(route.params.memory.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || memoryDate;
    setShowDatePicker(false);
    setMemoryDate(currentDate);
  };

  const addMemory = async () => {
    if (memoryName && memoryDescription) {
      const newMemory = {
        id: route.params?.memory?.id || Math.random().toString(),
        name: memoryName,
        description: memoryDescription,
        date: memoryDate.toDateString(),
      };
      try {
        const existingMemories = await AsyncStorage.getItem('memories');
        const memories = existingMemories ? JSON.parse(existingMemories) : [];
        
        if (route.params?.memory) {
          // Update existing memory
          const updatedMemories = memories.map(memory =>
            memory.id === newMemory.id ? newMemory : memory
          );
          await AsyncStorage.setItem('memories', JSON.stringify(updatedMemories));
        } else {
          // Add new memory
          memories.push(newMemory);
          await AsyncStorage.setItem('memories', JSON.stringify(memories));
        }
        
        if (route.params?.onSave) {
          route.params.onSave(); // Atualiza a lista na página Diário
        }
        navigation.goBack();
      } catch (error) {
        console.error('Failed to save memory to AsyncStorage', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params?.memory ? 'Editar Memória' : 'Adicionar Memória'}</Text>
      <Text style={styles.label}>Nome da Memória</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={memoryName}
        onChangeText={setMemoryName}
      />

      <Text style={styles.label}>Descrição da Memória</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Descrição"
        value={memoryDescription}
        onChangeText={setMemoryDescription}
        multiline
      />

      <Text style={styles.label}>Data da Memória</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{memoryDate.toDateString()}</Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={memoryDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity onPress={addMemory} style={styles.addButton}>
        <Text style={styles.addButtonText}>Salvar Memória</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#FFF',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdicionarMemoria;
