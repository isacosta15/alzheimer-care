import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MemoryCard = ({ memory, onEdit, onDelete }) => {
  return (
    <View style={styles.memoryCard}>
      <View style={styles.memoryTextContainer}>
        <Text style={styles.memoryTitle}>{memory.name}</Text>
        <Text style={styles.memoryDate}>{memory.date}</Text>
      </View>
      <TouchableOpacity onPress={() => onEdit(memory)} style={styles.editButton}>
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(memory)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Diario() {
  const navigation = useNavigation();
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const storedMemories = await AsyncStorage.getItem('memories');
      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      }
    } catch (error) {
      console.error('Failed to load memories from AsyncStorage', error);
    }
  };

  const handleEdit = (memory) => {
    navigation.navigate('AdicionarMemoria', { memory, onSave: fetchMemories });
  };

  const handleDelete = (memory) => {
    Alert.alert(
      'Excluir Memória',
      'Tem certeza de que deseja excluir esta memória?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedMemories = memories.filter(item => item.id !== memory.id);
              await AsyncStorage.setItem('memories', JSON.stringify(updatedMemories));
              fetchMemories(); // Atualiza a lista após a exclusão
            } catch (error) {
              console.error('Failed to delete memory from AsyncStorage', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário de Memórias</Text>

      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemoryCard
            memory={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        style={styles.memoryList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdicionarMemoria', { onSave: fetchMemories })}>
        <Text style={styles.addButtonText}>Adicionar Lembrança</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  memoryList: {
    flex: 1,
    width: '100%',
  },
  memoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  memoryTextContainer: {
    flex: 1,
  },
  memoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memoryDate: {
    fontSize: 14,
    color: '#777',
  },
  editButton: {
    backgroundColor: '#FFB74D',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#E57373',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
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
