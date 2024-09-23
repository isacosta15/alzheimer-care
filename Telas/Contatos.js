// Telas/Contatos.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ContactCard from '../Components/ContactCard';
import ContactInput from '../Components/ContactInput';

const Contatos = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Julia', imageUri: 'https://img.icons8.com/bubbles/2x/user.png' },
    { id: '2', name: 'João', imageUri: 'https://img.icons8.com/bubbles/2x/user.png' },
  ]);

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alzheimer Care</Text>
        <MaterialIcons name="menu" size={30} color="black" />
      </View>

      <Text style={styles.sectionTitle}>Adicionar Novo Contato</Text>
      <ContactInput onAddContact={handleAddContact} />

      <Text style={styles.sectionTitle}>Contatos Responsáveis</Text>
      <View style={styles.contactContainer}>
        {contacts.map(contact => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            imageUri={contact.imageUri}
            onCallPress={() => console.log(`Chamando ${contact.name}`)}
            onDeletePress={() => handleDeleteContact(contact.id)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.emergencyButton}>
        <Text style={styles.emergencyButtonText}>Emergência</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contactContainer: {
    width: '100%',
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Contatos;
