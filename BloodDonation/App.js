import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './pages/Start';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Start} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='HomePage' component={HomePage} />

      </Stack.Navigator>
    </NavigationContainer>
  )
};


export default App;