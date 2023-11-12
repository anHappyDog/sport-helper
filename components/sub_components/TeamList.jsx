import React, { useState,useCallback } from 'react';
import { NativeBaseProvider, Text, Box,Toast } from 'native-base';
import axios from 'axios';
import TeamCard from './TeamCard';
import { FlatList } from 'react-native-gesture-handler';
import FabWithSvg from './FabWithSvg';
import TeamCreateSvg from '../../assets/svg/TeamCreateSvg.svg';
import { useFocusEffect } from '@react-navigation/native';
const TeanList = function ({ navigation}) {
    useFocusEffect(useCallback(()=>{
        axios.get(axios.defaults.baseURL + "/api/GetTeams").then(response=>{
            if (response.data['status'] == 0) {
                setTeamData(response.data['data']);
            }
            else {
                Toast.show({description: response['msg'] + ",请退出重试",duration:2500});
            }
        }).catch(err=>{
            Toast.show({description:err.toString() + ",请退出重试",duration:2500});
        });
    },[]));
    const onClickCreateTeam = async function () {
        try {
            const response = await axios.get(axios.defaults.baseURL + "/api/GetSportList");
            if (response.data['status'] == 0) {
                Toast.show({ description: "成功", duration: 1500 });
                navigation.navigate('TeamCreate', { sportList: response.data['data'] });
            } else {
                Toast.show({ description: response.data['msg'] + ",请重试", duration: 1500 });
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 1500 });
        }
    }
    const [teamData, setTeamData] = useState([]);
    return (

        <NativeBaseProvider>
            <FlatList data={teamData} renderItem={({ item, index }) => (
                <TeamCard key={index} team={item} />
            )} />
            <Box position={"absolute"} right={"5%"} bottom={"1%"} zIndex={1}>
                <FabWithSvg svg={TeamCreateSvg} onPress={
                    onClickCreateTeam
                } />
            </Box>
        </NativeBaseProvider>
    );
};

export default TeanList;