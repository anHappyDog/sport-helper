import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleShare from '../sub_components/ArticleShare';
import Exercise from '../sub_components/Exercise';
import TeamHall  from '../sub_components/TeamHall';
import UserProfile from '../sub_components/UserProfile';

const  MainScreenStack = createNativeStackNavigator();



const MainScreen = function() {
    return (
        <MainScreenStack.Navigator>
            <MainScreenStack.Screen name="Exercise" component={Exercise} />
            <MainScreenStack.Screen name="ArticleShare" component={ArticleShare} />
            <MainScreenStack.Screen name="TeamHall" component={TeamHall} />
            <MainScreenStack.Screen name="UserProfile" component={UserProfile} />
        </MainScreenStack.Navigator>
    );
}

export default MainScreen;