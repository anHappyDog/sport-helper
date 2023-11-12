import { useCallback, useState} from "react";
import axios from 'axios';
import { Heading, NativeBaseProvider, Toast,Box, Text } from "native-base";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
const MyExerciseRecord = () => {
    const [sportRecord,setSportRecord] = useState([]);
    const fetchSportRecordData = async function() {
        try{    
            const response = await axios.get(axios.defaults.baseURL + "/api/GetSportRecord");
            if (response.data['status'] === 0) {
                setSportRecord(response.data['data']);
                console.log(response.data['data']);
            } else {
                Toast.show({description:response.data['msg'],duration:2500});
            }
        }catch(err) {
            Toast.show({description:err.toString(),duration:2500});
        }
    }
    useFocusEffect(useCallback(()=>{fetchSportRecordData();},[]));
    return (
        <NativeBaseProvider>
            <Heading alignSelf={"center"}>我的锻炼记录</Heading>
            <FlatList data={sportRecord} renderItem={({item,index})=>(<Box key={index}  borderWidth={2} borderRadius={10} margin={4}>
                <Text>运动名:{item.sportName}</Text>
                <Text>开始时间:{item.startTime}</Text>
                <Text>锻炼时间:{item.workTime}</Text>
                <Text>运动类型:{item.isTeam===true?"组队":"个人"}</Text>                
                <Text>锻炼位置:{item.position}</Text>
            </Box>)}/>
        </NativeBaseProvider>
    );

}

export default MyExerciseRecord;