import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Toast } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import ArticleCard from './ArticleCard';
import {useState,useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const ArticleList = function(props) {
    const navigation = useNavigation();
    const [items,setItems] = useState([]);
    const fetchData = async function() {
        try{
            const response = await axios.get(axios.defaults.baseURL + "/api/GetArticles");
            if (response.data['status'] === 0) {
                setItems(response.data['articles']);
                console.log(response.data['articles']);
            } else {
                Toast.show({description:response.data['msg'],duration:2500});
            }
        } catch(err) {
            Toast.show({description:err.toString(),duration:2500});
        }
    };
    useFocusEffect(useCallback(()=>{
        fetchData();
    },[]));
    return(
        <NativeBaseProvider>
            <FlatGrid 
                itemDimension={130}
                data = {items}
                renderItem={({item,index})=>(
                    <ArticleCard key={index} articleId={item.articleId}
                    title={item.title} cover={item.cover!==''? axios.defaults.baseURL + item.cover:item.cover}/>
                )}
            />
        </NativeBaseProvider>
    );
}


export default ArticleList;