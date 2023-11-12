import { Heading, NativeBaseProvider,Toast, Text,VStack } from "native-base";
import {useState,useCallback} from 'react';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';
const ArticleShow = function(props) {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [author,setAuthor] = useState('');
    const [createTime,setCreateTime] = useState('');
    const [updateTime,setUpdateTime] = useState('');
    const window = useWindowDimensions(); 
    const fetchData = async function() {
        try{
            console.log(props);
            const response = await axios.get(axios.defaults.baseURL + "/api/GetArticleDetails?articleId=" + props.route.params.articleId);
            if (response.data['status'] === 0) {
                setTitle(response.data['title']);
                setContent(response.data['content']);
                setAuthor(response.data['author']);
                setCreateTime(response.data['createTime']);
                setUpdateTime(response.data['updateTime']);
            } else {
                Toast.show({description:response.data['msg'],duration:2500});
            }
        } catch(err) {
            Toast.show({description:err.toString(),duration:2500});
        }
    }
    useFocusEffect(useCallback(()=>{
        fetchData();
    },[]));
    return (<NativeBaseProvider>
        <VStack>
            <Heading alignSelf={"center"}>{title}</Heading>
            <Text>作者:{author}</Text>
            <Text>创建时间:{createTime}</Text>
            <Text>更新时间:{updateTime}</Text>
            <HTML source={{html:content}} contentWidth={window.width} />
        </VStack>
    </NativeBaseProvider>);
}

export default ArticleShow;