import React from 'react';
import { Image, NativeBaseProvider, VStack,Box,Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const ArticleCard = function ({ props }) {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <TouchableOpacity onPress={()=>{navigation.navigate('ArticlePage',{articleId:props.articleId});}}>
                <VStack>
                    <Box>
                        <Image height={"100"} source={require('../../assets/jpg/soccer.jpg')} alt={'文章封面'} />
                    </Box>
                    <Text>有趣的文章</Text>
                </VStack>
            </TouchableOpacity>
        </NativeBaseProvider>
    );
}

export default ArticleCard;