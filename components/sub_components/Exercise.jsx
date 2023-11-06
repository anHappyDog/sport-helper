import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseList from './ExerciseList';
import Sporting from './Sporting';
const ExerciseStack = createNativeStackNavigator();

const Exercise = function () {
    return (
        <ExerciseStack.Navigator>
            <ExerciseStack.Screen name="ExerciseList" component={ExerciseList} options={{ headerShown: false }} />
            <ExerciseStack.Screen name="Sporting" component={Sporting} options={{ headerShown: false }} />
        </ExerciseStack.Navigator>
    );
}


export default Exercise;