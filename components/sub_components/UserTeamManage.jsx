import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios';
import { Heading, NativeBaseProvider,Box,Toast} from "native-base";
import { FlatList } from "react-native-gesture-handler";
import TeamCard from "./TeamCard";
const UserTeamManage = () => {
    const [myTeam, setMyTeam] = useState([]);
    useFocusEffect(useCallback(() => {
        axios.get(axios.defaults.baseURL + "/api/GetMyTeam").then(response => {
            if (response.data['status'] == 0) {
                setMyTeam(response.data['data']);
            } else {
                Toast.show({ description: response.data['msg'], duration: 3500 });
                console.log(response.data['msg']);
            }
        }).catch(err => {
            Toast.show({ description:err.toString() + ";请退出重试", duration: 3500 });
        })
    }, []));

    return (
        <NativeBaseProvider>
            <Box display={"flex"} justifyContent={"center"} >
                <Heading alignSelf={"center"}>我创建的组队</Heading>
                <FlatList data={myTeam} renderItem={({ item, index }) => (
                    <TeamCard key={index} team={item} />
                )} />
            </Box>
        </NativeBaseProvider>
    );

}

export default UserTeamManage;