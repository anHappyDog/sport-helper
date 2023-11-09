import React, { useState } from "react";
import { Toast, Box, Center, Heading, VStack, HStack, FormControl, Input, Link, Button, Text, NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = function ({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onClickSignIn = function () {
        axios.post(axios.defaults.baseURL + "/api/SignIn", {
            username: username,
            password: password,
        }).then(response => {
            if (response.data['status'] == 0) {
                AsyncStorage.setItem('is_authenticate', true.toString());
                navigation.navigate("MainScreen");
                Toast.show({ description: "登陆成功!",duration:1500});
            } else if (response.data['status'] == -1) {
                Toast.show({description:"不存在该用户",duration:1500});
            } else if (response.data['status'] == -2) {
                Toast.show({ description: "密码错误!",duration:1500});  
            } else {
                Toast.show({ description: "未知错误!请重试",duration:1500});
            }
        }).catch(err => {
            Toast.show({ description: err.toString(),duration:3000});
        });
    }
    const onGotoSignUp = function () {
        navigation.navigate('SignUp');  
    }
    const onGotoForgetPassword = function () {
        navigation.navigate('GetPassword');
    }
    return (
        <NativeBaseProvider>
            <Center w="100%" marginTop={"21%"}>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        欢迎
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        请登录
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>用户名</FormControl.Label>
                            <Input onChangeText={t => setUsername(t)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>密码</FormControl.Label>
                            <Input type="password" onChangeText={t => setPassword(t)} />
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1" onPress={onGotoForgetPassword} >
                                忘记密码?
                            </Link>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={onClickSignIn} >
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                我是新用户{" "}
                            </Text>
                            <Link _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={onGotoSignUp}>
                                请注册
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>

    );
}

export default Login;
