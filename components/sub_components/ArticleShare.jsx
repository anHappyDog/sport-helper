import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { NativeBaseProvider, Text, Fab, Icon,Box, Toast} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import ArticleList from './ArticleList';
import { useFocusEffect } from '@react-navigation/native';
import PlusSvg from '../../assets/svg/plus.svg';
import axios from 'axios';
import FabWithSvg from './FabWithSvg';

const ArticleShare = function () {
    const [articles, setArticles] = useState('');
    const navigation = useNavigation();
    const getArticles = function () {
        axios.get(axios.defaults.baseURL + "/api/GetArticles").then(response => {
            if (response.data['status'] == 0) {

            } else if (response.data['status'] == -1) {
                Toast.show({ description: "验证失败,无法拉取文章", duration: 1500 });
            }
        }).catch(err => {
            Toast.show({ description: "错误:" + err.toString(), duration: 1500 });
        })
    }

    useFocusEffect(React.useCallback(
        () => {

        }, []
    ));


    return (
        <NativeBaseProvider>
            <Box position={"absolute"} right={"5%"} bottom={"1%"} zIndex={1}>
            <FabWithSvg  svg={PlusSvg} onPress={()=>{
                    navigation.navigate('ArticleWrite');
                }}/>
            </Box>
            <ArticleList />
         </NativeBaseProvider>
    );
};

export default ArticleShare;


