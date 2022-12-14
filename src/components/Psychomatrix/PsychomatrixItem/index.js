// @flow

import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

type Props = {
    title: string,
    value: string,
    icon: number,
};

class PsychomatrixItem extends PureComponent<Props> {
    static navigationOptions = {
        header: null,
        headerTintColor: 'white',
    };

    render() {
        const { title, value, icon } = this.props;
        return (
            <LinearGradient
                colors={['#493596', '#3F2C8D']}
                style={styles.gradient}
            >
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={icon}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </LinearGradient>
        );
    }
}

export default PsychomatrixItem;
