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
    const navigation = useNavigation();
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


