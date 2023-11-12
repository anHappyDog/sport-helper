import { Text, Button, FormControl, Toast, Input, VStack, HStack, Heading, NativeBaseProvider } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import axios from 'axios';
function isValidPhoneNumber(phoneNumber) {
    const regex = /^(\+\d{1,3}[- ]?)?\d{11}$/;
    return regex.test(phoneNumber);
}

// 检测电子邮箱
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}


const MyChangeInformation = (props) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [formerUsername,setFormerUsername] = useState('');
    const [formerPhone,setFormerPhone] = useState('');
    const [formerEmail,setFormerEmail] = useState('');
    
    const onClickChangeBtn = async function () {
        if (!isValidPhoneNumber(phone)) {
            Toast.show({description:"电话号码不符合格式",duration:2500});
        } else if (!isValidEmail(email)) {
            Toast.show({description:"电子邮箱不符合格式",duration:2500});
        } else {
            try{
                const response = await axios.post(axios.defaults.baseURL + "/api/ChangeUserInfo",{
                    username:username,
                    phone:phone,
                    email:email
                });
                if (response.data['status'] === 0) {
                    Toast.show({description:"修改成功",duration:2500});
                    navigation.goBack();

                } else {
                    Toast.show({description:response.data['msg'],duration:2500});
                }
            } catch(err) {
                console.log(err.toString());
                Toast.show({description:err.toString(),duration:2500});
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async function () {
        try {
            const response = await axios.get(axios.defaults.baseURL + "/api/GetUserInfo?username=" + props.route.params.username);
            if (response.data['status'] === 0) {
                console.log(JSON.stringify(response.data));
                setUsername(props.route.params.username);
                setPhone(response.data['data']['phone']);
                setEmail(response.data['data']['email']);
                setFormerUsername(props.route.params.username);
                setFormerPhone(response.data['data']['phone']);
                setFormerEmail(response.data['data']['email']);
            } else {
                Toast.show({ description: response.data['msg'], duration: 2500 });
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
        }
    }
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <VStack space={3} mt="5">
                    <Heading alignSelf={"center"}>修改信息</Heading>
                    <FormControl>
                        <FormControl.Label>用户名</FormControl.Label>
                        <Input fontSize={18} onChangeText={t => setUsername(t)} placeholder={formerUsername} value={username} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>电子邮箱</FormControl.Label>
                        <Input fontSize={18} onChangeText={t => setEmail(t)} placeholder={formerEmail}  value={email} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>电话号码</FormControl.Label>
                        <Input fontSize={18} onChangeText={t => setPhone(t)} placeholder={formerPhone} value={phone} />
                    </FormControl>
                    <HStack margin={4}>
                        <Button flex={1} colorScheme={"danger"} marginRight={4} onPress={onClickChangeBtn}>确认</Button>
                        <Button flex={1} onPress={navigation.goBack}>返回</Button>
                    </HStack>
                </VStack>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}

export default MyChangeInformation;