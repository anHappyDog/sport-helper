import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { covers } from './StaticResources';
import { Image, View, VStack, Text, NativeBaseProvider, HStack, Heading, Button } from 'native-base';
const Sporting = (props) => {
    const [location, setLocation] = useState(null);
    const [position, setPosition] = useState('');
    const navigation = useNavigation();
    useFocusEffect(
        React.useCallback(
            () => {
                // 获取当前位置
                Geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: parseFloat(position.coords.latitude.toFixed(2)),
                            longitude: parseFloat(position.coords.longitude.toFixed(2)),
                        });
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
    return (

        <NativeBaseProvider>
            <View>
                <VStack>
                    <View
                        style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: 10,
                        }}>
                        {
                            location != null ? (<Text>当前经纬度：{location.latitude}, {location.longitude}</Text>) :
                                (<Text>正在加载数据中...</Text>)
                        }
                        <Text>当前地理位置：{position}</Text>
                    </View>

                    <Image source={covers[props.route.params.coverName]} width={"100%"} height={"200"} alt={"Sport Cover"} borderRadius={10}></Image>
                    <HStack>
                        <Heading>{props.route.params.sportName}</Heading><Button onPress={() => { navigation.navigate('OnSport', { sportId: props.route.params.sportId, sportName: props.route.params.sportName, position: position }) }}>开始!</Button>
                    </HStack>
                    <Text>{props.route.params.description}</Text>
                </VStack>
            </View>
        </NativeBaseProvider>
    );
};

export default Sporting;
