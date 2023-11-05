import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./components/Login/Login";
import MainScreen from "./components/MainScreens/MainScreens";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const MainStack = createStackNavigator();
const App = function () {
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('is_authenticate');
      setIsLogIn(token != null && token == "true");
    }
  });
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {isLogIn ? (
          <MainStack.Screen name="Login" component={Login} ></MainStack.Screen>
        ) : (<MainStack.Screen name="MainScreen" component={MainScreen} ></MainStack.Screen>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
export default App;