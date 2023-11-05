import React from "react";
import { Toast, Box, Center, Heading, VStack, HStack, FormControl, Input, Link, Button, Text, NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = function ({ navigation }) {
    const onClickSignIn = function () {
        axios.post(axios.defaults.baseURL + "/api/signIn", {
            username: "",
            password: "",
        }).then(response => {
            AsyncStorage.setItem('is_authenticate', true)
            .then(() => {
                navigation.replace("MainScreen");
                Toast.show({ description: "Ok" });                    
             })
            .catch(err => {
                 Toast.show({ description: err }) 
            });
        }).catch(err => {
            Toast.show({ description: err });
        });
        if (response.status != 0) {

        } else {
            navigation.replace('MainScreen');
            toast.show({ description: "Ok!" });
        }

    }
    const onGotoSignUp = function () {

    }
    const onGotoForgetPassword = function () {

    }
    return (
        <NativeBaseProvider>
            <Center w="100%" marginTop={100}>
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
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>密码</FormControl.Label>
                            <Input type="password" />
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1" onPress={() => { navigation.navigate("GetPassword"); }} >
                                忘记密码?
                            </Link>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={() => Toast.show({ description: "asd" })} >
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
                            }} onPress={() => { navigation.navigate("SignUp"); }}>
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
