import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBaseScreen from '../sub_components/MainBaseScreen';
import Sporting from '../sub_components/Sporting';
import ArticleWrite from '../sub_components/ArticleWrite';
import OnSport from '../sub_components/OnSport';
import ArticlePage from '../sub_components/ArticlePage';
const MainScreenStack = createNativeStackNavigator();

const MainScreen = function () {
    return (
                    <MainScreenStack.Navigator >
                        <MainScreenStack.Screen name="MainBaseScrene" component={MainBaseScreen} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="Sporting" component={Sporting} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="OnSport" component={OnSport} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="ArticleWrite" component={ArticleWrite} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="ArticlePage" component={ArticlePage} options={{headerShown:false}} />
                        
                    </MainScreenStack.Navigator>
    );
}

export default MainScreen;