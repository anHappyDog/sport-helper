import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Toast, Box } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import SportCard from './SportCard';
import { withFooter } from './MainScreenFoot';

const ExerciseList = withFooter(function () {
    const [sportData, setSportData] = useState([]);
    const getSportInfo = function () {
        axios.get(axios.defaults.baseURL + "/api/SportInfo", {
        }).then(response => {
            if (response.status == -2) {
                Toast.show({ description: "用户认证失败", duration: 2000 });
            } else if (response.status == -1) {
                Toast.show({ description: "服务端访问失败", duration: 2000 });
            }
            else {
                if (response.data['data'] != sportData) {
                    setSportData(response.data['data']);
                }
            }
        }).catch(err => {
            Toast.show({ description: err.toString(), duration: 2000 });
        });
    }
    useFocusEffect(React.useCallback(
        () => {
            getSportInfo();
            const intervalId = setInterval(() => {
                getSportInfo();
            }, 5000);

            return () => {
                clearInterval(intervalId);
            };
        }, []
    ));
    return (
        <FlatList
            data={sportData}
            renderItem={({ item, index }) => (
                <SportCard key={index} id={item.sportId} coverName={item.sportCoverName} sportName={item.sportName} sportDescription={item.sportDescription} />
            )}
        />
    );
});

export default ExerciseList;