import { Heading, NativeBaseProvider, Text, Toast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from 'react';
import axios from "axios";
const MyInfomation = (props) => {
    const [information, setInformation] = useState({});
    const fetchInfomation = async function () {
        try {
            const response = await axios.get(axios.defaults.baseURL + "/api/GetUserInfo?username=" + props.route.params.username);
            if (response.data['status'] === 0) {
                setInformation(response.data['data']);
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
        }
    }
    useFocusEffect(useCallback(() => {
        fetchInfomation();
    }, []));
    return (
        <NativeBaseProvider>
            <Heading alignSelf={"center"}>个人信息</Heading>
            <Text>用户名:{information.username}</Text>
            <Text>电子邮箱:{information.email}</Text>
            <Text>电话号码:{information.phone}</Text>
            <Text>注册时间:{information.createTime}</Text>
            <Text>组队数:{information.teamCnt}</Text>
            <Text>单人锻炼数:{information.exerciseCnt}</Text>
        </NativeBaseProvider>
    );

}

export default MyInfomation;