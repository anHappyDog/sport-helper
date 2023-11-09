import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
const FabWithSvg = ({ onPress ,svg}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.fab}>
            <SvgXml width="40" height="40" xml={svg}  color={"white"}/>
        </TouchableOpacity>
    );
};

const styles = {
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        // Other styles for your FAB
    },
};

export default FabWithSvg;
