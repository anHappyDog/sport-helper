import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleShare from '../sub_components/ArticleShare';
import ExerciseList from './ExerciseList';
import TeamHall from '../sub_components/TeamHall';
import UserProfile from '../sub_components/UserProfile';
import MainScreenFoot from './MainScreenFoot';
import { StyleSheet } from 'react-native';
const MainBaseScreenStack = createNativeStackNavigator();

const styles = StyleSheet.create({
    foot: {
        position:"absolute",
        bottom:"0%",
        width: "100%"
    }
});


const MainBaseScreen = function () {
    return (
        <NativeBaseProvider>
            <Box height="100%" position={"relative"}>
                <Box safeArea height={"89%"} >
                    <MainBaseScreenStack.Navigator >
                        <MainBaseScreenStack.Screen name="Exercise" component={ExerciseList} options={{ headerShown: false }} />
                        <MainBaseScreenStack.Screen name="ArticleShare" component={ArticleShare} options={{ headerShown: false }} />
                        <MainBaseScreenStack.Screen name="TeamHall" component={TeamHall} options={{ headerShown: false }} />
                        <MainBaseScreenStack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
                    </MainBaseScreenStack.Navigator>
                </Box>
                <Box style={styles.foot}>
                    <MainScreenFoot  />
                </Box>
            </Box>

        </NativeBaseProvider>
    );
}

export default MainBaseScreen;