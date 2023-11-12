import React, { useEffect } from 'react';
import { Pressable } from 'native-base';
import { Box, NativeBaseProvider, Text, } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    CardContainer: {
        borderWidth: 1,
        borderRadius: 10,
        margin: 4
    }
});


const TeamCard = (props) => {

    const navigation = useNavigation();
    const onClickCard = function () {
        navigation.navigate('TeamDetails',{teamId:props.team.teamId,createPerson:props.team.createPerson_id});
    }
    return (
        <NativeBaseProvider>
            <Box height={100}>
                <Pressable onPress={onClickCard} style={styles.CardContainer}>
                    <Text>组名:{props.team.teamName}</Text>
                    <Text>当前人数/最大人数:{props.team.curPersonCnt}/{props.team.maxPerson}</Text>
                    <Text>运动种类:{props.team.sportType}</Text>
                    <Text>组队状态:{props.team.teamState == 'R'?"组队中":props.team.teamState == 'O'?"锻炼中":"已结束"}</Text>
                </Pressable>
            </Box>

        </NativeBaseProvider>
    );
}

export default TeamCard;