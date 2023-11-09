import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider,Box, Text, VStack, Pressable, Toast, Button, HStack, Heading } from 'native-base';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'native-base';
import axios from 'axios';


const UserProfile = function (props) {
    const navigation = useNavigation();
    const onClickExitBtn = function () {
        axios.get(axios.defaults.baseURL + "/api/SignOut").then(response=>{
            if (response.data['status'] == -1) {
                Toast.show({description:"退出失败,请重试!",duration:1500});
            } else if (response.data['status'] == 0) {
                AsyncStorage.removeItem("is_authenticate",()=>{});
                navigation.replace("Login");
                Toast.show({description:"退出成功!",duration:1500});
            }
        }).catch(err=>{
            Toast.show({description:"错误:" + err.toString(),duration:1500});
        });
    }

    return (
        <NativeBaseProvider>
            <Box position="relative" paddingTop={"20%"}>
                <VStack display={"flex"} alignItems={"center"} paddingX={"4"}
                    width={"100%"} borderWidth={"2"}>
                    <Avatar bg="amber.300" source={require('../../assets/avatar/avatar.jpg')}
                        width={"32"} height={"32"} position={"absolute"} top="-20%"></Avatar>
                    <Heading marginTop={"15%"} marginBottom={"3"} fontSize={"30"}>{"cc"}</Heading>

                    <Pressable onPress={() => { }} style={styles.functions}>
                        <Text style={styles.function_text}>个 人 信 息</Text>
                    </Pressable>

                    <Pressable style={styles.functions} onPress={() => { }}>
                        <Text style={styles.function_text}>修 改 信 息</Text>
                    </Pressable>

                    <Pressable style={styles.functions} onPress={() => { }}>
                        <Text style={styles.function_text}>我 的 分 享</Text>
                    </Pressable >
                    <Pressable style={styles.functions} onPress={() => { }}>
                        <Text style={styles.function_text}>我 的 锻 炼 记 录</Text>
                    </Pressable>
                    <Pressable style={styles.functions} onPress={() => { }}>
                        <Text style={styles.function_text}>提 交 反 馈</Text>
                    </Pressable>
                    <Button fontSize={20} colorScheme={"danger"} marginBottom={"4"} onPress={onClickExitBtn} width={"80%"}>退 出 登 录</Button>
                </VStack>
            </Box>

        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    functions: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 4,
        paddingTop: 6,
        paddingBottom: 6
    },
    function_text: {
        textAlign: "center",
        fontSize: 20
    }
});

export default UserProfile;