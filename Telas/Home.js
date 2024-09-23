import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function App({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-250)); // Valor inicial para o menu fora da tela

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Fecha o menu (move para fora da tela)
      Animated.timing(menuAnimation, {
        toValue: -250, // Esconde o menu
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    } else {
      // Abre o menu (move para dentro da tela)
      setIsMenuOpen(true);
      Animated.timing(menuAnimation, {
        toValue: 0, // Mostra o menu
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Alzheimer Care</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons
              name={isMenuOpen ? "close" : "menu"} // Alterna entre ícone de menu e "X"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lembrete')}>
              <MaterialIcons name="list" size={60} color="black" />
              <Text style={styles.buttonText}>Lembretes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Diario')}>
              <FontAwesome name="book" size={60} color="black" />
              <Text style={styles.buttonText}>Diário</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Monitoramento')}>
              <FontAwesome name="heart" size={60} color="black" />
              <Text style={styles.buttonText}>Monitoramento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contatos')}>
              <MaterialIcons name="contacts" size={60} color="black" />
              <Text style={styles.buttonText}>Contatos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.remindersContainer}>
          <Text style={styles.remindersTitle}>Lembretes Ativos</Text>
          <View style={styles.reminder}>
            <Text>Medicamento 1 - 18:30</Text>
          </View>
          <View style={styles.reminder}>
            <Text>Medicamento 2 - 21:30</Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.locationTitle}>Localização</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.7749,
              longitude: -122.4194,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </ScrollView>

      {/* Menu lateral que aparece da esquerda */}
      <Animated.View style={[styles.menu, { left: menuAnimation }]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.menuItemText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Localizacao')}>
          <Text style={styles.menuItemText}>Localização</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#7EBBD6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    width: 150,
    height: 150,
  },
  buttonText: {
    marginTop: 5,
    fontSize: 17,
    textAlign: 'center',
  },
  remindersContainer: {
    marginBottom: 20,
  },
  remindersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  reminder: {
    backgroundColor: '#B3E5FC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  mapContainer: {
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  // Estilo para o menu lateral que sobrepõe a tela vindo da esquerda
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 18,
    color: '#333',
  },
});
