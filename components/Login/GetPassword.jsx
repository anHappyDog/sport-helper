import React, { useState } from "react";
import { Toast, Box, Center, Heading, VStack, HStack, FormControl, Input, Link, Button, Text, NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";



const GetPassword = function() {
    const navigation = useNavigation();
    const [username,setUsername] = useState('');
    const onClickFindPassword = function() {
        axios.post(axios.defaults.baseURL + "/api/ForgetPassword",{
            username,
        }).then(response=>{
            if (response.data['status'] == 0) {
                Toast.show({description:"发送邮件成功",duration:2000})
                navigation.navigate('Login');
            } else if (response.data['status'] == -1) {
                Toast.show({description:"用户名错误",duration:2000})        
            } else if (response.data['status'] == -2) {
                Toast.show({description:"服务端错误,请稍后重试",duration:2000})
        
            } else  {
                Toast.show({description:"未知错误,请稍后重试",duration:2000})
            }
        }).catch(err=>{
            Toast.show({description:"错误:" + err.toString(),duration:2000})
        })
    }
    return (
        <NativeBaseProvider>
            <Center w="100%" marginTop={"21%"}>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        找回密码
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        当然密码是找不会的，，
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>用户名</FormControl.Label>
                            <Input onChangeText={t => setUsername(t)} />
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={onClickFindPassword} >
                            找回密码
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                密码会发送到绑定邮箱上^^{" "}
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>

    );
}

export default GetPassword;
