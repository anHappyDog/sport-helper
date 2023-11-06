import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleShare from '../sub_components/ArticleShare';
import Exercise from '../sub_components/Exercise';
import TeamHall from '../sub_components/TeamHall';
import UserProfile from '../sub_components/UserProfile';
import MainScreenFoot from '../sub_components/MainScreenFoot';
import { StyleSheet } from 'react-native';
const MainBaseScreenStack = createNativeStackNavigator();

const styles = StyleSheet.create({
    foot: {
        position: "absolute",
        width: "100%",
        bottom: "0%"
    }
});


const MainBaseScreen = function () {
    return (
        <NativeBaseProvider>
            <Box position={"relative"} safeArea height={"100%"} >
                <MainBaseScreenStack.Navigator >
                    <MainBaseScreenStack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
                    <MainBaseScreenStack.Screen name="ArticleShare" component={ArticleShare} options={{ headerShown: false }} />
                    <MainBaseScreenStack.Screen name="TeamHall" component={TeamHall} options={{ headerShown: false }} />
                    <MainBaseScreenStack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
                </MainBaseScreenStack.Navigator>
            </Box>
        </NativeBaseProvider>
    );
}

export default MainBaseScreen;