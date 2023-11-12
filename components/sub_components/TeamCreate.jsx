import { VStack, FormControl, Input, Button, Toast, Select, NativeBaseProvider } from 'native-base';
import { useState, useFocusEffect, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TeamCreate = ({ route }) => {
    const [teamName, setTeamName] = useState('');
    const [maxPerson, setMaxPerson] = useState(2);
    const [sportType, setSportType] = useState('');
    const navigation = useNavigation();
    const onClickCreateTeam = async function () {
        try {
            console.log(JSON.stringify(route.params));
            const response = await axios.post(axios.defaults.baseURL + "/api/CreateTeam", {
                teamName: teamName,
                maxPerson: maxPerson,
                sportType: sportType
            })
            if (response.data['status'] == 0) {
                navigation.navigate('TeamList');
                Toast.show({ description: '创建成功', duration: 1500 });
            }
            else {
                Toast.show({ description: response.data['msg'], duration: 1500 });
            }
        } catch (err) {
            console.log(err);
            Toast.show({ description: err.toString(), duration: 1500 });
        }
    }
    return (
        <NativeBaseProvider>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>组名</FormControl.Label>
                    <Input onChangeText={t => setTeamName(t)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>最大人数</FormControl.Label>
                    <Input keyboardType='numeric' onChangeText={t =>setMaxPerson(parseInt(t))} />
                </FormControl>
                <Select selectedValue={sportType} minWidth={200} placeholder='请选择体育项目' _selectedItem={{
                    bg: "teal.600"
                }} mt={1} onValueChange={selectedSport => setSportType(selectedSport)}>
                    {
                        route.params.sportList.map(( item, index ) => (
                            <Select.Item  key={index} label={item} value={item} />
                        ))
                    }
                </Select>
                <Button mt="2" colorScheme="indigo" onPress={onClickCreateTeam} >
                    创建组队
                </Button>
            </VStack>
        </NativeBaseProvider>

    );
}

export default TeamCreate;