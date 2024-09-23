// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './Telas/Inicio';
import Login from './Telas/Login';
import Cadastro from './Telas/Cadastro';
import Home from './Telas/Home';
import Monitoramento from './Telas/Monitoramento';
import Contatos from './Telas/Contatos';
import Lembrete from './Telas/Lembrete';
import Diario from './Telas/Diario';
import AdicionarLembrete from './Telas/AdicionarLembrete';
import AdicionarMemoria from './Telas/AdicionarMemoria';
import Localizacao from './Telas/Localizacao';
import Perfil from './Telas/Perfil';

//import { createTables } from './database';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    //createTables();  // Cria as tabelas ao iniciar o app
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Monitoramento" component={Monitoramento} />
        <Stack.Screen name="Contatos" component={Contatos} />
        <Stack.Screen name="Lembrete" component={Lembrete} />
        <Stack.Screen name="Diario" component={Diario} />
        <Stack.Screen name="AdicionarLembrete" component={AdicionarLembrete} />
        <Stack.Screen name="AdicionarMemoria" component={AdicionarMemoria} />
        <Stack.Screen name="Localizacao" component={Localizacao} />
        <Stack.Screen name="Perfil" component={Perfil} />
        {/* Adicione outras telas aqui conforme for criando */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
