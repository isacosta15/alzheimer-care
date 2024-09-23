import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomPicker from '../Components/CustomPicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function AdicionarLembrete() {
  const [reminderName, setReminderName] = useState('');
  const [time, setTime] = useState({ hours: '00', minutes: '00' });
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Medicamento');
  const [categories, setCategories] = useState(['Medicamento', 'Consulta', 'Outros']);
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentReminderId, setCurrentReminderId] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params?.reminder) {
      const { reminder } = route.params;
      setReminderName(reminder.name);
      const [hours, minutes] = reminder.time.split(':');
      setTime({ hours, minutes });
      setDetails(reminder.details);
      setCategory(reminder.category);
      setCurrentReminderId(reminder.id);
      setIsEditing(true);
    }
    loadCategories();
  }, [route.params]);

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

  const askNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      return newStatus === 'granted';
    }
    return true;
  };

  const scheduleNotification = async (reminder) => {
    const hasPermission = await askNotificationPermission();
    if (!hasPermission) {
      Alert.alert('Permissão necessária', 'Você precisa permitir notificações para receber lembretes.');
      return;
    }

    const trigger = new Date();
    trigger.setHours(parseInt(reminder.time.split(':')[0]));
    trigger.setMinutes(parseInt(reminder.time.split(':')[1]));
    trigger.setSeconds(0);

    if (trigger.getTime() <= new Date().getTime()) {
      Alert.alert('Horário inválido', 'O horário do lembrete deve ser no futuro.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Lembrete",
        body: `Está na hora de: ${reminder.name}`,
      },
      trigger,
    });
  };

  const handleSave = async () => {
    if (!reminderName || !time.hours || !time.minutes) {
      Alert.alert('Campos obrigatórios', 'Nome e horário são obrigatórios.');
      return;
    }

    const newReminder = {
      id: currentReminderId || new Date().getTime().toString(),
      name: reminderName,
      time: `${time.hours}:${time.minutes}`,
      details,
      category,
      done: false,
    };

    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      const reminders = storedReminders ? JSON.parse(storedReminders) : [];
      const updatedReminders = isEditing
        ? reminders.map(reminder => (reminder.id === currentReminderId ? newReminder : reminder))
        : [...reminders, newReminder];

      await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));

      // Agendar a notificação
      scheduleNotification(newReminder);

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar lembrete:', error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory('');
      try {
        await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
      } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
      }
    } else {
      Alert.alert('Categoria inválida', 'Digite um nome válido para a nova categoria.');
    }
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    Alert.alert(
      'Excluir Categoria',
      `Você tem certeza que deseja excluir a categoria "${categoryToDelete}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            const updatedCategories = categories.filter(cat => cat !== categoryToDelete);
            setCategories(updatedCategories);
            if (category === categoryToDelete) {
              setCategory('Medicamento'); // Define uma categoria padrão
            }
            try {
              await AsyncStorage.setItem('categories', JSON.stringify(updatedCategories));
            } catch (error) {
              console.error('Erro ao excluir categoria:', error);
            }
          },
        },
      ],
    );
  };

  // Função para abrir o time picker
  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'time',
      is24Hour: true,
      onChange: (event, selectedTime) => {
        if (selectedTime) {
          const hours = selectedTime.getHours().toString().padStart(2, '0');
          const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
          setTime({ hours, minutes });
        }
        setShowTimePicker(false);  // Fecha o picker após a seleção
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Editar Lembrete' : 'Novo Lembrete'}</Text>

      <Text style={styles.label}>Nome do Lembrete</Text>
      <TextInput
        style={styles.input}
        value={reminderName}
        onChangeText={text => setReminderName(text)}
      />

      <Text style={styles.label}>Horário</Text>
      <TouchableOpacity style={styles.input} onPress={openTimePicker}>
        <Text>{`${time.hours}:${time.minutes}` || 'Selecione o horário'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Especificações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={details}
        onChangeText={text => setDetails(text)}
        multiline
      />

      <Text style={styles.label}>Categoria</Text>
      <CustomPicker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue)}
        options={[...categories.map(cat => ({ label: cat, value: cat })), { label: 'Outro', value: 'Outro' }]}
      />

      {category === 'Outro' && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome da nova categoria"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TouchableOpacity style={styles.addCategoryButton} onPress={handleAddCategory}>
            <Text style={styles.addCategoryText}>Adicionar Categoria</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.label}>Categorias Existentes</Text>
      {categories.map(cat => (
        <View key={cat} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{cat}</Text>
          <TouchableOpacity onPress={() => handleDeleteCategory(cat)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{isEditing ? 'Salvar Alterações' : 'Salvar Lembrete'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 80,
  },
  addCategoryButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addCategoryText: {
    color: '#FFF',
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#00796B',
    padding: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
