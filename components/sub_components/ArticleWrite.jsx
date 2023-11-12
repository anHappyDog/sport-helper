import { HStack, Text, Button, NativeBaseProvider,AlertDialog,Spacer, View, Box, Image, Toast } from "native-base";
import React, { useState,useEffect } from "react";
import { TextInput, BackHandler,Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Modal,VStack } from "native-base";
const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const handleHead2 = ({ tintColor }) => <Text style={{ color: tintColor }}>H2</Text>
const handleHead3 = ({ tintColor }) => <Text style={{ color: tintColor }}>H3</Text>
const ArticleWrite = () => {
  const richText = React.createRef(null);
  const [photoList,setPhotoList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [cover,setCover] = useState('');
  const [coverFilePath,setCoverFilePath] = useState('');
  const [isShowModal,setShowModal] = useState(false);
  const navigation = useNavigation();

  const getBase64Image = async function (filePath) {
    const imageBase64 = await RNFS.readFile(filePath, 'base64');
    return `data:image/jpeg;base64,${imageBase64}`;
  }
  const openImagePicker = async () => {
    try {
        const image = await ImagePicker.openPicker({
            cropping: false
        });

        const filePath = image.path;
        setCoverFilePath(filePath);
        console.log(filePath);
        const fileData = await RNFS.readFile(filePath, 'base64');
        setCover(`data:image/jpeg;base64,${fileData}`);

    } catch (err) {
        console.log(err.toString());
        Toast.show({ description: err.toString(), duration: 2500 });
    }
}
  useEffect(()=>{
    const backAction = () => {
      setIsOpen(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  },[]);
  const onClose = () => {
    setIsOpen(false);
  };
  const onClickRelase = async function () {
    try{
      const response = await axios.post(axios.defaults.baseURL + "/api/DeliverArticle",{
        title:title,
        content:content,
        cover:cover,
        photoList:photoList,
        baseUrl:axios.defaults.baseURL
      });
      if (response.data['status'] === 0) {
          Toast.show({description:"发表成功",duration:2500});
          navigation.goBack();
      } else {
        Toast.show({description:response.data['msg'],duration:2500});
        console.log(response.data['msg']);
      }
    } catch(err) {

      Toast.show({description:err.toString(),duration:2500});
    }
  }

  const onClickCancel = function () {
    setIsOpen(true);
  }
  const selectImage = async function () {
    const options = {
      mediaType: 'photo',
      maxWidth: 50,
      maxHeight: 100,
    };
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      getBase64Image(image.path).then(response => {
        richText.current.insertImage(response);
        photoList.push(response);
      }).catch(err => {
        console.log(err.toString());
      })
    });
  }
  const onClickUploadCover = async function() {
    setShowModal(true);
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView height={"90%"}>
        <ScrollView usecontainer={true} oncursorPosition={() => { scrollTo({ y: scrollY - 30, animated: true }); }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} height={"100%"} borderWidth={2}>
            <View position={"relative"}>
              <TouchableOpacity styles={styles.extBtn} onPress={onClickCancel}>
                <Text fontSize={24}>退出</Text>
              </TouchableOpacity>
              <TouchableOpacity styles={styles.extBtn} onPress={onClickUploadCover}>
                <Text fontSize={24}>上传封面</Text>
              </TouchableOpacity>
              
              <TouchableOpacity position={"absolute"} onPress={onClickRelase}>
                <Text fontSize={24} color={"rgb(0,0,255)"}>发布</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={styles.titleInput} placeholder="文章标题" onChangeText={t=>setTitle(t)} />
            <RichEditor
              ref={richText}
              minimumFontSize={20}
              initialHeight={200}
              onChange={descriptionText => {
                console.log(descriptionText);
                setContent(descriptionText);
              }}
              placeholder="文章内容"
            />
          </KeyboardAvoidingView>
        </ScrollView>
        <RichToolbar
          editor={richText}
          actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.heading2, actions.heading3, actions.insertImage]}
          iconMap={{
            [actions.heading1]: handleHead, [actions.heading2]: handleHead2,
            [actions.heading3]: handleHead3
          }}
          onPressAddImage={selectImage}
        />
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
        >
          <AlertDialog.Content>
            <AlertDialog.Header>
              <Text color={'rgb(255,0,0)'}  fontSize={24}>退出</Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Text>确定要退出吗?所有内容不会被保存</Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <HStack space={3}>
                <Button title="取消" onPress={onClose} >取消</Button>
                <Spacer />
                <Button title="确认" onPress={()=>navigation.navigate('ArticleShare')} >确认</Button>
              </HStack>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <Modal isOpen={isShowModal} onClose={() => { setShowModal(false); }}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>选择封面上传</Modal.Header>
                        <Modal.Body>
                            <VStack>
                                <Text fontSize={20}>当前选择图片:</Text>
                                <Text fontSize={16}>最大8M~~:</Text>
                                {
                                    cover === '' ? <></> : (<Image alignSelf={"center"} marginTop={4} marginBottom={4}  alt="封面" bg="amber.300" width={32} height={32} source={{ uri: coverFilePath }}
                                        ></Image>)
                                }
                                <Button marginBottom={4} onPress={openImagePicker}>选择图片</Button>
                                <Button onPress={() => {
                                    setShowModal(false);
                                }}>返回</Button>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
      </SafeAreaView>
    </NativeBaseProvider>

  );
};

const styles = StyleSheet.create({
  titleInput: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: 'black',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: 'white',
    fontSize: 24
  },
  releaseBtn: {
    position: "absolute",
    right: 200,
  },
  extBtn: {
    position: "absolute",
    left: "20%",
  },
  extText: {
    color: "red",
    fontSize: 24
  },
  topStatusBar: {
    borderWidth: 0,
    borderBottomWidth: 2,
    padding: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row"
  }

});

export default ArticleWrite;