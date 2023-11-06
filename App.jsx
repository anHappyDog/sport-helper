import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./components/Login/Login";
import MainScreen from "./components/MainScreens/MainScreens";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from './components/Login/SignUp';
import GetPassword from "./components/Login/GetPassword";

axios.defaults.baseURL = 'http://10.0.2.2:8000';

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
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Login" component={Login} options={{ headerShown: false }}></MainStack.Screen>
        <MainStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <MainStack.Screen name="GetPassword" component={GetPassword} options={{ headerShown: false }} />
        
        <MainStack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}></MainStack.Screen>

      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default App;