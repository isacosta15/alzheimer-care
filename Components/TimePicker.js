// TimePicker.js
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimePicker = ({ visible, onClose, onTimeChange, time }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={time.hours}
            onValueChange={(itemValue) => onTimeChange({ ...time, hours: itemValue })}
            style={styles.picker}
          >
            {hours.map(hour => (
              <Picker.Item key={hour} label={hour} value={hour} />
            ))}
          </Picker>
          <Picker
            selectedValue={time.minutes}
            onValueChange={(itemValue) => onTimeChange({ ...time, minutes: itemValue })}
            style={styles.picker}
          >
            {minutes.map(minute => (
              <Picker.Item key={minute} label={minute} value={minute} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    width: 300,
    padding: 20,
    alignItems: 'center',
  },
  picker: {
    width: '100%',
    height: 150,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TimePicker;
