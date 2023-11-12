import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { NativeBaseProvider, Toast, Image, VStack, HStack, Text, Button, Box } from "native-base";
import axios from 'axios';
import { FlatList } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { covers } from './StaticResources';
import { useNavigation } from "@react-navigation/native";
const TeamDetails = function (props) {
    const [teamDetails, setTeamDetails] = useState({});
    const [isCreater, setIsCreater] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const navigation = useNavigation();
    const fetchTeamData = function () {
        axios.post(axios.defaults.baseURL + "/api/GetTeamDetails", { teamId: props.route.params.teamId }).then(response => {
            if (response.data['status'] === 0) {
                setTeamDetails(response.data['data']);
                setIsCreater(response.data['self']);
                setIsMember(response.data['isMember']);
                console.log(isCreater, isMember);
                console.log(JSON.stringify(response.data));
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
            }
        }).catch(err => {
            Toast.show({ description: err.toString(), duration: 2500 });
        })
    }
    useFocusEffect(useCallback(fetchTeamData, []));
    const onClickStartTeam = async function () {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/api/StartTeam", { teamId: props.route.params.teamId });
            if (response.data['status'] == 0) {
                fetchTeamData();
                Toast.show({ description: "开始锻炼!", duration: 2500 });
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
                console.log(response.data['msg']);
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
            console.log(err.toString());
        }
    }
    const onClickAddTeam = async function () {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/api/JoinTeam", { teamId: props.route.params.teamId });
            if (response.data['status'] == 0) {
                fetchTeamData();
                Toast.show({ description: "加入成功", duration: 2500 });
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
                console.log(response.data['msg']);
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
            console.log(err.toString());
        }
    };
    const onClickQuitTeam = async function () {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/api/LeaveTeam", { teamId: props.route.params.teamId });
            if (response.data['status'] == 0) {
                navigation.goBack();
                Toast.show({ description: "退出成功", duration: 2500 });

            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
                console.log(response.data['msg']);
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
            console.log(err.toString());
        }
    };
    const onClickDestroyTeam = async function () {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/api/DestroyTeam", { teamId: props.route.params.teamId });
            if (response.data['status'] == 0) {
                navigation.goBack();
                Toast.show({ description: "解散成功", duration: 2500 });
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
                console.log(response.data['msg']);
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
            console.log(err.toString());
        }
    };
    const onClickEndTeam = async function () {
        try {
            const response = await axios.post(axios.defaults.baseURL + "/api/EndTeam", { teamId: props.route.params.teamId });
            if (response.data['status'] == 0) {
                navigation.goBack();
                Toast.show({ description: "结束组队锻炼成功!", duration: 2500 });
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
                console.log(response.data['msg']);
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
            console.log(err.toString());
        }
    }
    return (
        <NativeBaseProvider>
            <VStack>
                <Text>组名:{teamDetails.teamName}</Text>
                <Text>队长:{teamDetails.createPersonName}</Text>
                <Text>当前人数/最大人数:{teamDetails.curPersonCnt}/{teamDetails.maxPersonCnt}</Text>
                <Text>创建时间:{teamDetails.createTime}</Text>
                {
                    teamDetails.teamState === 'R' ? <Text>队伍状态:还在组队中</Text> :
                        ((teamDetails.teamState == 'O') ? (<Box><Text>队伍状态:正在锻炼中</Text><Text>开始时间:{teamDetails.startTime}</Text></Box>) :
                            <Box><Text>队伍状态:已经结束</Text><Text>结束时间:{teamDetails.endTime}</Text></Box>)
                }
                <Box padding={4}>
                    {

                        isCreater === true ? (
                            (teamDetails.teamState == 'R') ?
                                <Box>
                                    <Button onPress={onClickStartTeam}>开始锻炼</Button>
                                    <Button colorScheme={"danger"} onPress={onClickDestroyTeam}>解散组队</Button></Box> :
                                (teamDetails.teamState == 'O') ? <Button colorScheme={"danger"} onPress={onClickEndTeam}>完成锻炼</Button> : <></>
                        ) : (teamDetails.teamState == 'R') ? (isMember === true ? (<Button colorScheme={"danger"} onPress={onClickQuitTeam}>退出队伍
                        </Button>) : (<Button onPress={onClickAddTeam}>加入队伍</Button>)) : <></>

                    }
                </Box>
                <Text>当前组员:</Text>
                <FlatList data={teamDetails.members} renderItem={({ item, index }) => (
                    <Pressable key={index} onPress={() => { navigation.navigate('MyInfomation',{username:item.username}); }} borderWidth={2} paddingTop={4} paddingBottom={4}>
                        {/* <Image width={32} height={32} source={{ uri: item.avatarAddress === '' ? '../../assets/jpg/avatar.jpg' : item.avatarAddress }}></Image> */}
                        <HStack marginLeft={4} alignItems={"center"} >
                            <Image source={{ uri: axios.defaults.baseURL + item.avatarAddress }} borderRadius={20} width={16} height={16} alt={"avatar"} />
                            <Text fontSize={24} marginLeft={4}>{item.username} ({teamDetails.createPersonName === item.username ? "队长" : "组员"})</Text>
                        </HStack>
                    </Pressable>
                )}>
                </FlatList>
            </VStack>
        </NativeBaseProvider>
    );

}

export default TeamDetails;