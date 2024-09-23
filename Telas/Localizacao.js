import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [history, setHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null); // Referência para o MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar localização foi negada.');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = currentLocation.coords;

      setLocation(coords);
      // Salva a localização no histórico
      setHistory(prevHistory => [...prevHistory, coords]);
    })();
  }, []);

  const centerMapOnLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000); // Animação de 1 segundo
    }
  };

  let latitude = 37.7749;
  let longitude = -122.4194;

  if (location) {
    latitude = location.latitude;
    longitude = location.longitude;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://example.com/logo.png' }} // Substitua pelo link da sua logo
          style={styles.logo} 
        />
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef} // Conecta o MapView ao ref
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={'Minha Localização'}
              description={'Você está aqui'}
            />
          )}
        </MapView>

        {/* Botão para centralizar a localização */}
        <TouchableOpacity style={styles.centerButton} onPress={centerMapOnLocation}>
          <Text style={styles.centerButtonText}>Centralizar</Text>
        </TouchableOpacity>
      </View>

      {/* Histórico de Localizações */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Histórico de Localizações</Text>
        {history.map((loc, index) => (
          <TouchableOpacity key={index} style={styles.historyItem}>
            <Text>Latitude: {loc.latitude}, Longitude: {loc.longitude}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão de Alerta */}
      <TouchableOpacity style={styles.alertButton}>
        <Text style={styles.alertButtonText}>Alerta!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 5,
  },
  centerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyContainer: {
    marginHorizontal: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  alertButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
