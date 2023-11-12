import { FlatList, Heading, NativeBaseProvider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback,useState } from "react";
import { Pressable } from "react-native";
import axios from "axios";
const MyArticles = () => {
    const navigation = useNavigation();
    const [articles,setArticles] = useState([]);
    const fetchArticles = async function() {
        try{
            const response = await axios.get(axios.defaults.baseURL + "/api/GetMyArticles");
            if (response.data['status'] !== 0) {
                Toast.show({description:response.data['msg']+",请退出重试",duration:2500});
            } else {
                setArticles(response.data['data']);
            }
        } catch(err) {
            Toast.show({description:err.toString(),duration:2500});
        }
    }
    useFocusEffect(useCallback(()=>{},[]));
    return (<NativeBaseProvider>
        <Heading alignSelf={"center"}>我的文章</Heading>
        <FlatList data={articles} renderItem={(item,index)=>(
            <Pressable key={index} borderWidth={2} borderRadius={10}>
                <Text>帖子名:{item.title}</Text>
                <Text>用户:{item.username}</Text>
                <Text>发表时间:{item.createTime}</Text>
                <Text>更新时间:{item.updateTime}</Text>
            </Pressable>
        )} /> 
    </NativeBaseProvider>
    );
}

export default MyArticles;