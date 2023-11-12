import { useState, useCallback, createRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Box, Modal, Text, VStack, Pressable, Toast, Button, Heading } from 'native-base';
import { StyleSheet } from 'react-native';
import UserTeamManage from './UserTeamManage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'native-base';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import functionSvg from '../../assets/svg/functionSvg.svg';
import FabWithSvg from './FabWithSvg';
import { renderers, Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;
const UserProfile = function () {
    const navigation = useNavigation();
    const [isMenuOpened, setMenuOpened] = useState(false);
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isShowModal, setShowModal] = useState(false);
    const menu = createRef();
    const [uploadedAvatar, setUploadedAvatar] = useState(null);
    const openImagePicker = async () => {
        try {
            const image = await ImagePicker.openPicker({
                cropping: false
            });

            const filePath = image.path;
            const fileData = await RNFS.readFile(filePath, 'base64');
            setUploadedAvatar(`data:image/jpeg;base64,${fileData}`);

        } catch (err) {
            console.log(err.toString());
            Toast.show({ description: err.toString(), duration: 2500 });
        }
    }
    const uploadImage = async function () {
        if (uploadedAvatar) {
            try {
                const response = await axios.post(axios.defaults.baseURL + "/api/UploadAvatar", {
                    image: uploadedAvatar
                });
                if (response.data['status'] === 0) {
                    Toast.show({ description: "上传成功", duration: 2500 });
                    return true;
                } else {
                    console.log(response.data['msg']);
                    Toast.show({ description: response.data['msg'], duration: 2500 });
                    return false;
                }
            } catch (err) {
                console.log(err.toString());
                Toast.show({ description: err.toString(), duration: 2500 });
                return false;
            }
        } else {
            Toast.show({ description: "请先选择合适的图片!", duration: 3000 });
            return false;
        }
    }
    useFocusEffect(useCallback(() => { fetchData(); }, []));
    const fetchData = async function () {
        try {
            const response = await axios.get(axios.defaults.baseURL + "/api/GetAvatarAndUsername");
            if (response.data['status'] === 0) {
                if (response.data['avatar'] === '') {
                    console.log('[' + response.data['avatar']);

                } else {
                    setAvatar(axios.defaults.baseURL + response.data['avatar']);
                }
                setUsername(response.data['username']);
            } else {
                console.log('err code is ' + response.data['status']);
                Toast.show({ description: "头像获取失败", duration: 2500 });
            }
        } catch (err) {
            Toast.show({ description: err.toString(), duration: 2500 });
        }
    }
    const onClickExitBtn = function () {
        axios.get(axios.defaults.baseURL + "/api/SignOut").then(response => {
            if (response.data['status'] == -1) {
                Toast.show({ description: "退出失败,请重试!", duration: 1500 });
            } else if (response.data['status'] == 0) {
                AsyncStorage.removeItem("is_authenticate", () => { });
                navigation.replace("Login");
                Toast.show({ description: "退出成功!", duration: 1500 });
            }
        }).catch(err => {
            Toast.show({ description: "错误:" + err.toString(), duration: 1500 });
        });
    }
    const onClickMenuBtn = function () {
        if (menu.current) {
            if (isMenuOpened === true) {
                menu.current.close();
                setMenuOpened(false);
            } else {
                menu.current.open();
                setMenuOpened(true);
            }
        }
    }
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };
    return (
        <NativeBaseProvider>
            <Box position="relative" paddingTop={"20%"}>
                <VStack display={"flex"} alignItems={"center"} paddingX={"4"}
                    width={"100%"} borderWidth={"2"}>
                    <Pressable position={"absolute"} top="-15%" onPress={() => { setShowModal(true); }}>
                        {
                            avatar === '' ?
                                <Avatar bg="amber.300" source={require('../../assets/avatar/avatar.jpg')}
                                    width={"32"} height={"32"}></Avatar>
                                : <Avatar bg="amber.300" width={'32'} height={'32'}
                                    source={{ uri: avatar }}></Avatar>
                        }
                    </Pressable>
                    <Heading marginTop={"20%"} marginBottom={"3"} fontSize={"30"}>{username}</Heading>

                    <Pressable onPress={() => { navigation.navigate('MyInfomation',{username:username}); }} style={styles.functions}>
                        <Text style={styles.function_text}>个 人 信 息</Text>
                    </Pressable>

                    <Pressable style={styles.functions} onPress={() => { navigation.navigate('MyChangeInformation',{username:username}); }}>
                        <Text style={styles.function_text}>修 改 信 息</Text>
                    </Pressable>

                    <Pressable style={styles.functions} onPress={() => { navigation.navigate('MyArticles'); }}>
                        <Text style={styles.function_text}>我 的 分 享</Text>
                    </Pressable >
                    <Pressable style={styles.functions} onPress={() => { navigation.navigate('UserTeamManage'); }}>
                        <Text style={styles.function_text}>我 的 组 队</Text>
                    </Pressable>
                    <Pressable style={styles.functions} onPress={() => { navigation.navigate('MyExerciseRecord'); }}>
                        <Text style={styles.function_text}>我 的 锻 炼 记 录</Text>
                    </Pressable>
                    <Pressable style={styles.functions} onPress={() => { navigation.navigate('SubmitError'); }}>
                        <Text style={styles.function_text}>提 交 反 馈</Text>
                    </Pressable>
                    <Button fontSize={20} colorScheme={"danger"} marginBottom={"4"} onPress={onClickExitBtn} width={"80%"}>退 出 登 录</Button>

                </VStack>
                <Modal isOpen={isShowModal} onClose={() => { setShowModal(false); }}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>选择头像上传</Modal.Header>
                        <Modal.Body>
                            <VStack>
                                <Text fontSize={20}>当前选择图片:</Text>
                                <Text fontSize={16}>最大5M~~:</Text>
                                {
                                    uploadedAvatar === null ? <></> : (<Avatar alignSelf={"center"} marginTop={4} marginBottom={4} bg="amber.300" source={{ uri: uploadedAvatar }}
                                        width={"32"} height={"32"}></Avatar>)
                                }
                                <Button marginBottom={4} onPress={openImagePicker}>选择图片</Button>
                                <Button onPress={() => {
                                    uploadImage().then(response => {
                                        if (response === true) {
                                            setShowModal(false); setUploadedAvatar(null);
                                        }
                                    }).catch(err => { Toast.show({ description: err.toString(), duration: 2500 }) });
                                }}>上传图片</Button>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Box>
            <MenuProvider>
                <Menu renderer={SlideInMenu} ref={menu} opened={isMenuOpened} zIndex={4}>
                    <MenuTrigger>
                        <Box position={"absolute"} right={"5%"} bottom={"1%"} zIndex={5}>
                            <FabWithSvg svg={functionSvg} onPress={onClickMenuBtn} />
                        </Box>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={()=>navigation.navigate('CaloryPredict')}><Text fontSize={24}>卡路里预测</Text></MenuOption>
                        <MenuOption onSelect={()=>navigation.navigate('CityWalkPage')}><Text fontSize={24}>CityWalk推荐</Text></MenuOption>
                        <MenuOption onSelect={()=>navigation.navigate('SportPlan')}><Text fontSize={24}>健身计划</Text></MenuOption>

                    </MenuOptions>
                </Menu>
            </MenuProvider>

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