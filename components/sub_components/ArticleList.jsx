import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
import ArticleCard from './ArticleCard';
const ArticleList = function(props) {
    const navigation = useNavigation();
    const items = [{},{},{},{},{},{},{}];
    return(
        <NativeBaseProvider>
            <FlatGrid 
                itemDimension={130}
                data = {items}
                renderItem={({item})=>(
                    <ArticleCard />
                )}
            />
        </NativeBaseProvider>
    );
}


export default ArticleList;