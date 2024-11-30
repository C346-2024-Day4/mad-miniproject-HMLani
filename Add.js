import { amiiboData } from "./Data.js";
import React, { useState } from "react";
import {View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import RSPickerSelect from 'react-native-picker-select';
import { useFonts } from "expo-font";
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Icon from "react-native-vector-icons/FontAwesome6";

SplashScreen.preventAutoHideAsync();

const Add = ({navigation}) => {
    const [series, setSeries] = useState('Super Smash Bros.');

    const [isLoaded] = useFonts({
        'Pretendo-Regular': require('./assets/fonts/Pretendo.ttf'),
        'Bauhaus-bold': require('./assets/fonts/BauhausStdDemi.ttf'),
        'YaHei-Bold': require('./assets/fonts/MicrosoftYaHeiBold.ttf'),
    });

    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
            await SplashScreen.hideAsync(); //hide the splashscreen
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    return(
        <SafeAreaView onLayout={handleOnLayout}>
            <ScrollView style={styles.bg}>
                <View style={{backgroundColor: '#FFFFFF', height: '4%'}}></View>
                <View style={styles.top}>
                    <Image
                        source={require('./assets/img/Nintendo-Logo.png')}
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: -60}}
                    />
                    <Image
                        source={require('./assets/img/Amiibo-logo.png')}
                        style={{width: 250, height: 50, alignSelf: 'center', marginTop: -60}}
                    />
                </View>

                <TouchableOpacity onPress={() => {navigation.navigate('Home');}}>
                    <Text style={styles.backBtnStyle}>
                        <Icon name={'angle-left'}/> Back
                    </Text>
                </TouchableOpacity>

                <Text style={styles.titleStyle}>
                    Add an <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 30}}>amiibo</Text>
                </Text>

                <View style={styles.container}>
                    <Text style={styles.textHeaderStyle}>
                        <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 15}}>amiibo</Text> Name:
                    </Text>
                    <TextInput
                        style={[styles.inputStyle, {paddingLeft: 16}]}
                        placeholder={'E.g. Mario'}
                    />

                    <Text style={styles.textHeaderStyle}>Series:</Text>
                    <View style={styles.pickerStyle}>
                        <RSPickerSelect
                            placeholder={{label: 'Please select series category...', value: null}}
                            onValueChange={(value) => setSeries(value)}
                            items={[
                                {label: 'Super Smash Bros.', value: 'Super Smash Bros.', key: 'Super Smash Bros.'},
                                {label: 'Super Mario', value: 'Super Mario', key: 'Super Mario'},
                                {label: 'Legend of Zelda: BOTW', value: 'Legend of Zelda: BOTW', key: 'Legend of Zelda: BOTW'},
                            ]}
                        />
                    </View>

                    <Text style={styles.textHeaderStyle}>Release Date:</Text>
                    <TextInput
                        style={[styles.inputStyle, {paddingLeft: 16}]}
                        placeholder={'E.g. Jan 01, 1800'}
                    />

                    <Text style={styles.textHeaderStyle}>Present By:</Text>
                    <TextInput
                        style={[styles.inputStyle, {paddingLeft: 16}]}
                        placeholder={'E.g. Sega'}
                    />

                    <Text style={styles.textHeaderStyle}>Description:</Text>
                    <TextInput
                        style={[styles.inputStyle, {minHeight: 200, maxHeight: 200, paddingLeft: 16}]}
                        placeholder={'Details about the amiibo...'}
                        multiline={true}
                    />

                    <TouchableOpacity style={styles.btnStyle}>
                        <View>
                            <Text style={{fontSize: 20, fontFamily: 'YaHei-Bold'}}>
                                Submit
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#E60012',
        height: '100%',
    },

    top: {
        backgroundColor: '#FFFFFF',
        height: '11%',
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
    },

    titleStyle: {
        fontSize: 30,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Pretendo-Regular',
        color: 'white',
    },

    textHeaderStyle: {
        fontFamily: 'YaHei-Bold',
        fontSize: 15,
        color: 'white',
    },

    inputStyle: {
        borderWidth: .8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
        height: 55
    },

    container: {
        padding: 20
    },

    pickerStyle: {
        borderWidth: .8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5
    },

    btnStyle: {
        padding: 15,
        backgroundColor: '#E18585',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        elevation: 5,
    },

    backBtnStyle: {
        marginTop: 10,
        marginLeft: 5,
        width: 100,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'YaHei-Bold',
        fontSize: 15
    }
});
