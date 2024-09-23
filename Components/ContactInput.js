import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ContactInput = ({ onAddContact }) => {
  const [contactName, setContactName] = useState('');
  const [contactImage, setContactImage] = useState('https://img.icons8.com/bubbles/2x/user.png');

  const addContact = () => {
    if (contactName) {
      const newContact = {
        id: Math.random().toString(),
        name: contactName,
        imageUri: contactImage,
      };
      onAddContact(newContact);
      setContactName('');
      // Se necessário, resete o campo de imagem aqui
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Contato"
        value={contactName}
        onChangeText={setContactName}
      />
      {/* Adicione aqui um campo para alterar a imagem do contato se necessário */}
      <TouchableOpacity onPress={addContact} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Contato</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactInput;
