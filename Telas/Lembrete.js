import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function ReminderList() {
  const [reminders, setReminders] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadReminders();
      loadCategories();
    });
    return unsubscribe;
  }, [navigation]);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Erro ao carregar lembretes:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categories');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(updatedReminders);
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.error('Erro ao excluir lembrete:', error);
    }
  };

  const handleToggleDone = async (id) => {
    try {
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, done: !reminder.done } : reminder
      );
      setReminders(updatedReminders);
      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
    } catch (error) {
      console.error('Erro ao atualizar lembrete:', error);
    }
  };

  const formatTime = (time) => {
    // Verifica se o formato da hora está em "HH:mm" (por exemplo, "18:30")
    if (time.includes(':')) {
      return time; // Se já for uma hora, retorne como está
    }

    // Caso contrário, converte para o formato de hora legível
    const date = new Date(time);
    return !isNaN(date.getTime()) 
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'Hora inválida';
  };

  const renderReminderItem = (reminder) => (
    <View key={reminder.id} style={styles.reminderItem}>
      <TouchableOpacity onPress={() => handleToggleDone(reminder.id)}>
        <Ionicons
          name={reminder.done ? 'checkbox' : 'square-outline'}
          size={24}
          color="green"
        />
      </TouchableOpacity>
      <View style={styles.reminderInfo}>
        <Text style={styles.reminderText}>{reminder.name} - {formatTime(reminder.time)}</Text>
        <Text style={styles.reminderDetails}>{reminder.details}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('AdicionarLembrete', { reminder })}
        >
          <Ionicons name="pencil" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => Alert.alert(
            "Excluir Lembrete",
            "Tem certeza que deseja excluir este lembrete?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Excluir", onPress: () => handleDelete(reminder.id) }
            ]
          )}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const groupedReminders = categories.reduce((acc, category) => {
    acc[category] = reminders.filter(reminder => reminder.category === category);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {categories.map((category) => (
          <View key={category} style={styles.reminderSection}>
            <Text style={styles.sectionTitle}>{category}</Text>
            {groupedReminders[category].length > 0 ? (
              groupedReminders[category].map(renderReminderItem)
            ) : (
              <Text style={styles.noRemindersText}>Nenhum lembrete disponível.</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarLembrete')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  reminderSection: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  reminderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderDetails: {
    fontSize: 14,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#B8B8B8',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  noRemindersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});
