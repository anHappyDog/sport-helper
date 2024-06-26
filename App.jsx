import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./components/Login/Login";
import MainScreen from "./components/MainScreens/MainScreens";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from './components/Login/SignUp';
import GetPassword from "./components/Login/GetPassword";
import { NativeBaseProvider, ToastProvider } from "native-base";
axios.defaults.baseURL = 'https://android.api.lonelywatch.com';

const MainStack = createStackNavigator();
const App = function ({ navigation }) {
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    const token = AsyncStorage.getItem('is_authenticate');
    if (token != null && token == "true") {
      navigation.replace("MainScreen");
    }

  }, []);
  return (
    <NativeBaseProvider>
      <ToastProvider>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }}></MainStack.Screen>
            <MainStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <MainStack.Screen name="GetPassword" component={GetPassword} options={{ headerShown: false }} />
            <MainStack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}></MainStack.Screen>

          </MainStack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </NativeBaseProvider>


  );
}
export default App;