import React from 'react';
import axios from 'axios';
import { Toast, Box, Center, Heading, VStack, HStack, FormControl, Input, Link, Button, Text, NativeBaseProvider } from 'native-base';
import { useState } from 'react';
function isValidPhoneNumber(phoneNumber) {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(phoneNumber);
  }
  
  // 检测电子邮箱
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  


const SignUp = function({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const onClickSignUp = function() {
        if (username == '') {
            Toast.show({description:"用户名不能为空",duration:1000});
        } else if (password == '') {
            Toast.show({description:"密码不能为空",duration:1000});
        } else if (email == '') {
            Toast.show({description:"电子邮箱不能为空",duration:1000});
        } else if (phone == '') {
            Toast.show({description:"电话号码不能为空",duration:1000});
        } else if (password.length < 8) {
            Toast.show({description:"密码长度不能小于8",duration:1000});  
        } else if (!isValidEmail(email)) {
            Toast.show({description:"Email邮箱格式不正确",duration:1000});      
        } else if (!isValidPhoneNumber(phone)) {
            Toast.show({description:"电话号码格式不正确",duration:1000});  
        }
        else {
            axios.post(axios.defaults.baseURL + "/api/SignUp",{
                username,
                password,
                email,
                phone
            }).then(response=>{
                if (response.data['status'] == 0) {
                    Toast.show({description:"注册成功",duration:2000});  
                    navigation.navigate('Login');
                } else if (response.data['status'] == -1) {
                    //
                    Toast.show({description:"该用户名已被注册",duration:1200});
                } else if (response.data['status'] == -2){
                    Toast.show({description:"服务端错误:" + response.data['msg'],duration:1000});
                } else {
                    Toast.show({description:"未知错误，请重试~",duration:1000});
                    
                }
            }).catch(err=>{
                Toast.show({description:err.toString(),duration:1000});  
        
            });
        }
    }

    return (
        <NativeBaseProvider>
            <Center w="100%" marginTop={"15%"}>
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        注册
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        很久以前就是很久以前
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>用户名</FormControl.Label>
                            <Input onChangeText={t => setUsername(t)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>电子邮箱</FormControl.Label>
                            <Input type="email" onChangeText={t => setEmail(t)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>电话号码</FormControl.Label>
                            <Input type="email" onChangeText={t => setPhone(t)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>密码</FormControl.Label>
                            <Input type="password" onChangeText={t => setPassword(t)} />
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={onClickSignUp} >
                            Sign Up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>

    );
}

export default SignUp;

