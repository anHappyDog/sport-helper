import React ,{useState}from 'react';
import {  View,Box,HStack,Pressable,Center,Text, NativeBaseProvider,Icon, Toast } from 'native-base';
import ExerciseSvg from '../../assets/svg/exercise.svg';
import { SvgXml } from 'react-native-svg';
import PersonProfileSvg from '../../assets/svg/personProfile.svg';
import ShareSvg from '../../assets/svg/share.svg';
import TeamSvg from '../../assets/svg/team.svg';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  foot: {
      position: "absolute",
      width: "100%",
      bottom: "0%"
  }
});

const withFooter = function (Component) {
  return function WrappedComponent(props) {
    return (
      <View >
        <Component {...props} />
        <MainScreenFoot style={styles.foot} />
      </View>
    );
  };
}

const MainScreenFoot = function () {
  const [selected, setSelected] = useState(0);
    const navigation = useNavigation();
    return <NativeBaseProvider>
    <Box bg="white" safeAreaTop width="100%"  alignSelf="center">
      <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() =>  { setSelected(0);navigation.navigate("Exercise");}}>
          <Center>
            <SvgXml width="32" height="32" xml={ExerciseSvg} />
            <Text color="white" fontSize="12">
              运动
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => { setSelected(1);navigation.navigate("TeamHall");}}>
          <Center>
          <SvgXml width="32" height="32" xml={TeamSvg} />
            <Text color="white" fontSize="12">
              组局
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() =>  { setSelected(2);navigation.navigate("ArticleShare");}}>
          <Center>
          <SvgXml width="32" height="32" xml={ShareSvg} />
            <Text color="white" fontSize="12">
              攻略
            </Text>
          </Center>
        </Pressable>
        <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() =>  { setSelected(3);navigation.navigate("UserProfile");}}>
          <Center>
          <SvgXml width="32" height="32" xml={PersonProfileSvg} />
            <Text color="white" fontSize="12">
              个人中心
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  </NativeBaseProvider>;
}

export default MainScreenFoot;
export {withFooter};