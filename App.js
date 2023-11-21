import { StatusBar } from 'expo-status-bar';
// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplitContextProvider } from './src/Context/SplitContext';
import { AuthContextProvider } from './src/Context/AuthContext';
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
function Settings() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// TODO: https://reactnavigation.org/docs/bottom-tab-navigator
// TODO: npm run ios

function App() {
  return (
    <AuthContextProvider>
      <SplitContextProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="SplitPicker" component={Main} options={{
              headerrRight: (props) => (
                <Text>LogIn</Text>
              )
            }} />
            <Tab.Screen name="Details" component={DetailsScreen} />
            <Tab.Screen name="Settings" component={Settings} options={{
              tabBarLabel: 'Updates',
            }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SplitContextProvider>
    </AuthContextProvider>
  );
}

export default App;