import { HStack, Text, Button, NativeBaseProvider, View, Box } from "native-base";
import React, { useState } from "react";
import { TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const handleHead2 = ({ tintColor }) => <Text style={{ color: tintColor }}>H2</Text>
const handleHead3 = ({ tintColor }) => <Text style={{ color: tintColor }}>H3</Text>
const ArticleWrite = () => {
  const richText = React.createRef(null);
  const photoList = useState([]);
  const  selectImage = async function() {
    const options = {
      mediaType: 'photo',
      maxWidth: 50,
      maxHeight: 100,
    };

    launchImageLibrary(options,async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const fileName = response.assets[0].fileName || `image_${Date.now()}.jpg`;
        
        const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        try {
          console.log(destinationPath);
          await RNFS.copyFile(response.assets[0].originalPath,destinationPath);
          console.log('File exists:', await RNFS.exists(destinationPath));
          console.log('Original File:',response.assets[0].fileName);
          // 将图片添加到富文本编辑器中
          //richText.current.insertImage(response.assets[0].uri);
          
          //photoList.insert(destinationPath);
          richText.current.insertImage(`file://${destinationPath}`);
          richText.current.insertImage(response.assets[0].uri);
        } catch(err) {
          console.log(err);
        }
      }
    });
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView height={"90%"}>
        <ScrollView usecontainer = {true}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} height={"100%"} borderWidth={2}>
            <View position={"relative"}>
              <TouchableOpacity styles={styles.extBtn}>
                <Text fontSize={24}>退出</Text>
              </TouchableOpacity>
              <TouchableOpacity position={"absolute"}>
                <Text fontSize={24} color={"rgb(0,0,255)"}>发布</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={styles.titleInput} placeholder="文章标题" />
            <RichEditor
              ref={richText}
              minimumFontSize={20}
              initialHeight={200}
              onChange={descriptionText => {
                console.log(descriptionText);
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