// components/ContactCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ContactCard = ({ name, imageUri, onCallPress, onDeletePress }) => {
  return (
    <View style={styles.contact}>
      <Image source={{ uri: imageUri }} style={styles.contactImage} />
      <Text style={styles.contactName}>{name}</Text>
      <TouchableOpacity style={styles.callButton} onPress={onCallPress}>
        <FontAwesome name="phone" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={onDeletePress}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  contactImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  callButton: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
});

export default ContactCard;
