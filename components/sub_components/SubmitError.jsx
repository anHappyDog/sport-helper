import { HStack, Heading, NativeBaseProvider, Button, TextArea, VStack, Toast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import axios from 'axios';
const SubmitError = () => {
    const navigation = useNavigation();
    const [content, setContent] = useState('');
    const onClickSubmitFeedback = function () {
        if (content === '') {
            Toast.show({ description: "反馈不能为空", duration: 1500 });
            return;
        }
        axios.post(axios.defaults.baseURL + "/api/SubmitFeedBack"
            , { content: content }).then(response => {
                if (response.data['status'] == 0) {

                    navigation.navigate("UserProfile"); 
                    Toast.show({ description: "提交成功", duration: 1500 });
                } else {
                    Toast.show({ description: response.data['msg'], duration: 1500 });
                }
            }).catch(err => {
                Toast.show({ description: err.toString(), duration: 1500 });

            });
    }
    return (
        <NativeBaseProvider>
            <VStack display={"flex"} padding={6} justifyContent={"center"} alignItems={"center"}>
                <Heading>
                    请在下方提交你的反馈
                </Heading>
                <TextArea placeholder="请输入" fontSize={20} marginTop={4} onChangeText={t => setContent(t)}>
                </TextArea>
                <HStack margin={4}>
                    <Button marginRight={4} minWidth={40} onPress={onClickSubmitFeedback}>确认</Button>
                    <Button minWidth={40} onPress={() => { navigation.navigate('UserProfile'); }}>返回</Button>
                </HStack>
            </VStack>

        </NativeBaseProvider>

    );
}

export default SubmitError;