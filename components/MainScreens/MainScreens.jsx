import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBaseScreen from '../sub_components/MainBaseScreen';
import Sporting from '../sub_components/Sporting';
import ArticleWrite from '../sub_components/ArticleWrite';
import OnSport from '../sub_components/OnSport';
import TeamCreate from '../sub_components/TeamCreate';
import TeamDetails from '../sub_components/TeamDetails';
import UserTeamManage from '../sub_components/UserTeamManage';
import MyArticles from '../sub_components/MyArticles';
import MyInfomation from '../sub_components/MyInfomation';
import MyChangeInformation from '../sub_components/MyChangeInfomation';
import SubmitError from '../sub_components/SubmitError';
import MyExerciseRecord from '../sub_components/MyExerciseRecord';
import SportPlan from '../sub_components/SportPlan';
import CityWalkPage from '../sub_components/CityWalkPage';
import CaloryPredict from '../sub_components/CaloryPredict'
import SportResult from '../sub_components/SportResult';
import ArticleShow from '../sub_components/ArticleShow';
const MainScreenStack = createNativeStackNavigator();

const MainScreen = function () {
    return (
                    <MainScreenStack.Navigator >
                        <MainScreenStack.Screen name="MainBaseScrene" component={MainBaseScreen} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="Sporting" component={Sporting} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="OnSport" component={OnSport} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="ArticleWrite" component={ArticleWrite} options={{headerShown:false}} />
                        <MainScreenStack.Screen name="TeamDetails" component={TeamDetails} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="TeamCreate" component={TeamCreate} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="UserTeamManage" component={UserTeamManage} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="MyArticles" component={MyArticles} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="MyInfomation" component={MyInfomation} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="MyChangeInformation" component={MyChangeInformation} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="SubmitError" component={SubmitError} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="MyExerciseRecord" component={MyExerciseRecord} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="CaloryPredict" component={CaloryPredict} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="SportPlan" component={SportPlan} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="CityWalkPage" component={CityWalkPage} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="SportResult" component={SportResult} options={{ headerShown: false }} />
                        <MainScreenStack.Screen name="ArticleShow" component={ArticleShow} options={{ headerShown: false }} />
                                                                                                                                                                                                                                                                                
                    </MainScreenStack.Navigator>
    );
}

export default MainScreen;