import React from 'react';
import { Box, Text, Image, VStack, Button, HStack } from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {covers} from './StaticResources';




const SportCard = function (props) {
    const navigation = useNavigation();
    return (
        <Box style={styles.card_box}>
            <Image source={covers[props.coverName]} width={"100%"} alt={"Sport Cover"} height={100} borderRadius={10}></Image>
            <VStack marginTop={3}>
                <HStack position={"relative"} marginBottom={2}>
                    <Text fontSize={24}>{props.sportName}</Text>
                    <Button position={"absolute"} right={"10%"} onPress={()=> navigation.navigate('Sporting',{sportId:props.id,coverName:props.coverName,sportName:props.sportName,description:props.sportDescription})}>开始锻炼</Button>
                </HStack>
                <Text fontSize={17} numberOfLines={2} ellipsizeMode='tail'>{props.sportDescription}</Text>
            </VStack>
        </Box>
    );
};
const styles = StyleSheet.create({
    card_box: {
        marginTop: 2,
        marginBottom: 2,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2
    }
});

export default SportCard;