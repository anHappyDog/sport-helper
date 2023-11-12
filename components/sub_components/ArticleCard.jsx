import React from 'react';
import { Image, NativeBaseProvider, VStack,Box,Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {covers} from './StaticResources';
const ArticleCard = function (props) {
    const navigation = useNavigation();
    return (
        <NativeBaseProvider>
            <TouchableOpacity onPress={()=>{navigation.navigate('ArticleShow',{articleId:props.articleId});}}>
                <VStack>
                    <Box>
                        {
                            props.cover ===''?<Image height={"100"} source={covers['defaultCover']} alt={"文章默认封面"} />
                            :<Image height={"100"} source={{uri:props.cover}} alt={'文章封面'} />
                        }
                    </Box>
                    <Text>{props.title}</Text>
                </VStack>
            </TouchableOpacity>
        </NativeBaseProvider>
    );
}

export default ArticleCard;