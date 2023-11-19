import { StatusBar } from 'expo-status-bar';
// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplitContextProvider } from './src/Context/SplitContext';
import Main from './src/Pages/Main'


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// TODO: https://reactnavigation.org/docs/bottom-tab-navigator
// TODO: npm run ios

function App() {
  return (
    <SplitContextProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SplitPicker" component={Main} />
          <Tab.Screen name="Details" component={DetailsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SplitContextProvider>
  );
}

export default App;