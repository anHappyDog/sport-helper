import { Button, NativeBaseProvider, Text, AlertDialog, HStack, Spacer } from 'native-base';
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const OnSport = function (props) {
    const navigation = useNavigation();
    const [isWorking, setWorking] = useState(true);
    const [isWindowOpen, setWindowOpen] = useState(false);
    const [workTime, setWorkTime] = useState('0秒');
    const [seconds, setSeconds] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [seco,setSeco] = useState(0);
    const [minute,setMinute] = useState(0);
    const [hour,setHour] = useState(0);
    const [timerId, setTimerId] = useState(null);
    useEffect(() => {
        setStartTime(new Date().toISOString());
        const backAction = () => {
            if (isWorking === true) {
                setWorking(false);
                onClickStopBtn();
            } else {
                setWindowOpen(true);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        const id = setInterval(() => {
            setSeconds(prevSeconds => {
                const newSeconds = prevSeconds + 1;
                calcuteWorkTime(newSeconds);
                return newSeconds;
            });
        }, 1000);
        setTimerId(id);

        return () => {
            backHandler.remove();
            onClickStopBtn();
        }
    }, []);

    const calcuteWorkTime = async function (seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 3600 % 60);
        setHour(h);
        setMinute(m);
        setSeco(s);
        const hDisplay = h > 0 ? h + (h == 1 ? " 小时, " : " 小时, ") : "";
        const mDisplay = m > 0 ? m + (m == 1 ? " 分钟, " : " 分钟, ") : "";
        const sDisplay = s > 0 ? s + (s == 1 ? " 秒" : " 秒") : "";
        setWorkTime(hDisplay + mDisplay + sDisplay);
    }
    const onClickStopBtn = function () {
        if (timerId != null) {
            clearInterval(timerId);
            setTimerId(null);
            setWorking(false);
        }
    };
    const onClickQuitBtn = function () {
        onClickStopBtn();
        setWindowOpen(true);
    }
    const onClickStartBtn = function () {
        if (timerId === null) {
            const id = setInterval(() => {
                setSeconds(prevSeconds => {
                    const newSeconds = prevSeconds + 1;
                    calcuteWorkTime(newSeconds);
                    return newSeconds;
                });
            }, 1000);
            setTimerId(id);
            setWorking(true);
        }
    };
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <Text>正在进行:{props.route.params.sportName}中</Text>
                <Text>开始时间:{startTime}</Text>
                <Text>已经锻炼了:{workTime}</Text>
                {
                    isWorking === true ? (<Button onPress={onClickStopBtn}>暂停</Button>)
                        : (<Button onPress={onClickStartBtn}>开始</Button>)
                }
                <Button onPress={onClickQuitBtn}>结束</Button>
                <AlertDialog
                    isOpen={isWindowOpen}
                    onClose={() => { setWindowOpen(false); }}
                    motionPreset="slideInBottom"
                >
                    <AlertDialog.Content>
                        <AlertDialog.Header>
                            <Text color={'rgb(255,0,0)'} fontSize={24}>退出</Text>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <Text>确定要结束此次锻炼吗？</Text>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <HStack space={3}>
                                <Button title="取消" onPress={() => { setWindowOpen(false); }} >取消</Button>
                                <Spacer />
                                <Button title="确认" onPress={() => navigation.navigate('SportResult',{workTime:workTime,h:hour,m:minute,s:seco,startTime:startTime,
                                    sportName:props.route.params.sportName,position:props.route.params.position})} >确认</Button>
                            </HStack>
                        </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
            </SafeAreaView>

        </NativeBaseProvider>
    );
};

export default OnSport;


