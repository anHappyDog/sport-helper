import { Button, Heading, NativeBaseProvider ,Text, Toast} from "native-base";
import { useNavigation } from "@react-navigation/native";
import {useCallback,useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
const SportResult = function(props) {
    const navigation = useNavigation();
    const [position,setPosition] = useState('');
    useFocusEffect(
        useCallback(
            () => {
                // 获取当前位置
                Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);
                        axios.get('https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + position.coords.longitude + ',' +
                            position.coords.latitude + '&key=c9406428a79597142a03e226a487f2e8').then(response => {
                                t = response.data.regeocode.addressComponent;
                                console.log(t);
                                setPosition(t.country + "," + t.province + "," + t.district + "," + t.township);

                            }).catch(err => {
                                console.log(err.toString());
                            });
                    },
                    (error) => console.log(error),
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                );

            }, [])
    );
    const onClickExitBtn = async function() {
        if (position === '') {
            Toast.show({description:"请先等待定位完成,在提交结果!",duration:2500});
        }
        try{
            const response = await axios.post(axios.defaults.baseURL + "/api/SubmitExerciseResult",{
                startTime:props.route.params.startTime,
                h : props.route.params.h,
                m : props.route.params.m,
                s : props.route.params.s,
                sportName : props.route.params.sportName
            });
            if (response.data['status'] === 0) {
                navigation.navigate('Exercise');
                Toast.show({description:"锻炼成功",duration:2500})
                
            } else {
                Toast.show({description:response.data['msg'],duration:2500});        
            }
        }catch(err) {
            Toast.show({description:err.toString(),duration:2500});
        };
    }
    return (<NativeBaseProvider>
        <Heading alignSelf={"center"}>运动结束!</Heading>
        <Text >运动项目:{props.route.params.sportName}</Text>
        <Text >运动位置:{position === ''?"正在定位中":position}</Text>
        <Text>开始时间:{props.route.params.startTime}</Text>
        <Text>锻炼时间:{props.route.params.workTime}</Text>
        <Button onPress={onClickExitBtn}>确认</Button>
    </NativeBaseProvider>);

};

export default SportResult;