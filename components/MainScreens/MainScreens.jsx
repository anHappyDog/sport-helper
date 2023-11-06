import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBaseScreen from '../sub_components/MainBaseScreen';
import Sporting from '../sub_components/Sporting';

const MainScreenStack = createNativeStackNavigator();

const MainScreen = function () {
    return (
                    <MainScreenStack.Navigator >
                        <MainScreenStack.Screen name="MainBaseScrene" component={MainBaseScreen} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="Sporting" component={Sporting} options={{headerShown:false}} />
                    </MainScreenStack.Navigator>
    );
}

export default MainScreen;