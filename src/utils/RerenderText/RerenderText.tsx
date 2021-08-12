import {StyleProp, Text, TextStyle} from 'react-native';
import React, {useRef} from 'react';

export default function RerenderText(props: {style?: StyleProp<TextStyle>}) {
    const rerenderCount = useRef(0);

    return <Text style={[{color: 'red'}, props.style]}>{rerenderCount.current++ + ''}</Text>;
}
