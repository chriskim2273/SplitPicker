import { StatusBar } from 'expo-status-bar';
// In App.js in a new project
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SplitContextProvider } from './src/Context/SplitContext';
import { AuthContextProvider } from './src/Context/AuthContext';
import { AuthenticationButtons } from './src/Components/authenticationButtons';
import Main from './src/Pages/Main'
import ExerciseSelector from './src/Components/exerciseSelector';
import ChangeSplitModal from './src/Components/changeSplitModal';
import { PaperProvider } from 'react-native-paper';


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

// TODO: https://reactnavigation.org/docs/elements/#header

//const { store, persistor } = configureStore();

function App() {
  return (
    <AuthContextProvider>
      <SplitContextProvider>
        <PaperProvider>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="SplitPicker" component={Main} options={{
                headerRight: (props) => (
                  <AuthenticationButtons />
                ),
                headerTitle: (props) => <ChangeSplitModal />
              }} />
              <Tab.Screen name="Details" component={DetailsScreen} />
              <Tab.Screen name="Settings" component={Settings} options={{
                tabBarLabel: 'Updates',
              }} />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SplitContextProvider>
    </AuthContextProvider>
  );
}

export default App;